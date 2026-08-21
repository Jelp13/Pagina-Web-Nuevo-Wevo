import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import AdminLogoutButton from '@/components/AdminLogoutButton';

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

      <div className="mx-auto mt-10 max-w-[1180px] rounded-[28px] border border-cyan-400/10 bg-white/5 p-8">
        <p className="text-slate-400">
          Sesión activa correctamente.{' '}
          {session?.role === 'admin'
            ? 'La gestión de productos y el listado de ventas se agregan en las próximas fases.'
            : 'El listado de ventas se agrega en la próxima fase.'}
        </p>
      </div>
    </main>
  );
}
