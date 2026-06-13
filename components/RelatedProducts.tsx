import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import type { Product } from '@/lib/constants';
import { formatCOP } from '@/lib/format';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="border-t border-cyan-400/10 pt-16">
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">También te puede interesar</p>
      <h2 className="mt-2 mb-8 text-2xl font-bold text-white">Productos relacionados</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const discount = p.originalPrice
            ? Math.round(((p.originalPrice - p.numericPrice) / p.originalPrice) * 100)
            : null;
          return (
            <Link
              key={p.id}
              href={`/torres/${p.id}`}
              className="group relative flex flex-col gap-4 rounded-[24px] border border-cyan-400/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10"
            >
              {p.badge && (
                <span className="absolute left-5 top-5 rounded-full bg-cyan-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                  {p.badge}
                </span>
              )}
              {discount && (
                <span className="absolute right-5 top-5 rounded-full bg-red-500/20 px-2 py-1 text-[10px] font-bold text-red-300">
                  -{discount}%
                </span>
              )}
              <ProductImage src={p.images[0]} alt={p.name} className="h-52 rounded-2xl bg-slate-950/80" iconSize="text-4xl" />
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">{p.category}</span>
                <h3 className="font-bold text-white group-hover:text-cyan-100 transition-colors">{p.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{p.specs}</p>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300">{formatCOP(p.numericPrice)}</span>
                    {p.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">{formatCOP(p.originalPrice)}</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition-colors">Ver →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
