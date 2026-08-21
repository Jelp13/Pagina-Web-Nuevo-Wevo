import Link from 'next/link';
import AdminProductCreateForm from '@/components/AdminProductCreateForm';

export default function AdminProductoNuevoPage() {
  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[820px]">
        <Link href="/admin/productos" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver a productos
        </Link>
        <h1 className="mt-2 mb-8 text-3xl font-bold text-white">Nuevo producto</h1>

        <AdminProductCreateForm />
      </div>
    </main>
  );
}
