import Link from 'next/link';
import { getAllOrdersForAdmin } from '@/lib/orders-db';
import { formatCOP } from '@/lib/format';
import OrderStatusAction from '@/components/admin/OrderStatusAction';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<string, string> = {
  pendiente: 'Pendiente',
  pagado: 'Pagado',
  rechazado: 'Rechazado',
  cancelado: 'Cancelado',
};

const STATUS_CLASS: Record<string, string> = {
  pendiente: 'bg-amber-500/10 text-amber-400',
  pagado: 'bg-green-500/10 text-green-400',
  rechazado: 'bg-red-500/10 text-red-400',
  cancelado: 'bg-slate-600/20 text-slate-400',
};

const PAYMENT_LABEL: Record<string, string> = {
  'contra-entrega': 'Contra entrega',
  tarjeta: 'Tarjeta',
  pse: 'PSE',
  nequi: 'Nequi',
  addi: 'ADDI',
  breb: 'BRE-B',
};

type Filtro = 'todos' | 'pendiente' | 'exitoso' | 'cancelado';

const FILTROS: { key: Filtro; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'exitoso', label: 'Exitosos' },
  { key: 'cancelado', label: 'Cancelados' },
];

function formatFecha(date: Date): string {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(new Date(date));
}

export default async function AdminVentasPage({
  searchParams,
}: {
  searchParams: { estado?: string };
}) {
  const pedidos = await getAllOrdersForAdmin();
  const filtro: Filtro = (['pendiente', 'exitoso', 'cancelado'] as const).includes(
    searchParams.estado as 'pendiente' | 'exitoso' | 'cancelado',
  )
    ? (searchParams.estado as Filtro)
    : 'todos';

  const conteo: Record<Filtro, number> = {
    todos: pedidos.length,
    pendiente: pedidos.filter((p) => p.status === 'pendiente').length,
    exitoso: pedidos.filter((p) => p.status === 'pagado').length,
    cancelado: pedidos.filter((p) => p.status === 'cancelado' || p.status === 'rechazado').length,
  };

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtro === 'todos') return true;
    if (filtro === 'pendiente') return p.status === 'pendiente';
    if (filtro === 'exitoso') return p.status === 'pagado';
    return p.status === 'cancelado' || p.status === 'rechazado';
  });

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-slate-500 hover:text-cyan-300">
            ← Volver al panel
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-white">Ventas</h1>
          <p className="mt-1 text-sm text-slate-400">{pedidos.length} pedidos en total</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <Link
              key={f.key}
              href={f.key === 'todos' ? '/admin/ventas' : `/admin/ventas?estado=${f.key}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filtro === f.key
                  ? 'bg-gradient-to-r from-cyan-300 to-blue-500 text-slate-950'
                  : 'border border-cyan-400/10 bg-white/5 text-slate-300 hover:border-cyan-300/30'
              }`}
            >
              {f.label} <span className={filtro === f.key ? 'opacity-70' : 'text-slate-500'}>{conteo[f.key]}</span>
            </Link>
          ))}
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 py-20 text-center text-slate-500">
            {pedidos.length === 0 ? 'Todavía no hay pedidos registrados.' : 'No hay pedidos con este estado.'}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[28px] border border-cyan-400/10 bg-white/5">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead>
                <tr className="border-b border-cyan-400/10 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-medium">Fecha</th>
                  <th className="px-5 py-3 font-medium">Cliente</th>
                  <th className="px-5 py-3 font-medium">Productos</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Método</th>
                  <th className="px-5 py-3 font-medium">Estado</th>
                  <th className="px-5 py-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((p) => (
                  <tr key={p.id} className="border-b border-cyan-400/10 last:border-0 hover:bg-white/5">
                    <td className="whitespace-nowrap px-5 py-4 text-slate-400">{formatFecha(p.createdAt)}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">
                        {p.nombres} {p.apellidos}
                      </p>
                      <p className="text-xs text-slate-500">{p.email}</p>
                      <p className="text-xs text-slate-500">{p.telefono}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {p.items.map((item, i) => (
                        <p key={i} className="whitespace-nowrap">
                          {item.name} <span className="text-slate-500">×{item.quantity}</span>
                        </p>
                      ))}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-cyan-300">{formatCOP(p.total)}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                      {PAYMENT_LABEL[p.paymentMethod] ?? p.paymentMethod}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASS[p.status]}`}>
                        {STATUS_LABEL[p.status]}
                      </span>
                      {p.statusReason && (
                        <p className="mt-1.5 max-w-[220px] text-xs italic text-slate-500">
                          "{p.statusReason}"{p.statusUpdatedBy ? ` — ${p.statusUpdatedBy}` : ''}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {p.status === 'pendiente' && <OrderStatusAction orderId={p.id} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
