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
  createdAt: Date;
}

function parseItems(json: unknown): OrderItem[] {
  if (Array.isArray(json)) return json as OrderItem[];
  if (typeof json === 'string' && json.trim()) return JSON.parse(json) as OrderItem[];
  return [];
}

export async function getAllOrdersForAdmin(): Promise<AdminOrder[]> {
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
    createdAt: r.created_at,
  }));
}
