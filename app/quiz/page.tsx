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

import Navbar from '@/components/Navbar';
import Quiz from '@/components/Quiz';
import { PRODUCTS, PERIPHERALS, BRANDS, QUIZ_QUESTIONS } from '@/lib/constants';
import { SITE_NAME, ROUTES } from '@/lib/config';

const quizQuestions = QUIZ_QUESTIONS;
const products = PRODUCTS;
const peripherals = PERIPHERALS;
const brands = BRANDS;

const getQuizResult = (answers: (number | number[] | null)[]) => {
  const [, presupuesto, experiencia, valor, monitor, juegos, resolucion] = answers;

  // Convertir a números seguros
  const presupuestoNum = typeof presupuesto === 'number' ? presupuesto : 0;
  const experienciaNum = typeof experiencia === 'number' ? experiencia : 0;
  const valorNum = typeof valor === 'number' ? valor : 0;

  // Lógica de resolucion: si selecciona 4K, necesita máxima potencia
  const resolucionArray = Array.isArray(resolucion) ? resolucion : [];
  const quiereUltra4K = resolucionArray.includes(2);

  if (valorNum === 1) {
    return {
      name: 'Torre Clara de Wevo',
      desc: 'Diseño blanco elegante con potencia confiable.',
      url: 'https://nuevowevo.com/producto/torre-clara-de-wevo-amd-ryzen-7-5700x-rtx-5060-blanca/',
    };
  }

  if (quiereUltra4K) {
    return {
      name: 'Torre Wevo Pochado',
      desc: 'Máxima potencia para gaming 4K sin compromisos.',
      url: 'https://nuevowevo.com/producto/torre-wevo-pochado-amd-ryzen-5-7600x-rtx-5060ti/',
    };
  }

  if (experienciaNum === 0) {
    return {
      name: 'Torre Wevo Tibio',
      desc: 'Ideal para principiantes: estudio, oficina y uso casual.',
      url: 'https://nuevowevo.com/producto/torre-wevo-tibio-amd-ryzen-5-8600g/',
    };
  }

  if (experienciaNum === 1) {
    return presupuestoNum <= 1
      ? {
          name: 'Torre Wevo Frito',
          desc: 'Accesible pero potente para gaming intermedio.',
          url: 'https://nuevowevo.com/producto/torre-wevo-frito-amd-ryzen-7-5700x-radeon-9060xt/',
        }
      : {
          name: 'Torre Wevo Revuelto',
          desc: 'Equilibrio perfecto para usuarios intermedios.',
          url: 'https://nuevowevo.com/producto/torre-wevo-revuelto-amd-ryzen-7-5700x-rtx-5060ti/',
        };
  }

  return presupuestoNum < 3
    ? {
        name: 'Torre Wevo Revuelto',
        desc: 'Rendimiento sólido para jugadores avanzados.',
        url: 'https://nuevowevo.com/producto/torre-wevo-revuelto-amd-ryzen-7-5700x-rtx-5060ti/',
      }
    : {
        name: 'Torre Wevo Pochado',
        desc: 'Máxima potencia para gaming AAA y creación avanzada.',
        url: 'https://nuevowevo.com/producto/torre-wevo-pochado-amd-ryzen-5-7600x-rtx-5060ti/',
      };
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#05080f] text-white">
      {/* Barra de navegación reutilizable */}
      <Navbar />

      {/* HERO SECTION - Presentación y CTA */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(93,213,255,0.16),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(93,213,255,0.1),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_24%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
            Recomendador inteligente
          </span>
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
              Iniciar quiz
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
              <div className="mb-6 flex h-40 items-center justify-center rounded-3xl bg-slate-950/90 text-4xl">
                🖥️
              </div>

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
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
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
    </main>
  );
}
