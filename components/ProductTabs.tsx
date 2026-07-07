'use client';

import { useState } from 'react';
import ProductSpecs from '@/components/ProductSpecs';
import GamingPerformance from '@/components/GamingPerformance';
import CreativePerformance from '@/components/CreativePerformance';
import type { ProductSpec, GamingPerf, CreativePerf } from '@/lib/constants';

interface Props {
  specs: ProductSpec[];
  gamingPerformance: GamingPerf[];
  creativePerformance: CreativePerf[];
  description?: string;
}

type Tab = 'descripcion' | 'specs' | 'gaming' | 'creative';

const TABS: { id: Tab; label: string }[] = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'specs',       label: 'Especificaciones' },
  { id: 'gaming',      label: 'Gaming' },
  { id: 'creative',    label: 'Diseño y Edición' },
];

export default function ProductTabs({ specs, gamingPerformance, creativePerformance, description }: Props) {
  const [active, setActive] = useState<Tab>('descripcion');

  return (
    <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 overflow-hidden">
      {/* Barra de pestañas */}
      <div className="flex border-b border-cyan-400/10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-200 ${
              active === tab.id
                ? 'bg-cyan-300/10 text-cyan-300 border-b-2 border-cyan-300'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido activo */}
      <div className="p-7">
        {active === 'descripcion' && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">📋 Descripción del producto</h2>
            {description ? (
              <div className="space-y-4">
                {description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-slate-400 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">Descripción no disponible aún.</p>
            )}
          </div>
        )}
        {active === 'specs' && <ProductSpecs specs={specs} />}
        {active === 'gaming' && <GamingPerformance data={gamingPerformance} />}
        {active === 'creative' && <CreativePerformance data={creativePerformance} />}
      </div>
    </div>
  );
}
