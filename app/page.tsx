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
import TikTokSection from '@/components/TikTokSection';
import { FEATURES, PRODUCTS, PERIPHERALS, BRANDS } from '@/lib/constants';
import { SITE_NAME, ROUTES, WHATSAPP_LINK } from '@/lib/config';

const features = FEATURES;

export default function Home() {
  const products = PRODUCTS;
  const peripherals = PERIPHERALS;
  const brands = BRANDS;

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* HERO SECTION - Introducción principal */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(93,213,255,0.14),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(93,213,255,0.08),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_24%)]" />
        {/* Logo de marca en segundo plano (debajo del texto) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/Imagenes/logo-mark.png"
            alt="Marca - fondo"
            width={900}
            height={900}
            priority
            style={{ opacity: 0.06 }}
            className="max-w-[70%] h-auto"
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
            Tecnología minimalista, rendimiento potente
          </span>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
           Tu setup, <span className="text-cyan-300">tus reglas.</span>
          </h1>
          <p className="max-w-2xl text-base text-slate-400 sm:text-lg">
             ¿No sabes qué PC comprar? Encuentra la tuya en 2 minutos. Responde 7 preguntas y te recomendamos el equipo exacto para tu uso y presupuesto.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <a href={ROUTES.quiz} className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:opacity-95 transition-opacity">
              Encuentra tu PC
            </a>
            <a href={ROUTES.products} className="rounded-full border border-cyan-400/20 bg-white/5 px-8 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors">
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
            <article key={product.name} className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10">
              <div className="mb-6 flex h-40 items-center justify-center rounded-3xl bg-slate-950/90 text-4xl">
                🖥️
              </div>
              {product.badge ? (
                <span className="absolute left-6 top-6 rounded-full bg-cyan-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">
                  {product.badge}
                </span>
              ) : null}
              <div className="mt-auto flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">{product.category}</span>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-slate-400">{product.specs}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-cyan-300">{product.price}</span>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/25 transition-colors"
                  >
                    Ver
                  </a>
                </div>
              </div>
            </article>
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
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
          {brands.map((brand) => (
            <div key={brand} className="rounded-3xl border border-cyan-400/10 bg-white/5 px-5 py-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition duration-300 hover:border-cyan-300/20 hover:text-white">
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER - Información y enlaces */}
      <footer className="border-t border-cyan-400/10 bg-slate-950/70 px-6 py-10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
              {SITE_NAME}
            </p>
            <p className="mt-4 text-slate-400">PCs gamer y accesorios minimalistas para Colombia con soporte directo y envío rápido.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Tienda</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li><a href="https://nuevowevo.com/shop/?categories=computadores" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Computadores</a></li>
                <li><a href={ROUTES.products} className="hover:text-cyan-300">Torres</a></li>
                <li><a href={ROUTES.peripherals} className="hover:text-cyan-300">Periféricos</a></li>
                <li><a href={ROUTES.brands} className="hover:text-cyan-300">Marcas</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Ayuda</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li><a href="https://nuevowevo.com/contact/" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Contacto</a></li>
                <li><a href="#" className="cursor-not-allowed">Seguimiento</a></li>
                <li><a href="#" className="cursor-not-allowed">FAQs</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Contacto</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-cyan-300">WhatsApp</a></li>
                <li><a href="mailto:contact@nuevowevo.com" className="hover:text-cyan-300">contact@nuevowevo.com</a></li>
                <li>Colombia</li>
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Métodos de pago</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['NEQUI', 'VISA', 'MASTERCARD', 'EFECTIVO'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1180px] border-t border-cyan-400/10 pt-6 text-sm text-slate-500">
          © 2026 {SITE_NAME}. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  );
}
