'use client';

import { useRef, useState, useCallback } from 'react';

export interface Card {
  id: string;
  gama: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  services: string[] | null;
}

export const TORRES_CARDS: Card[] = [
  {
    id: 'torres-alta',
    gama: 'Gama Alta',
    title: 'Torres',
    description:
      'Mantenimiento especializado para estaciones de trabajo, gaming profesional y edición 4K. Maximizamos el rendimiento y prolongamos la vida útil de equipos de alto exigencia.',
    icon: '🖥️',
    accentColor: 'rgba(34,211,238,0.18)',
    services: [
      'Mantenimiento preventivo',
      'Cambio de partes',
      'Ensamble de equipos',
      'Diagnóstico',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
  {
    id: 'torres-media',
    gama: 'Gama Media',
    title: 'Torres',
    description:
      'Servicio preventivo para computadores de oficina, empresas y uso doméstico avanzado. Mantenemos tu equipo en condiciones óptimas para una productividad continua.',
    icon: '🖥️',
    accentColor: 'rgba(59,130,246,0.18)',
    services: [
      'Mantenimiento preventivo',
      'Cambio de partes',
      'Ensamble de equipos',
      'Diagnóstico',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
  {
    id: 'torres-baja',
    gama: 'Gama Baja',
    title: 'Torres',
    description:
      'Mantenimiento preventivo accesible para computadores de estudio y hogar. Garantizamos el buen funcionamiento de tu equipo sin importar su gama.',
    icon: '🖥️',
    accentColor: 'rgba(100,116,139,0.25)',
    services: [
      'Mantenimiento preventivo',
      'Cambio de partes',
      'Ensamble de equipos',
      'Diagnóstico',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
];

export const PORTATILES_CARDS: Card[] = [
  {
    id: 'portatiles-alta',
    gama: 'Gama Alta',
    title: 'Portátiles',
    description:
      'Mantenimiento especializado para laptops de alto rendimiento: gaming, diseño gráfico, arquitectura y edición. Cuidamos tu herramienta de trabajo con la precisión que merece.',
    icon: '💻',
    accentColor: 'rgba(34,211,238,0.18)',
    services: [
      'Mantenimiento preventivo',
      'Reparación de bisagras',
      'Diagnóstico',
      'Cambio de teclado',
      'Cambio de pantalla',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
  {
    id: 'portatiles-media',
    gama: 'Gama Media',
    title: 'Portátiles',
    description:
      'Mantenimiento preventivo para portátiles orientados al estudio, la oficina y el trabajo profesional. Optimizamos el rendimiento y la duración de batería.',
    icon: '💻',
    accentColor: 'rgba(59,130,246,0.18)',
    services: [
      'Mantenimiento preventivo',
      'Reparación de bisagras',
      'Diagnóstico',
      'Cambio de teclado',
      'Cambio de pantalla',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
  {
    id: 'portatiles-baja',
    gama: 'Gama Baja',
    title: 'Portátiles',
    description:
      'Mantenimiento preventivo para portátiles de tareas básicas y uso doméstico. Un servicio accesible que garantiza el correcto funcionamiento de tu equipo en el día a día.',
    icon: '💻',
    accentColor: 'rgba(100,116,139,0.25)',
    services: [
      'Mantenimiento preventivo',
      'Reparación de bisagras',
      'Diagnóstico',
      'Cambio de teclado',
      'Cambio de pantalla',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
];

export const OTROS_CARDS: Card[] = [
  {
    id: 'consolas',
    gama: 'Consolas',
    title: 'Consolas',
    description:
      'Mantenimiento preventivo para consolas de videojuegos de todas las generaciones. Limpieza interna, cambio de pasta térmica y revisión completa para un rendimiento óptimo.',
    icon: '🎮',
    accentColor: 'rgba(168,85,247,0.18)',
    services: [
      'Mantenimiento preventivo',
      'Diagnóstico',
      'Mantenimiento controles',
      'Aumento de almacenamiento (Dependiendo la consola)',
    ],
  },
  {
    id: 'all-in-one',
    gama: 'All in One',
    title: 'All in One',
    description:
      'Mantenimiento preventivo para equipos All in One. Cuidamos cada componente integrado para garantizar el mejor rendimiento y la máxima durabilidad de tu equipo.',
    icon: '🖥️',
    accentColor: 'rgba(20,184,166,0.18)',
    services: [
      'Mantenimiento preventivo',
      'Diagnóstico',
      'Aumento de memoria RAM',
      'Aumento de almacenamiento',
    ],
  },
];

export default function MantenimientosCarousel({ cards, height }: { cards: Card[]; height?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const getCardEls = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll('[data-mcard]') ?? []) as HTMLElement[],
    [],
  );

  const scrollToIdx = useCallback(
    (idx: number) => {
      const track = trackRef.current;
      const cardEls = getCardEls();
      if (!track || !cardEls[idx]) return;
      track.scrollTo({ left: cardEls[idx].offsetLeft, behavior: 'smooth' });
      setActiveIdx(idx);
    },
    [getCardEls],
  );

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardEls = getCardEls();
    const scrollLeft = track.scrollLeft;
    let closestIdx = 0;
    let minDist = Infinity;
    cardEls.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < minDist) { minDist = dist; closestIdx = i; }
    });
    setActiveIdx(closestIdx);
  }, [getCardEls]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    trackRef.current.scrollLeft = dragScrollLeft.current - (e.clientX - dragStartX.current);
  };
  const onMouseUp = () => { isDragging.current = false; };

  return (
    <div className="relative">
      {/* Prev arrow */}
      <button
        onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
        disabled={activeIdx === 0}
        aria-label="Anterior"
        className="absolute left-0 top-[calc(50%-2rem)] z-10 -translate-x-3 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900/90 text-slate-200 shadow-lg backdrop-blur-sm transition hover:border-cyan-300/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={() => scrollToIdx(Math.min(cards.length - 1, activeIdx + 1))}
        disabled={activeIdx === cards.length - 1}
        aria-label="Siguiente"
        className="absolute right-0 top-[calc(50%-2rem)] z-10 translate-x-3 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900/90 text-slate-200 shadow-lg backdrop-blur-sm transition hover:border-cyan-300/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onScroll={handleScroll}
        className="flex overflow-x-scroll pb-2 select-none"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            data-mcard
            className="shrink-0 w-full"
            style={{ scrollSnapAlign: 'start', ...(height !== undefined ? { height: `${height}px` } : {}) }}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 shadow-lg">

              {/* Card header */}
              <div
                className="flex items-start justify-between gap-4 p-7"
                style={{
                  background: `linear-gradient(135deg, ${card.accentColor} 0%, transparent 60%), linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(5,8,15,0.95) 100%)`,
                }}
              >
                <div className="flex-1 min-w-0">
                  <span className={`font-bold text-cyan-300 ${card.gama === card.title ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
                    {card.gama === card.title ? 'Mantenimiento' : card.gama}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-xs">{card.description}</p>
                </div>

                <div
                  className="shrink-0 flex h-[88px] w-[88px] items-center justify-center rounded-2xl text-5xl border border-white/5"
                  style={{ background: card.accentColor }}
                >
                  {card.icon}
                </div>
              </div>

              {/* Services section */}
              <div className="flex-1 border-t border-cyan-400/10 p-7">
                {card.services ? (
                  <>
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Servicios disponibles
                    </p>
                    <div className="grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 sm:gap-x-6">
                      {card.services.map((s) => (
                        <div key={s} className="flex items-center gap-2.5 text-sm text-slate-400">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center py-4">
                    <p className="text-center text-sm italic text-slate-600">
                      Próximamente encontrarás todos los servicios disponibles para esta categoría.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => scrollToIdx(i)}
            aria-label={`Ir a ${card.title} ${card.gama}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIdx
                ? 'h-1.5 w-6 bg-cyan-300'
                : 'h-1.5 w-1.5 bg-slate-700 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
