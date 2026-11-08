import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import type { PeripheralProduct } from '@/lib/constants';
import { formatCOP } from '@/lib/format';

// Grid de tarjetas de periféricos, compartido entre /perifericos (con o
// sin filtro ?categoria=) y las páginas dedicadas /perifericos/categoria/[slug].
// Evita duplicar este markup en varios archivos (ya pasó antes con las
// tarjetas de torres/portátiles y costó un buen rato detectarlo).
export default function PerifericosGrid({ productos }: { productos: PeripheralProduct[] }) {
  if (productos.length === 0) {
    return (
      <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 py-20 text-center">
        <p className="text-slate-500">Próximamente agregaremos productos en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((product) => {
        const discount = product.originalPrice
          ? Math.round(((product.originalPrice - product.numericPrice) / product.originalPrice) * 100)
          : null;

        return (
          <Link
            key={product.id}
            href={`/perifericos/${product.id}`}
            className="group relative flex flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10"
          >
            <div className="relative mb-6">
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                className={`h-56 rounded-3xl bg-slate-950/90 ${!product.inStock ? 'opacity-80' : ''}`}
                iconSize="text-6xl"
              />

              {product.badge && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950 shadow-lg">
                  {product.badge}
                </span>
              )}
              {!product.inStock ? (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                  Agotado
                </span>
              ) : discount ? (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                  -{discount}%
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">{product.category}</span>
              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                {product.name}
              </h2>
              <p className="text-sm text-slate-400 line-clamp-2">
                {product.shortDescription?.split('\n\n')[0] ?? product.description}
              </p>
              <p className="text-xs text-slate-500">{product.specs}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-cyan-300">{formatCOP(product.numericPrice)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">{formatCOP(product.originalPrice)}</span>
                  )}
                </div>
                <span className="rounded-full bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 group-hover:bg-cyan-300/20 transition-colors">
                  Ver detalle →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
