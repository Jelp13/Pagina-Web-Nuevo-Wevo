import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getAdminProductById } from '@/lib/admin-products';
import AdminProductEditForm from '@/components/AdminProductEditForm';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function AdminProductoEditPage({ params }: { params: { id: string } }) {
  const producto = await getAdminProductById(params.id);
  if (!producto) notFound();

  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const esAdmin = session?.role === 'admin';

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[820px]">
        <Link href="/admin/productos" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver a productos
        </Link>
        <h1 className="mt-2 mb-8 text-3xl font-bold text-white">{producto.name}</h1>

        <AdminProductEditForm producto={producto} esAdmin={esAdmin} />
      </div>
    </main>
  );
}
