import Link from 'next/link';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import AdminLogoutButton from '@/components/AdminLogoutButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
            Panel de administración · {session?.role === 'admin' ? 'Administrador' : 'Ventas'}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Hola, {session?.username ?? 'admin'}.
          </h1>
        </div>
        <AdminLogoutButton />
      </div>

      <div className="mx-auto mt-10 grid max-w-[1180px] gap-4 sm:grid-cols-2">
        {session?.role === 'admin' && (
          <Link
            href="/admin/productos"
            className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-8 transition-colors hover:border-cyan-300/30 hover:bg-white/10"
          >
            <h2 className="text-lg font-bold text-white">Productos</h2>
            <p className="mt-2 text-sm text-slate-400">
              Edita precios, imágenes, descripciones, descuentos y disponibilidad.
            </p>
          </Link>
        )}

        <Link
          href="/admin/ventas"
          className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-8 transition-colors hover:border-cyan-300/30 hover:bg-white/10"
        >
          <h2 className="text-lg font-bold text-white">Ventas</h2>
          <p className="mt-2 text-sm text-slate-400">
            Consulta los pedidos: cliente, productos, total y estado del pago.
          </p>
        </Link>
      </div>
    </main>
  );
}
