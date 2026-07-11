'use client';

import { useEffect, useRef, useState } from 'react';
import MantenimientosCarousel, { TORRES_CARDS, PORTATILES_CARDS, OTROS_CARDS } from './MantenimientosCarousel';

function ColumnHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-300/10 text-xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white">{label}</h3>
    </div>
  );
}

export default function MantenimientosGrid() {
  const middleRef = useRef<HTMLDivElement>(null);
  const [syncedHeight, setSyncedHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const card = middleRef.current?.querySelector('[data-mcard]') as HTMLElement | null;
      if (card) setSyncedHeight(card.offsetHeight);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (middleRef.current) ro.observe(middleRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {/* Carrusel 1 — Torres */}
      <div>
        <ColumnHeader icon="🖥️" label="Torres" />
        <MantenimientosCarousel cards={TORRES_CARDS} height={syncedHeight} />
      </div>

      {/* Carrusel 2 — Portátiles (referencia de altura) */}
      <div ref={middleRef}>
        <ColumnHeader icon="💻" label="Portátiles" />
        <MantenimientosCarousel cards={PORTATILES_CARDS} />
      </div>

      {/* Carrusel 3 — Otros Equipos */}
      <div className="md:col-span-2 lg:col-span-1">
        <div className="md:mx-auto md:max-w-[calc(50%-20px)] lg:max-w-full">
          <ColumnHeader icon="🎮" label="Otros Equipos" />
          <MantenimientosCarousel cards={OTROS_CARDS} height={syncedHeight} />
        </div>
      </div>
    </div>
  );
}
