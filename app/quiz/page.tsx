'use client';

/**
 * Página Quiz - Recomendador Inteligente de PCs
 * 
 * Funcionalidad:
 * - 7 preguntas adaptativas sobre necesidades del usuario
 * - Soporte para respuestas múltiples en 2 preguntas
 * - Motor de recomendación basado en presupuesto, experiencia y resolución
 * - Resultado personalizado con CTA directo al producto
 */

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Quiz from '@/components/Quiz';
import Footer from '@/components/Footer';
import ProductImage from '@/components/ProductImage';
import { PRODUCTS, FEATURED_PRODUCTS, PERIPHERALS, BRANDS, QUIZ_QUESTIONS } from '@/lib/constants';

const quizQuestions = QUIZ_QUESTIONS;
const products = FEATURED_PRODUCTS;
const peripherals = PERIPHERALS;
const brands = BRANDS;

// Devuelve el resultado apuntando a la página interna de la torre
const findTower = (id: string) => {
  const tower = PRODUCTS.find((p) => p.id === id)!;
  return {
    name: tower.name,
    desc: tower.shortDescription ?? tower.description,
    url: `/torres/${id}`,
  };
};

/**
 * Motor de recomendación
 * [0] uso: 0=competitivo · 1=AAA · 2=diseño · 3=trabajo · 4=mixto
 * [1] presupuesto: 0=<3.5M · 1=3.5-5M · 2=5-7M · 3=7-10M · 4=>10M
 * [2] resolución: 0=1080p · 1=1440p · 2=4K · 3=noSé
 * [3] fps: 0=60fps · 1=120fps · 2=200+fps · 3=noJuega
 * [4] software: multiple [0=PS/AI · 1=Premiere/DV · 2=Blender/C4D · 3=ninguno]
 * [5] estética: 0=negro/RGB · 1=blanco · 2=indiferente
 * [6] valor: 0=máxRend · 1=moderno · 2=calidadPrecio · 3=precioMínimo
 * [7] intensidad: 0=casual · 1=regular · 2=intensivo · 3=profesional
 */
const getQuizResult = (answers: (number | number[] | null)[]) => {
  const uso         = typeof answers[0] === 'number' ? answers[0] : 3;
  const presupuesto = typeof answers[1] === 'number' ? answers[1] : 1;
  const resolucion  = typeof answers[2] === 'number' ? answers[2] : 0;
  const fps         = typeof answers[3] === 'number' ? answers[3] : 0;
  const software    = Array.isArray(answers[4]) ? answers[4] : [];
  const estetica    = typeof answers[5] === 'number' ? answers[5] : 2;
  const valor       = typeof answers[6] === 'number' ? answers[6] : 2;
  const intensidad  = typeof answers[7] === 'number' ? answers[7] : 1;

  const noJuega        = fps === 3 || uso === 3;
  const esProductividad = uso === 2 || uso === 3;
  const quiereDiseño   = uso === 2 || uso === 4;
  const quiereBlanco   = estetica === 1;
  const quierePrecio   = valor === 3;
  const quiereModerno  = valor === 1;
  const quiere4K       = resolucion === 2;
  const quiere1440p    = resolucion === 1;
  const usaBlender     = software.includes(2);
  const usaVideo       = software.includes(1);
  const esIntensivo    = intensidad >= 2;
  const esCompetitivo  = uso === 0 || fps === 2;

  // ── PRESUPUESTO 0 · Hasta $3.5M ─────────────────────────────
  if (presupuesto === 0) {
    if (quierePrecio || (noJuega && !esIntensivo)) return findTower('torre-broce');
    return findTower('torre-wevo-con-jamon');
  }

  // ── PRESUPUESTO 1 · $3.5M – $5M ─────────────────────────────
  if (presupuesto === 1) {
    if (noJuega || esProductividad) return findTower('torre-wevo-tibio');
    return findTower('torre-wevo-extra');
  }

  // ── PRESUPUESTO 2 · $5M – $7M ───────────────────────────────
  if (presupuesto === 2) {
    if (quiereBlanco) return findTower('torre-clara-de-wevo');
    if (noJuega || esProductividad) return findTower('torre-wevo-cosido');
    return findTower('torre-wevo-de-codorniz');
  }

  // ── PRESUPUESTO 3 · $7M – $10M ──────────────────────────────
  if (presupuesto === 3) {
    if ((quiereDiseño || usaVideo) && esIntensivo) return findTower('torre-wevo-ranchero');
    if (esCompetitivo || quiere1440p || quiereModerno) return findTower('torre-wevo-pochado');
    return findTower('torre-wevo-revuelto');
  }

  // ── PRESUPUESTO 4 · Más de $10M ─────────────────────────────
  if (usaBlender || (quiere4K && esIntensivo)) return findTower('torre-wevo-tortilla');
  if (quiereDiseño || usaVideo || quiere4K)    return findTower('torre-wevo-perico');
  if (uso === 1 && quiere1440p)                return findTower('torre-wevo-tortilla');
  return findTower('torre-wevo-perico');
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#05080f] text-white">
      {/* Barra de navegación reutilizable */}
      <Navbar />

      {/* HERO SECTION - Presentación y CTA */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(93,213,255,0.16),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(93,213,255,0.1),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_24%)]" />
        <Image
          src="/Imagenes/logo-wevo-solo.png"
          alt=""
          aria-hidden="true"
          width={880}
          height={480}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-[0.07]"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">
            Encuentra tu PC ideal con unas pocas preguntas.
          </h1>
          <p className="max-w-2xl text-base text-slate-400 sm:text-lg">
            Completa el cuestionario pensado para recomendarte la torre y el setup que mejor se adaptan a tu
            experiencia y presupuesto.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <a
              href="#quiz-panel"
              className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-semibold text-slate-950 shadow-glow hover:opacity-95 transition-opacity"
            >
              Iniciar la busqueda
            </a>
            <a
              href="#torres"
              className="rounded-full border border-cyan-400/20 bg-white/5 px-8 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
            >
              Ver torres
            </a>
          </div>
        </div>
      </section>

      {/* QUIZ SECTION - Panel principal del recomendador */}
      <section id="quiz-panel" className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="rounded-[32px] border border-cyan-400/10 bg-white/5 p-8 shadow-glow">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Preguntas inteligentes</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Tu guía para elegir el equipo correcto</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Responde estas preguntas y recibe una recomendación personalizada basada en tu perfil.
            </p>
          </div>
          <Quiz questions={quizQuestions} getResult={getQuizResult} />
        </div>
      </section>

      {/* PRODUCTS SECTION - Torres destacadas */}
      <section id="torres" className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Torres recomendadas</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Modelos listos para tu estilo.</h2>
            <p className="mt-3 max-w-xl text-slate-400">Equipos balanceados para gaming, creación y trabajos exigentes.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.name}
              className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10"
            >
              <ProductImage src={product.images[0]} alt={product.name} className="mb-6 h-40 rounded-3xl bg-slate-950/90" iconSize="text-4xl" />

              {product.badge && (
                <span className="absolute left-6 top-6 rounded-full bg-cyan-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-100">
                  {product.badge}
                </span>
              )}

              <div className="mt-auto flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">{product.category}</span>
                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                <p className="text-sm text-slate-400">{product.specs}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-cyan-300">{product.price}</span>
                  <a
                    href={`/torres/${product.id}`}
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

      {/* PERIPHERALS SECTION - Accesorios */}
      <section id="perifericos" className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Periféricos</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Completa tu setup con lo esencial.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {peripherals.map((item) => (
            <div
              key={item.name}
              className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10"
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-300/10 text-2xl"
                role="img"
                aria-label={item.name}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS SECTION - Marcas aliadas */}
      <section id="marcas" className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Marcas</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Aliados de confianza.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-3xl border border-cyan-400/10 bg-white/5 px-5 py-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 transition duration-300 hover:border-cyan-300/20 hover:text-white"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>
       <Footer />
    </main>
  );
}
