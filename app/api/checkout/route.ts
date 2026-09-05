import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createOrder } from '@/lib/orders-db';
import { sendThankYouEmail } from '@/lib/mailer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type TipoDocumento = 'CC' | 'CE' | 'PA';

interface CheckoutBody {
  form: {
    nombres: string;
    apellidos: string;
    email: string;
    tipoDocumento: TipoDocumento;
    documento: string;
    direccion: string;
    departamento: string;
    ciudad: string;
    telefono: string;
  };
  paymentMethod: 'contra-entrega' | 'tarjeta' | 'pse' | 'nequi' | 'addi' | 'breb';
  items: CartItem[];
  total: number;
}

const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

function validateDocumento(tipo: TipoDocumento, doc: string): boolean {
  if (tipo === 'CC') return /^[1-9]\d{5,9}$/.test(doc);
  if (tipo === 'CE') return /^\d{6,9}$/.test(doc);
  if (tipo === 'PA') return /^[A-Za-z0-9]{6,12}$/.test(doc);
  return false;
}

// Contra entrega solo aplica para pedidos de hasta este monto.
const CONTRA_ENTREGA_MAX = 400000;

function validateBody(body: CheckoutBody): string | null {
  const { form, items, total, paymentMethod } = body;
  if (!form?.nombres?.trim() || !NAME_REGEX.test(form.nombres)) return 'Nombres inválidos';
  if (!form?.apellidos?.trim() || !NAME_REGEX.test(form.apellidos)) return 'Apellidos inválidos';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email inválido';
  if (!['CC', 'CE', 'PA'].includes(form.tipoDocumento) || !validateDocumento(form.tipoDocumento, form.documento)) {
    return 'Documento inválido';
  }
  if (!form.direccion?.trim() || form.direccion.length < 8) return 'Dirección inválida';
  if (!form.ciudad?.trim()) return 'Ciudad requerida';
  if (!/^[3]\d{9}$/.test(form.telefono)) return 'Teléfono inválido';
  if (!Array.isArray(items) || items.length === 0) return 'Carrito vacío';

  // Anti-tampering: verificar que el total coincide con los ítems
  const calculatedTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  if (Math.abs(calculatedTotal - total) > 1) return 'Total manipulado';

  if (total < 10000) return 'Monto mínimo de compra: $10.000 COP';

  if (paymentMethod === 'contra-entrega' && total > CONTRA_ENTREGA_MAX) {
    return `Contra entrega solo está disponible para pedidos de hasta $${CONTRA_ENTREGA_MAX.toLocaleString('es-CO')} COP`;
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();

    const error = validateBody(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { form, paymentMethod, items, total } = body;
    const reference = `WEVO-${Date.now()}-${randomUUID().split('-')[0].toUpperCase()}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    await createOrder({
      reference,
      nombres: form.nombres,
      apellidos: form.apellidos,
      email: form.email,
      tipoDocumento: form.tipoDocumento,
      documento: form.documento,
      telefono: form.telefono,
      direccion: form.direccion,
      departamento: form.departamento,
      ciudad: form.ciudad,
      items,
      total,
      paymentMethod,
    });

    // Contra entrega: sin pasarela de pago — se considera pedido confirmado
    // de una vez (se paga al recibir), así que el correo va de inmediato.
    if (paymentMethod === 'contra-entrega') {
      sendThankYouEmail({ reference, nombres: form.nombres, email: form.email, items, total, paymentMethod });
      return NextResponse.json({
        reference,
        method: 'contra-entrega',
        message: 'Pedido creado. Te contactaremos por WhatsApp.',
      });
    }

    // Mercado Pago: tarjeta, PSE, Nequi
    if (['tarjeta', 'pse', 'nequi'].includes(paymentMethod)) {
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

      // Sin credenciales: modo desarrollo — redirigir localmente
      if (!accessToken) {
        return NextResponse.json({
          reference,
          checkoutUrl: null,
          devMode: true,
          message: 'Configure MERCADOPAGO_ACCESS_TOKEN en .env para pagos reales',
        });
      }

      const client = new MercadoPagoConfig({ accessToken });
      const preferenceClient = new Preference(client);

      const result = await preferenceClient.create({
        body: {
          external_reference: reference,
          items: items.map((item) => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'COP',
          })),
          payer: {
            name: form.nombres,
            surname: form.apellidos,
            email: form.email,
            phone: { area_code: '57', number: form.telefono },
            identification: { type: form.tipoDocumento, number: form.documento },
          },
          back_urls: {
            success: `${siteUrl}/checkout/confirmacion?ref=${reference}&status=approved`,
            failure: `${siteUrl}/checkout/confirmacion?ref=${reference}&status=rejected`,
            pending: `${siteUrl}/checkout/confirmacion?ref=${reference}&status=pending`,
          },
          auto_return: 'approved',
          statement_descriptor: 'Nuevo Wevo',
        },
      });

      if (!result.init_point) {
        return NextResponse.json({ error: 'Error al crear preferencia de pago' }, { status: 502 });
      }

      return NextResponse.json({ reference, checkoutUrl: result.init_point });
    }

    // BRE-B: pago por código QR — se verifica manualmente vía comprobante por WhatsApp
    if (paymentMethod === 'breb') {
      sendThankYouEmail({ reference, nombres: form.nombres, email: form.email, items, total, paymentMethod });
      return NextResponse.json({
        reference,
        method: 'breb',
        message: 'Pedido creado. Envíanos el comprobante de pago por WhatsApp.',
      });
    }

    // ADDI (cuotas sin interés — integración independiente)
    if (paymentMethod === 'addi') {
      const addiKey = process.env.ADDI_PUBLIC_KEY;

      if (!addiKey) {
        return NextResponse.json({
          reference,
          addiUrl: `https://checkout.addi.com?amount=${total}&orderId=${reference}&currency=COP`,
          message: 'Configure ADDI_PUBLIC_KEY en .env para pagos reales',
        });
      }

      return NextResponse.json({
        reference,
        addiUrl: `https://checkout.addi.com?publicKey=${addiKey}&amount=${total}&orderId=${reference}&currency=COP&callbackUrl=${siteUrl}/checkout/confirmacion`,
      });
    }

    return NextResponse.json({ error: 'Método de pago no soportado' }, { status: 400 });

  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
