'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore, formatCOP, getCartTotal } from '@/lib/cart-store';
import { ROUTES, WHATSAPP_LINK, BREB_KEY } from '@/lib/config';
import SearchableSelect from '@/components/SearchableSelect';
import { DEPARTAMENTOS, getMunicipios } from '@/lib/colombia-geo';

type PaymentMethod = 'contra-entrega' | 'tarjeta' | 'pse' | 'addi' | 'nequi' | 'breb';

type TipoDocumento = 'CC' | 'CE' | 'PA';

interface FormData {
  nombres: string;
  apellidos: string;
  email: string;
  tipoDocumento: TipoDocumento;
  documento: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  telefono: string;
}

const INITIAL_FORM: FormData = {
  nombres: '',
  apellidos: '',
  email: '',
  tipoDocumento: 'CC',
  documento: '',
  direccion: '',
  departamento: '',
  ciudad: '',
  telefono: '',
};

const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

function sanitizeName(value: string) {
  return value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, '');
}

function validateDocumento(tipo: TipoDocumento, doc: string): string | null {
  if (tipo === 'CC') {
    if (!/^[1-9]\d{5,9}$/.test(doc)) return 'Cédula inválida (6–10 dígitos, no puede iniciar en 0)';
  } else if (tipo === 'CE') {
    if (!/^\d{6,9}$/.test(doc)) return 'Cédula de extranjería inválida (6–9 dígitos)';
  } else if (tipo === 'PA') {
    if (!/^[A-Za-z0-9]{6,12}$/.test(doc)) return 'Pasaporte inválido (6–12 caracteres alfanuméricos)';
  }
  return null;
}

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: string; desc: string }[] = [
  { id: 'contra-entrega', label: 'Contra entrega', icon: '🚚', desc: 'Paga cuando recibas tu pedido' },
  { id: 'tarjeta', label: 'Tarjeta de crédito / débito', icon: '💳', desc: 'Visa, Mastercard, American Express' },
  { id: 'pse', label: 'PSE', icon: '🏦', desc: 'Débito directo desde tu cuenta bancaria' },
  { id: 'nequi', label: 'Nequi', icon: '📱', desc: 'Paga desde tu billetera Nequi' },
  { id: 'addi', label: 'ADDI', icon: '💰', desc: 'Compra ahora y paga en cuotas sin interés' },
  { id: 'breb', label: 'BRE-B', icon: '📷', desc: 'Pago por código QR' },
];

// Contra entrega solo aplica para pedidos de hasta este monto.
const CONTRA_ENTREGA_MAX = 400000;

// ADDI deshabilitado temporalmente: la integración no está funcionando bien.
const ADDI_ENABLED = false;


function validate(form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!form.nombres.trim()) errors.nombres = 'Campo obligatorio';
  else if (!NAME_REGEX.test(form.nombres)) errors.nombres = 'Solo letras y espacios (sin números ni caracteres especiales)';
  if (!form.apellidos.trim()) errors.apellidos = 'Campo obligatorio';
  else if (!NAME_REGEX.test(form.apellidos)) errors.apellidos = 'Solo letras y espacios (sin números ni caracteres especiales)';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Correo inválido';
  const docError = validateDocumento(form.tipoDocumento, form.documento);
  if (docError) errors.documento = docError;
  if (!form.direccion.trim() || form.direccion.length < 8) errors.direccion = 'Dirección muy corta';
  if (!form.departamento) errors.departamento = 'Selecciona un departamento';
  if (!form.ciudad.trim()) errors.ciudad = 'Campo obligatorio';
  if (!/^[3]\d{9}$/.test(form.telefono)) errors.telefono = 'Teléfono inválido (10 dígitos, empieza por 3)';
  return errors;
}

export default function CheckoutPageClient() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [paymentError, setPaymentError] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const subtotal = getCartTotal(items);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#05080f]">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
          <p className="text-2xl font-bold text-white">Tu carrito está vacío</p>
          <Link href={ROUTES.home} className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950">
            Ver productos
          </Link>
        </div>
      </main>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    let filtered = value;
    if (name === 'nombres' || name === 'apellidos') {
      filtered = sanitizeName(value);
    } else if (name === 'documento') {
      filtered = form.tipoDocumento === 'PA'
        ? value.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
        : value.replace(/\D/g, '');
    }
    setForm((prev) => ({ ...prev, [name]: filtered }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleTipoDocumentoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const tipo = e.target.value as TipoDocumento;
    setForm((prev) => ({ ...prev, tipoDocumento: tipo, documento: '' }));
    setErrors((prev) => ({ ...prev, documento: undefined }));
  }

  function handleDepartamentoChange(dep: string) {
    setForm((prev) => ({ ...prev, departamento: dep, ciudad: '' }));
    setErrors((prev) => ({ ...prev, departamento: undefined, ciudad: undefined }));
  }

  function handleCiudadChange(city: string) {
    setForm((prev) => ({ ...prev, ciudad: city }));
    if (errors.ciudad) setErrors((prev) => ({ ...prev, ciudad: undefined }));
  }

  async function handleCopyKey() {
    try {
      await navigator.clipboard.writeText(BREB_KEY);
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
    } catch {
      setKeyCopied(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      formRef.current?.querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!paymentMethod) {
      setPaymentError('Selecciona un método de pago');
      return;
    }
    if (paymentMethod === 'contra-entrega' && subtotal > CONTRA_ENTREGA_MAX) {
      setPaymentMethod(null);
      setPaymentError(`Contra entrega ya no está disponible: tu pedido supera los ${formatCOP(CONTRA_ENTREGA_MAX)}. Elige otro método de pago.`);
      return;
    }
    if (paymentMethod === 'addi' && !ADDI_ENABLED) {
      setPaymentMethod(null);
      setPaymentError('ADDI no está disponible temporalmente. Elige otro método de pago.');
      return;
    }
    setPaymentError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, paymentMethod, items, total: subtotal }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setPaymentError(data.error ?? 'No se pudo procesar el pedido. Intenta de nuevo.');
        return;
      }

      if (paymentMethod === 'contra-entrega') {
        clearCart();
        router.push(`${ROUTES.confirmation}?ref=${data.reference}&method=contra-entrega`);
        return;
      }

      // BRE-B: pago por QR — enviar comprobante por WhatsApp
      if (paymentMethod === 'breb') {
        const whatsappMessage = `Hola, acabo de realizar el pago con BRE-B para mi pedido *${data.reference}* por un total de ${formatCOP(subtotal)}. Adjunto el comprobante de pago.`;
        window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
        clearCart();
        router.push(`${ROUTES.confirmation}?ref=${data.reference}&method=breb`);
        return;
      }

      // Mercado Pago (tarjeta, PSE, Nequi): redirigir al checkout de MP
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      // Sin credenciales configuradas: redirigir localmente (modo desarrollo)
      if (data.devMode) {
        clearCart();
        router.push(`${ROUTES.confirmation}?ref=${data.reference}&status=approved`);
        return;
      }

      // Para ADDI
      if (paymentMethod === 'addi' && data.addiUrl) {
        window.location.href = data.addiUrl;
        return;
      }

      clearCart();
      router.push(`${ROUTES.confirmation}?ref=${data.reference}`);
    } catch {
      setPaymentError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-2xl border bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 ${
      errors[field] ? 'border-red-500/60' : 'border-slate-700'
    }`;

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      <div className="mx-auto max-w-[1180px] px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href={ROUTES.cart} className="hover:text-cyan-300">Carrito</Link>
          <span>›</span>
          <span className="text-white">Checkout</span>
        </nav>

        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Finalizar compra</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Datos de envío y pago</h1>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Columna izquierda: formulario */}
            <div className="space-y-8">
              {/* Datos personales */}
              <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 sm:p-8">
                <h2 className="mb-6 text-lg font-bold text-white">Datos personales</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="nombres">
                      Nombres <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="nombres"
                      name="nombres"
                      type="text"
                      autoComplete="given-name"
                      value={form.nombres}
                      onChange={handleChange}
                      aria-invalid={!!errors.nombres}
                      placeholder="Juan"
                      className={inputClass('nombres')}
                    />
                    {errors.nombres && <p className="mt-1 text-xs text-red-400">{errors.nombres}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="apellidos">
                      Apellidos <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="apellidos"
                      name="apellidos"
                      type="text"
                      autoComplete="family-name"
                      value={form.apellidos}
                      onChange={handleChange}
                      aria-invalid={!!errors.apellidos}
                      placeholder="García"
                      className={inputClass('apellidos')}
                    />
                    {errors.apellidos && <p className="mt-1 text-xs text-red-400">{errors.apellidos}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="email">
                      Correo electrónico <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      placeholder="correo@ejemplo.com"
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="tipoDocumento">
                      Tipo de documento <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={form.tipoDocumento}
                      onChange={handleTipoDocumentoChange}
                      className={inputClass('tipoDocumento')}
                    >
                      <option value="CC">Cédula de ciudadanía (CC)</option>
                      <option value="CE">Cédula de extranjería (CE)</option>
                      <option value="PA">Pasaporte</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="documento">
                      Número de documento <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="documento"
                      name="documento"
                      type="text"
                      inputMode={form.tipoDocumento === 'PA' ? 'text' : 'numeric'}
                      autoComplete="off"
                      value={form.documento}
                      onChange={handleChange}
                      aria-invalid={!!errors.documento}
                      placeholder={form.tipoDocumento === 'PA' ? 'AB123456' : '1234567890'}
                      maxLength={form.tipoDocumento === 'PA' ? 12 : 10}
                      className={inputClass('documento')}
                    />
                    {errors.documento && <p className="mt-1 text-xs text-red-400">{errors.documento}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="telefono">
                      Teléfono / Celular <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      aria-invalid={!!errors.telefono}
                      placeholder="3001234567"
                      maxLength={10}
                      className={inputClass('telefono')}
                    />
                    {errors.telefono && <p className="mt-1 text-xs text-red-400">{errors.telefono}</p>}
                  </div>
                </div>
              </section>

              {/* Dirección de envío */}
              <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 sm:p-8">
                <h2 className="mb-6 text-lg font-bold text-white">Dirección de envío</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="direccion">
                      Dirección completa <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="direccion"
                      name="direccion"
                      type="text"
                      autoComplete="street-address"
                      value={form.direccion}
                      onChange={handleChange}
                      aria-invalid={!!errors.direccion}
                      placeholder="Calle 123 # 45-67, Apto 201"
                      className={inputClass('direccion')}
                    />
                    {errors.direccion && <p className="mt-1 text-xs text-red-400">{errors.direccion}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="departamento">
                      Departamento <span className="text-red-400">*</span>
                    </label>
                    <SearchableSelect
                      id="departamento"
                      value={form.departamento}
                      onChange={handleDepartamentoChange}
                      options={DEPARTAMENTOS}
                      placeholder="Selecciona tu departamento"
                      hasError={!!errors.departamento}
                    />
                    {errors.departamento && <p className="mt-1 text-xs text-red-400">{errors.departamento}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300" htmlFor="ciudad">
                      Ciudad / Municipio <span className="text-red-400">*</span>
                    </label>
                    <SearchableSelect
                      id="ciudad"
                      value={form.ciudad}
                      onChange={handleCiudadChange}
                      options={getMunicipios(form.departamento)}
                      placeholder={form.departamento ? 'Selecciona tu ciudad' : 'Primero selecciona un departamento'}
                      disabled={!form.departamento}
                      hasError={!!errors.ciudad}
                    />
                    {errors.ciudad && <p className="mt-1 text-xs text-red-400">{errors.ciudad}</p>}
                  </div>
                </div>
              </section>

              {/* Método de pago */}
              <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 sm:p-8">
                <h2 className="mb-6 text-lg font-bold text-white">Método de pago</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((method) => {
                    const disabled =
                      (method.id === 'contra-entrega' && subtotal > CONTRA_ENTREGA_MAX) ||
                      (method.id === 'addi' && !ADDI_ENABLED);
                    return (
                      <button
                        key={method.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          if (disabled) return;
                          setPaymentMethod(method.id);
                          setPaymentError('');
                        }}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                          disabled
                            ? 'cursor-not-allowed border-slate-800 bg-slate-900/30 opacity-50'
                            : paymentMethod === method.id
                            ? 'border-cyan-400/50 bg-cyan-300/10 ring-1 ring-cyan-400/30'
                            : 'border-slate-700 bg-slate-900/60 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{method.label}</p>
                          <p className="truncate text-xs text-slate-500">
                            {disabled
                              ? method.id === 'contra-entrega'
                                ? `Solo para pedidos hasta ${formatCOP(CONTRA_ENTREGA_MAX)}`
                                : 'Temporalmente no disponible'
                              : method.desc}
                          </p>
                        </div>
                        {!disabled && (
                          <div
                            className={`ml-auto h-4 w-4 shrink-0 rounded-full border-2 transition-colors ${
                              paymentMethod === method.id
                                ? 'border-cyan-300 bg-cyan-300'
                                : 'border-slate-600 bg-transparent'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {paymentError && (
                  <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                    {paymentError}
                  </p>
                )}

                {paymentMethod === 'contra-entrega' && (
                  <div className="mt-4 rounded-xl border px-4 py-3 bg-amber-500/10 border-amber-500/20">
                    <p className="text-sm text-amber-300">
                      <strong>Contra entrega:</strong> Nuestro equipo se contactará contigo por WhatsApp para coordinar la entrega y el pago.
                    </p>
                  </div>
                )}

                {(paymentMethod === 'tarjeta' || paymentMethod === 'pse' || paymentMethod === 'nequi') && (
                  <div className="mt-4 rounded-xl bg-cyan-300/5 border border-cyan-400/20 px-4 py-3">
                    <p className="text-sm text-slate-300">
                      Serás redirigido a la pasarela segura de <strong className="text-cyan-300">Mercado Pago</strong> para completar tu pago.
                    </p>
                  </div>
                )}

                {paymentMethod === 'addi' && (
                  <div className="mt-4 rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-3">
                    <p className="text-sm text-purple-300">
                      Paga en cuotas sin interés con ADDI. Serás redirigido para completar tu solicitud de crédito.
                    </p>
                  </div>
                )}

                {paymentMethod === 'breb' && (
                  <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-300/5 px-4 py-5">
                    <p className="text-sm text-slate-300">
                      Escanea este código QR con tu app bancaria (Bancolombia, Nequi, DaviPlata, etc.) y paga el total de{' '}
                      <strong className="text-cyan-300">{formatCOP(subtotal)}</strong>.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="rounded-2xl border border-cyan-400/20 bg-white p-3">
                        <Image
                          src="/Imagenes/Qr.png"
                          alt="Código QR de pago BRE-B"
                          width={280}
                          height={280}
                          className="h-auto w-[280px]"
                        />
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-slate-500">¿El código no te funciona? Paga con la llave BRE-B</p>
                      <button
                        type="button"
                        onClick={handleCopyKey}
                        className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-cyan-400/50"
                      >
                        <span className="font-mono tracking-wide">{BREB_KEY}</span>
                        {keyCopied ? (
                          <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                      {keyCopied && <p className="mt-1.5 text-xs text-green-400">¡Llave copiada!</p>}
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                      Cuando termines el pago, presiona <strong className="text-white">&quot;Confirmar y pagar&quot;</strong>: te llevaremos a WhatsApp para que nos envíes el comprobante y así confirmar y hacer entrega de tu pedido en los próximos días.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Columna derecha: resumen */}
            <div className="h-fit rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 lg:sticky lg:top-24">
              <h2 className="mb-5 text-base font-bold text-white">Resumen del pedido</h2>

              <div className="space-y-3 border-b border-cyan-400/10 pb-4 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-slate-400 truncate pr-3">
                      {item.name} <span className="text-slate-500">×{item.quantity}</span>
                    </span>
                    <span className="shrink-0 text-white">{formatCOP(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 text-sm border-b border-cyan-400/10">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Envío</span>
                  <span className="text-green-400">Por calcular</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>IVA incluido</span>
                </div>
              </div>

              <div className="flex justify-between py-4">
                <span className="font-semibold text-white">Total a pagar</span>
                <span className="text-xl font-black text-cyan-300">{formatCOP(subtotal)}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Confirmar y pagar'}
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 py-2.5 text-sm font-semibold text-green-400 hover:bg-green-500/20 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                ¿Dudas? Escríbenos
              </a>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-600">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pago 100% seguro · SSL · Datos encriptados
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}
