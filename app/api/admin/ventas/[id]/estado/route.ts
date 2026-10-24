import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatusManually } from '@/lib/orders-db';
import { sendThankYouEmail } from '@/lib/mailer';
import { requireApiSession } from '@/lib/require-session';

function parseItems(json: unknown) {
  if (Array.isArray(json)) return json;
  if (typeof json === 'string' && json.trim()) return JSON.parse(json);
  return [];
}

const VALID_TARGET_STATUS = ['pagado', 'cancelado'] as const;

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req);
  if ('error' in auth) return auth.error;
  const { session } = auth;

  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: 'Id inválido' }, { status: 400 });
    }

    const order = await getOrderById(id);
    if (!order) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }
    if (order.status !== 'pendiente') {
      return NextResponse.json(
        { error: 'Solo se puede cambiar manualmente un pedido que esté pendiente.' },
        { status: 400 },
      );
    }

    const { status, reason } = await req.json();
    if (!VALID_TARGET_STATUS.includes(status)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
    }
    if (typeof reason !== 'string' || !reason.trim()) {
      return NextResponse.json({ error: 'La justificación es obligatoria.' }, { status: 400 });
    }

    await updateOrderStatusManually(id, status, reason.trim(), session.username);

    if (status === 'pagado') {
      sendThankYouEmail({
        reference: order.reference,
        nombres: order.nombres,
        email: order.email,
        items: parseItems(order.items),
        total: order.total,
        paymentMethod: order.payment_method,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Order manual status update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
