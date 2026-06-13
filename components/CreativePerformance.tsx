import type { CreativePerf } from '@/lib/constants';

const levelConfig = {
  'Excelente':  { color: 'text-cyan-300',  bg: 'bg-cyan-300/10',  bar: 'w-full' },
  'Muy bueno':  { color: 'text-green-400', bg: 'bg-green-400/10', bar: 'w-3/4'  },
  'Bueno':      { color: 'text-yellow-400',bg: 'bg-yellow-400/10',bar: 'w-1/2'  },
  'Básico':     { color: 'text-slate-400', bg: 'bg-slate-400/10', bar: 'w-1/4'  },
};

export default function CreativePerformance({ data }: { data: CreativePerf[] }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-white">🎨 Rendimiento en diseño y edición</h2>
      <p className="mb-6 text-sm text-slate-500">Nivel de rendimiento estimado para software creativo.</p>
      <div className="flex flex-col gap-3">
        {data.map((row) => {
          const cfg = levelConfig[row.performance];
          return (
            <div key={row.software} className="rounded-2xl border border-cyan-400/10 bg-white/[0.03] px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-medium text-white">{row.software}</span>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${cfg.color} ${cfg.bg}`}>
                  {row.performance}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 ${cfg.bar}`} />
              </div>
              <p className="mt-2 text-xs text-slate-500">{row.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
