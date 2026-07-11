import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductImage from '@/components/ProductImage';
import { PRODUCTS } from '@/lib/constants';
import { ROUTES, WHATSAPP_LINK } from '@/lib/config';
import { formatCOP } from '@/lib/format';

export const metadata = {
  title: 'Torres | Nuevo Wevo',
  description: 'Catálogo completo de torres gaming minimalistas. Encuentra tu PC ideal.',
};

export default function TorresPage() {
  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Catálogo completo</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Torres disponibles.</h1>
        <p className="mt-4 max-w-xl text-slate-400">
          Selección de equipos ensamblados con componentes premium, listos para gaming, diseño y productividad.
        </p>
      </section>

      {/* Grid de productos */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.numericPrice) / product.originalPrice) * 100)
              : null;

            return (
              <Link
                key={product.id}
                href={`/torres/${product.id}`}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10"
              >
                {/* Badges */}
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

                {/* Imagen del producto */}
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  className="mb-6 h-80 rounded-3xl bg-slate-950/90"
                  iconSize="text-6xl"
                />

                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">{product.category}</span>
                  <h2 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">{product.name}</h2>
                  <p className="text-sm text-slate-400">{product.shortDescription ?? product.description}</p>
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

        {/* CTA contacto */}
        <div className="mt-16 rounded-[32px] border border-cyan-400/10 bg-white/5 p-10 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">¿No encuentras lo que buscas?</p>
          <h2 className="mt-4 text-2xl font-bold text-white">Te cotizamos una torre a tu medida.</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Dinos tu presupuesto y uso y armamos el equipo perfecto para ti.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-green-500/20 border border-green-400/40 px-8 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/30 transition-colors"
            >
              Cotizar por WhatsApp
            </a>
            <Link
              href={ROUTES.quiz}
              className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-semibold text-slate-950 hover:opacity-95 transition-opacity"
            >
              Recomendacion inteligente
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
