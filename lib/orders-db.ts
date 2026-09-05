import { db } from './db';
import type { OrderRow } from './db';
import { sendThankYouEmail } from './mailer';

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
//
// Antes de cancelar cada candidato se verifica directamente contra la API
// de Mercado Pago: el webhook puede fallar en llegar (nos pasó con un
// pedido real que el cliente sí pagó y el sistema canceló solo), así que
// esta es la red de seguridad que evita cancelar un pedido que en
// realidad sí se pagó.
const ABANDONO_HORAS = 2;
const METODOS_EN_LINEA = ['tarjeta', 'pse', 'nequi'] as const;

// Contra entrega y ADDI se confirman manualmente (WhatsApp o panel admin)
// y no tienen forma de verificarse contra una API externa, así que se les
// da más margen antes de considerarlos abandonados. ADDI en particular no
// tiene integración real (solo redirige) y nunca cambia de estado por sí
// solo, por lo que sin este barrido quedaría "pendiente" para siempre —
// se deja listo para cuando se integre correctamente.
//
// BRE-B queda fuera de este barrido a propósito: el equipo prefiere
// revisar el comprobante y marcar manualmente el pedido como pagado o
// cancelado desde /admin/ventas, sin un cierre automático por tiempo.
const ABANDONO_HORAS_MANUAL = 24 * 3;
const METODOS_MANUALES = ['contra-entrega', 'addi'] as const;

interface MpPaymentSearchResult {
  results?: { id: number; status: string }[];
}

async function buscarPagoAprobadoEnMercadoPago(reference: string): Promise<string | null> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return null;

  try {
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/search?external_reference=${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as MpPaymentSearchResult;
    const aprobado = data.results?.find((p) => p.status === 'approved');
    return aprobado ? String(aprobado.id) : null;
  } catch (err) {
    console.error(`Error verificando pago con Mercado Pago para ${reference}:`, err);
    return null;
  }
}

async function sweepAbandonedOrders(): Promise<void> {
  const candidatos = await db
    .selectFrom('orders')
    .select(['id', 'reference', 'nombres', 'email', 'items', 'total', 'payment_method'])
    .where('status', '=', 'pendiente')
    .where('payment_method', 'in', [...METODOS_EN_LINEA])
    .where('created_at', '<', new Date(Date.now() - ABANDONO_HORAS * 60 * 60 * 1000))
    .execute();

  for (const candidato of candidatos) {
    // eslint-disable-next-line no-await-in-loop
    const mpPaymentId = await buscarPagoAprobadoEnMercadoPago(candidato.reference);

    if (mpPaymentId) {
      // eslint-disable-next-line no-await-in-loop
      await db
        .updateTable('orders')
        .set({
          status: 'pagado',
          status_reason: 'Confirmado automáticamente contra la API de Mercado Pago (el webhook no había actualizado el pedido).',
          status_updated_by: 'sistema',
          mp_payment_id: mpPaymentId,
        })
        .where('id', '=', candidato.id)
        .execute();

      sendThankYouEmail({
        reference: candidato.reference,
        nombres: candidato.nombres,
        email: candidato.email,
        items: parseItems(candidato.items),
        total: candidato.total,
        paymentMethod: candidato.payment_method,
      });
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    await db
      .updateTable('orders')
      .set({
        status: 'cancelado',
        status_reason: 'Cancelado automáticamente: el cliente no completó el pago en línea.',
        status_updated_by: 'sistema',
      })
      .where('id', '=', candidato.id)
      .execute();
  }

  // Contra entrega, BRE-B y ADDI que llevan más de 3 días sin confirmarse
  // manualmente (nunca se marcó "pagado" desde /admin/ventas): se dan por
  // abandonados y se cancelan automáticamente.
  await db
    .updateTable('orders')
    .set({
      status: 'cancelado',
      status_reason: 'Cancelado automáticamente: el pedido no fue confirmado a tiempo.',
      status_updated_by: 'sistema',
    })
    .where('status', '=', 'pendiente')
    .where('payment_method', 'in', [...METODOS_MANUALES])
    .where('created_at', '<', new Date(Date.now() - ABANDONO_HORAS_MANUAL * 60 * 60 * 1000))
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
