import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAdminProductById } from '@/lib/admin-products';
import AdminProductEditForm from '@/components/AdminProductEditForm';

export const dynamic = 'force-dynamic';

export default async function AdminProductoEditPage({ params }: { params: { id: string } }) {
  const producto = await getAdminProductById(params.id);
  if (!producto) notFound();

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[820px]">
        <Link href="/admin/productos" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver a productos
        </Link>
        <h1 className="mt-2 mb-8 text-3xl font-bold text-white">{producto.name}</h1>

        <AdminProductEditForm producto={producto} />
      </div>
    </main>
  );
}
