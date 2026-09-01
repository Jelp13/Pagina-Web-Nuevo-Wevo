import { db } from './db';
import type { OrderRow } from './db';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderInput {
  reference: string;
  nombres: string;
  apellidos: string;
  email: string;
  tipoDocumento: string;
  documento: string;
  telefono: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
}

export async function createOrder(input: CreateOrderInput): Promise<void> {
  await db
    .insertInto('orders')
    .values({
      reference: input.reference,
      nombres: input.nombres,
      apellidos: input.apellidos,
      email: input.email,
      tipo_documento: input.tipoDocumento,
      documento: input.documento,
      telefono: input.telefono,
      direccion: input.direccion,
      departamento: input.departamento,
      ciudad: input.ciudad,
      items: JSON.stringify(input.items),
      total: input.total,
      payment_method: input.paymentMethod,
      status: 'pendiente',
    })
    .execute();
}

export async function updateOrderStatusByReference(
  reference: string,
  status: OrderRow['status'],
  mpPaymentId?: string,
): Promise<void> {
  await db
    .updateTable('orders')
    .set({ status, ...(mpPaymentId ? { mp_payment_id: mpPaymentId } : {}) })
    .where('reference', '=', reference)
    .execute();
}

// Pedidos con pago en línea (tarjeta, PSE, Nequi) que se quedaron en
// "pendiente" porque el cliente nunca terminó el pago en Mercado Pago
// (cerró la pestaña, no llegó webhook, etc.) — pasado este tiempo se
// consideran abandonados y se marcan como cancelados automáticamente.
// Contra entrega, BRE-B y ADDI se dejan intactos: esos sí se confirman
// manualmente por WhatsApp y pueden quedar "pendiente" varios días.
const ABANDONO_HORAS = 2;
const METODOS_EN_LINEA = ['tarjeta', 'pse', 'nequi'] as const;

async function sweepAbandonedOrders(): Promise<void> {
  await db
    .updateTable('orders')
    .set({
      status: 'cancelado',
      status_reason: 'Cancelado automáticamente: el cliente no completó el pago en línea.',
      status_updated_by: 'sistema',
    })
    .where('status', '=', 'pendiente')
    .where('payment_method', 'in', [...METODOS_EN_LINEA])
    .where('created_at', '<', new Date(Date.now() - ABANDONO_HORAS * 60 * 60 * 1000))
    .execute();
}

export interface AdminOrder {
  id: number;
  reference: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: OrderRow['status'];
  statusReason: string | null;
  statusUpdatedBy: string | null;
  createdAt: Date;
}

function parseItems(json: unknown): OrderItem[] {
  if (Array.isArray(json)) return json as OrderItem[];
  if (typeof json === 'string' && json.trim()) return JSON.parse(json) as OrderItem[];
  return [];
}

export async function getAllOrdersForAdmin(): Promise<AdminOrder[]> {
  await sweepAbandonedOrders();

  const rows = await db.selectFrom('orders').selectAll().orderBy('created_at', 'desc').execute();

  return rows.map((r) => ({
    id: r.id,
    reference: r.reference,
    nombres: r.nombres,
    apellidos: r.apellidos,
    email: r.email,
    telefono: r.telefono,
    items: parseItems(r.items),
    total: r.total,
    paymentMethod: r.payment_method,
    status: r.status,
    statusReason: r.status_reason,
    statusUpdatedBy: r.status_updated_by,
    createdAt: r.created_at,
  }));
}

export async function getOrderById(id: number) {
  return db.selectFrom('orders').selectAll().where('id', '=', id).executeTakeFirst();
}

export interface ThankYouOrder {
  reference: string;
  nombres: string;
  email: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: OrderRow['status'];
}

export async function getOrderByReference(reference: string): Promise<ThankYouOrder | null> {
  const row = await db.selectFrom('orders').selectAll().where('reference', '=', reference).executeTakeFirst();
  if (!row) return null;
  return {
    reference: row.reference,
    nombres: row.nombres,
    email: row.email,
    items: parseItems(row.items),
    total: row.total,
    paymentMethod: row.payment_method,
    status: row.status,
  };
}

export async function updateOrderStatusManually(
  id: number,
  status: 'pagado' | 'cancelado',
  reason: string,
  updatedBy: string,
): Promise<void> {
  await db
    .updateTable('orders')
    .set({ status, status_reason: reason, status_updated_by: updatedBy })
    .where('id', '=', id)
    .execute();
}
