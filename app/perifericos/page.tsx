import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductImage from '@/components/ProductImage';
import { PERIPHERAL_PRODUCTS, PERIPHERALS } from '@/lib/constants';
import { WHATSAPP_LINK } from '@/lib/config';
import { formatCOP } from '@/lib/format';

export const metadata = {
  title: 'Periféricos | Nuevo Wevo',
  description: 'Catálogo completo de periféricos gaming: monitores, mouse, teclados, audífonos y más.',
};

export default function Perifericos({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const categoriaActiva = searchParams.categoria ?? null;

  const productos = categoriaActiva
    ? PERIPHERAL_PRODUCTS.filter((p) => p.categorySlug === categoriaActiva)
    : PERIPHERAL_PRODUCTS;

  const categoriaLabel =
    PERIPHERALS.find((p) => p.slug === categoriaActiva)?.name ?? null;

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
          {categoriaLabel ? categoriaLabel : 'Catálogo completo'}
        </p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          {categoriaLabel ? categoriaLabel : 'Periféricos.'}
        </h1>
        <p className="mt-4 max-w-xl text-slate-400">
          {categoriaLabel
            ? `Todos los productos disponibles en la categoría ${categoriaLabel.toLowerCase()}.`
            : 'Todo lo que necesitas para completar tu setup: monitores, periféricos y accesorios gaming.'}
        </p>
      </section>

      {/* Filtros de categoría */}
      <section className="mx-auto max-w-[1180px] px-6 pb-8">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/perifericos"
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              !categoriaActiva
                ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-300'
                : 'border-slate-700 bg-white/5 text-slate-400 hover:border-cyan-300/30 hover:text-slate-200'
            }`}
          >
            Todos
          </Link>
          {PERIPHERALS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/perifericos?categoria=${cat.slug}`}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                categoriaActiva === cat.slug
                  ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-300'
                  : 'border-slate-700 bg-white/5 text-slate-400 hover:border-cyan-300/30 hover:text-slate-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid de productos */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        {productos.length === 0 ? (
          <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 py-20 text-center">
            <p className="text-slate-500">
              Próximamente agregaremos productos en esta categoría.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productos.map((product) => {
              const discount = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.numericPrice) /
                      product.originalPrice) *
                      100,
                  )
                : null;

              return (
                <Link
                  key={product.id}
                  href={`/perifericos/${product.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10"
                >
                  {product.badge && (
                    <span className="absolute left-7 top-7 rounded-full bg-cyan-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">
                      {product.badge}
                    </span>
                  )}
                  {discount && (
                    <span className="absolute right-7 top-7 rounded-full bg-red-500/20 px-2.5 py-1 text-[10px] font-bold text-red-300">
                      -{discount}%
                    </span>
                  )}

                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    className="mb-6 h-56 rounded-3xl bg-slate-950/90"
                    iconSize="text-6xl"
                  />

                  <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                      {product.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {product.shortDescription?.split('\n\n')[0] ??
                        product.description}
                    </p>
                    <p className="text-xs text-slate-500">{product.specs}</p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-cyan-300">
                          {formatCOP(product.numericPrice)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            {formatCOP(product.originalPrice)}
                          </span>
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
        )}

        {/* CTA contacto */}
        <div className="mt-16 rounded-[32px] border border-cyan-400/10 bg-white/5 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
            ¿No encuentras lo que buscas?
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white">
            Te cotizamos el periférico que necesitas.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Dinos qué accesorio estás buscando y te conseguimos la mejor opción
            para tu setup.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500/20 px-8 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/30 transition-colors"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
