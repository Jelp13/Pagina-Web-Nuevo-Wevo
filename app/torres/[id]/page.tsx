import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import ProductTabs from '@/components/ProductTabs';
import ProductFeatures from '@/components/ProductFeatures';
import RelatedProducts from '@/components/RelatedProducts';
import AddToCartButton from '@/components/AddToCartButton';
import { PRODUCTS, FEATURED_PRODUCTS } from '@/lib/constants';
import { ROUTES, WHATSAPP_LINK } from '@/lib/config';
import { formatCOP } from '@/lib/format';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) return {};
  return {
    title: `${product.name} | Nuevo Wevo`,
    description: product.description,
  };
}

export default function TowerDetailPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();

  const related = FEATURED_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.numericPrice) / product.originalPrice) * 100)
    : null;

  const whatsappMsg = encodeURIComponent(
    `Hola, me interesa la ${product.name} (${product.price}). ¿Tienen disponibilidad?`
  );

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1180px] px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href={ROUTES.home} className="hover:text-cyan-300 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={ROUTES.torres} className="hover:text-cyan-300 transition-colors">Torres</Link>
          <span>/</span>
          <span className="text-slate-300">{product.name}</span>
        </nav>
      </div>

      {/* ── HERO DEL PRODUCTO ──────────────────────────────────── */}
      <section className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Galería */}
          <div className="relative">
            {product.badge && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-cyan-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute right-5 top-5 z-10 rounded-full bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300">
                -{discount}% OFF
              </span>
            )}
            <ProductGallery images={product.images} name={product.name} />
          </div>

          {/* Info principal */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-cyan-300">{product.category}</span>
              <h1 className="mt-2 text-4xl font-black leading-tight text-white lg:text-5xl">{product.name}</h1>
              <p className="mt-2 text-sm text-slate-500">{product.specs}</p>
            </div>

            {/* Precio */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-cyan-300">{formatCOP(product.numericPrice)}</span>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-base text-slate-500 line-through">{formatCOP(product.originalPrice)}</span>
                  <span className="text-xs text-red-400">Ahorras {formatCOP(product.originalPrice - product.numericPrice)}</span>
                </div>
              )}
            </div>

            {/* Descripción corta */}
            <p className="text-slate-400 leading-relaxed">{product.description}</p>

            {/* Características rápidas */}
            <ProductFeatures features={product.features} />

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} />
              <a
                href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-green-400/40 bg-green-500/15 py-3.5 text-sm font-semibold text-green-300 hover:bg-green-500/25 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Cotizar por WhatsApp
              </a>
            </div>

            <p className="text-center text-xs text-slate-600">
              Envío a toda Colombia · IVA incluido · Soporte técnico incluido
            </p>
          </div>
        </div>
      </section>

      {/* ── PESTAÑAS DE DETALLE ───────────────────────────────── */}
      <section className="mx-auto max-w-[1180px] px-6 pb-16">
        <ProductTabs
          specs={product.fullSpecs}
          gamingPerformance={product.gamingPerformance}
          creativePerformance={product.creativePerformance}
        />
      </section>

      {/* Productos relacionados */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <RelatedProducts products={related} />
      </section>

      <Footer />
    </main>
  );
}
