import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOrderById, updateOrderStatusManually } from '@/lib/orders-db';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

const VALID_TARGET_STATUS = ['pagado', 'cancelado'] as const;

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Order manual status update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
