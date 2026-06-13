/**
 * Página Principal - Home
 * 
 * Secciones:
 * - Hero: Título principal con CTA
 * - Features: 4 características principales
 * - Products: Catálogo de 4 torres destacadas
 * - Quiz Promo: Promoción del quiz recomendador
 * - Peripherals: Accesorios complementarios
 * - Brands: Marcas aliadas
 * - Footer: Información de contacto y links
 */

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TikTokSection from '@/components/TikTokSection';
import ProductCard from '@/components/ProductCard';
import { FEATURES, PRODUCTS, PERIPHERALS, BRANDS } from '@/lib/constants';
import { ROUTES } from '@/lib/config';

const features = FEATURES;

export default function Home() {
  const products = PRODUCTS;
  const peripherals = PERIPHERALS;
  const brands = BRANDS;

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* HERO SECTION - Cinematográfico con imagen de fondo */}
      <section className="relative flex min-h-[67vh] items-center overflow-hidden">

        {/*
         * ── CAPA MULTIMEDIA ──────────────────────────────────────────────
         * Para cambiar a VIDEO en el futuro, reemplaza el bloque <Image>
         * con el siguiente snippet y elimina el <Image>:
         *
         *   <video
         *     autoPlay muted loop playsInline
         *     className="absolute inset-0 h-full w-full object-cover object-center"
         *   >
         *     <source src="/Video/hero.mp4" type="video/mp4" />
         *   </video>
         *
         * El resto de capas (overlays, contenido) no cambia.
         * ─────────────────────────────────────────────────────────────────
         */}
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <Image
            src="/Imagenes/hero-bg2.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[50%_30%]"
            quality={90}
          />
        </div>

        {/* Capa 1 — Vignette: oscuro en bordes, abierto en centro (efecto de profundidad) */}
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,8,15,0.45),rgba(5,8,15,0.82))]" />

        {/* Capa 2 — Degradados de color de marca (cyan atmosférico) */}
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_25%_40%,rgba(93,213,255,0.10),transparent_55%),radial-gradient(ellipse_at_75%_20%,rgba(93,213,255,0.06),transparent_45%)]" />

        {/* Capa 3 — Desvanecimiento inferior para fusión con la página */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-[#05080f] to-transparent" />

        {/* ── CAPA DE CONTENIDO ───────────────────────────────────────── */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1180px] flex-col items-center gap-8 px-6 py-14 text-center sm:py-16">

          <span className="rounded-full border border-cyan-400/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-sm">
            Tecnología minimalista, rendimiento potente
          </span>

          <h1 className="max-w-4xl text-6xl font-black leading-[1.0] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
            Tu setup,{' '}
            <span className="text-cyan-300">tus reglas.</span>
          </h1>

          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            ¿No sabes qué PC comprar? Encuentra la tuya en 2 minutos. Responde 7 preguntas y te recomendamos el equipo exacto para tu uso y presupuesto.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <a href={ROUTES.quiz} className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:opacity-95 transition-opacity">
              Encuentra tu PC
            </a>
            <a href={ROUTES.products} className="rounded-full border border-cyan-400/20 bg-white/5 px-8 py-3 text-sm font-semibold text-slate-100 backdrop-blur-sm hover:bg-white/10 transition-colors">
              Ver torres
            </a>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION - 4 características principales */}
      <section className="mx-auto max-w-[1180px] px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.text} className="rounded-3xl border border-cyan-400/10 bg-white/5 p-5 text-sm text-slate-300 shadow-lg hover:border-cyan-300/20 hover:bg-white/10 transition-colors">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-xl" role="img" aria-label={feature.text}>
                {feature.icon}
              </div>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <TikTokSection />

      {/* PRODUCTS SECTION - Catálogo de torres */}
      <section id="products-anchor" className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Torres destacadas</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Máquinas potentes con estética limpia.</h2>
            <p className="mt-3 max-w-xl text-slate-400">
              Selección premium con componentes elegidos para gaming, creación y productividad.
            </p>
          </div>
          <a href="https://nuevowevo.com/shop/" target="_blank" rel="noreferrer" className="rounded-full border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors">
            Ver todas
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* QUIZ PROMO SECTION - Promoción del recomendador */}
      <section className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="rounded-[32px] border border-cyan-400/10 bg-white/5 p-10 text-center shadow-lg">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Recomendador inteligente</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">¿Listo para encontrar tu PC ideal?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Responde las preguntas en una página dedicada y recibe una recomendación personalizada según tu uso y presupuesto.
          </p>
          <a
            href={ROUTES.quiz}
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-4 text-sm font-semibold text-slate-950 shadow-lg hover:opacity-95 transition-opacity"
          >
            Iniciar quiz ahora
          </a>
        </div>
      </section>

      {/* PERIPHERALS SECTION - Accesorios complementarios */}
      <section id="perifericos" className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Periféricos esenciales</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Accesorios para completar tu setup.</h2>
            <p className="mt-3 max-w-xl text-slate-400">Todo lo necesario para que tu espacio sea moderno, funcional y profesional.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {peripherals.map((item) => (
            <div key={item.name} className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-300/10 text-2xl" role="img" aria-label={item.name}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS SECTION - Marcas aliadas */}
      <section id="brands" className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Marcas</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Confiadas por los mejores aliados.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <div key={brand} className="rounded-3xl border border-cyan-400/10 bg-white/5 px-5 py-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition duration-300 hover:border-cyan-300/20 hover:text-white">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
