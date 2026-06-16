'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ROUTES, WHATSAPP_LINK } from '@/lib/config';

function ConfirmationContent() {
  const params = useSearchParams();
  const ref = params.get('ref') ?? 'N/D';
  const method = params.get('method') ?? '';
  const status = params.get('status') ?? 'APPROVED';

  // Mercado Pago retorna status en minúsculas: 'approved', 'rejected', 'pending'
  const isApproved = status === 'approved' || status === 'APPROVED' || method === 'contra-entrega';
  const isContraEntrega = method === 'contra-entrega';

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      {/* Ícono de estado */}
      <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-5xl ${
        isApproved ? 'bg-green-500/15' : 'bg-red-500/15'
      }`}>
        {isApproved ? '✓' : '✗'}
      </div>

      <h1 className="text-3xl font-black text-white">
        {isApproved
          ? isContraEntrega
            ? '¡Pedido recibido!'
            : '¡Pago exitoso!'
          : 'Pago no completado'}
      </h1>

      <p className="mt-4 text-slate-400">
        {isApproved
          ? isContraEntrega
            ? 'Hemos recibido tu pedido. Nuestro equipo se comunicará contigo por WhatsApp para coordinar la entrega.'
            : 'Tu pago fue procesado correctamente. Recibirás un correo de confirmación con los detalles de tu pedido.'
          : 'Hubo un problema al procesar tu pago. No se realizó ningún cargo. Por favor intenta de nuevo o usa otro método de pago.'}
      </p>

      {/* Referencia */}
      <div className="my-8 rounded-2xl border border-cyan-400/10 bg-white/5 p-5">
        <p className="text-sm text-slate-500">Referencia del pedido</p>
        <p className="mt-1 font-mono text-lg font-bold text-cyan-300">{ref}</p>
        <p className="mt-2 text-xs text-slate-600">Guarda este número para cualquier consulta</p>
      </div>

      {isApproved && (
        <div className="mb-8 rounded-2xl border border-cyan-400/10 bg-white/5 p-5 text-left space-y-2 text-sm">
          <h2 className="font-semibold text-white mb-3">Próximos pasos</h2>
          {isContraEntrega ? (
            <>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">1.</span> Revisamos disponibilidad de tu equipo</p>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">2.</span> Te contactamos por WhatsApp en menos de 2 horas</p>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">3.</span> Coordinamos fecha y hora de entrega</p>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">4.</span> Pagas al recibir tu pedido</p>
            </>
          ) : (
            <>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">1.</span> Recibirás un correo de confirmación</p>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">2.</span> Preparamos tu equipo (1–2 días hábiles)</p>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">3.</span> Envío express a tu ciudad</p>
              <p className="flex gap-2 text-slate-400"><span className="text-cyan-300">4.</span> Te notificamos el seguimiento por WhatsApp</p>
            </>
          )}
        </div>
      )}

      {/* Acciones */}
      <div className="flex flex-col gap-3">
        {isApproved ? (
          <>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-bold text-white hover:bg-green-500 transition-colors shadow-lg"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hablar con soporte
            </a>
            <Link
              href={ROUTES.home}
              className="rounded-full border border-cyan-400/20 bg-white/5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
            >
              Volver al inicio
            </Link>
          </>
        ) : (
          <>
            <Link
              href={ROUTES.checkout}
              className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity"
            >
              Intentar de nuevo
            </Link>
            <Link
              href={ROUTES.cart}
              className="rounded-full border border-cyan-400/20 bg-white/5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
            >
              Volver al carrito
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />
      <Suspense fallback={
        <div className="flex items-center justify-center py-32 text-slate-400">
          Cargando...
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
    </main>
  );
}
