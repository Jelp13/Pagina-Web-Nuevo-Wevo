import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { updateOrderStatusByReference } from '@/lib/orders-db';

function mapMpStatus(mpStatus: string): 'pagado' | 'rechazado' | 'cancelado' | 'pendiente' {
  if (mpStatus === 'approved') return 'pagado';
  if (mpStatus === 'rejected') return 'rechazado';
  if (mpStatus === 'cancelled') return 'cancelado';
  return 'pendiente'; // pending, in_process, authorized, in_mediation, etc.
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-signature') ?? '';
    const requestId = req.headers.get('x-request-id') ?? '';
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

    // Validar firma HMAC si el secret está configurado
    if (secret && signature) {
      const url = new URL(req.url);
      const dataId = url.searchParams.get('data.id') ?? '';

      const ts = signature.split(',').find((p) => p.startsWith('ts='))?.split('=')[1] ?? '';
      const v1 = signature.split(',').find((p) => p.startsWith('v1='))?.split('=')[1] ?? '';

      const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
      const expected = createHmac('sha256', secret).update(manifest).digest('hex');

      if (expected !== v1) {
        return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
      }
    }

    const notification = await req.json() as { type?: string; data?: { id?: string } };
    const { type, data } = notification;

    // Verificar pago desde la API de Mercado Pago (no confiar solo en el webhook)
    if (type === 'payment' && data?.id) {
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

      if (accessToken) {
        const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (paymentRes.ok) {
          const payment = await paymentRes.json() as {
            status: string;
            external_reference: string;
            transaction_amount: number;
          };

          const { status, external_reference } = payment;

          if (external_reference) {
            await updateOrderStatusByReference(external_reference, mapMpStatus(status), String(data.id));
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// Mercado Pago verifica el endpoint con GET al configurarlo
export async function GET() {
  return NextResponse.json({ ok: true });
}
