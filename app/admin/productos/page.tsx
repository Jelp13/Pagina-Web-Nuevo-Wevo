import Link from 'next/link';
import { getAllProductsForAdmin } from '@/lib/admin-products';
import { formatCOP } from '@/lib/format';
import ProductImage from '@/components/ProductImage';

const SECTION_LABEL: Record<string, string> = {
  torres: 'Torres',
  perifericos: 'Periféricos',
  portatiles: 'Portátiles',
};

export default async function AdminProductosPage() {
  const productos = await getAllProductsForAdmin();

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-slate-500 hover:text-cyan-300">
              ← Volver al panel
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-white">Productos</h1>
            <p className="mt-1 text-sm text-slate-400">{productos.length} productos en total</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5">
          <div className="grid grid-cols-[64px_1fr_auto_auto_auto] items-center gap-4 border-b border-cyan-400/10 px-6 py-3 text-xs uppercase tracking-wider text-slate-500">
            <span></span>
            <span>Producto</span>
            <span>Sección</span>
            <span>Precio</span>
            <span>Estado</span>
          </div>

          {productos.map((p) => (
            <Link
              key={p.id}
              href={`/admin/productos/${p.id}`}
              className="grid grid-cols-[64px_1fr_auto_auto_auto] items-center gap-4 border-b border-cyan-400/10 px-6 py-3 transition-colors last:border-0 hover:bg-white/5"
            >
              <ProductImage src={p.image ?? undefined} alt={p.name} className="h-12 w-12 rounded-xl bg-slate-950/80" iconSize="text-lg" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{p.name}</p>
                <p className="text-xs text-slate-500">{p.category}</p>
              </div>
              <span className="text-xs text-cyan-300">{SECTION_LABEL[p.section]}</span>
              <div className="text-sm">
                <span className="font-semibold text-white">{formatCOP(p.numericPrice)}</span>
                {p.originalPrice && (
                  <span className="ml-2 text-xs text-slate-500 line-through">{formatCOP(p.originalPrice)}</span>
                )}
              </div>
              <span
                className={`justify-self-start rounded-full px-3 py-1 text-xs font-semibold ${
                  p.inStock ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}
              >
                {p.inStock ? 'Disponible' : 'Agotado'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
