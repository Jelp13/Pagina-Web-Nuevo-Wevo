import type { GamingPerf } from '@/lib/constants';

function fpsColor(fps: string) {
  const n = parseInt(fps);
  if (n >= 240) return 'text-cyan-300';
  if (n >= 120) return 'text-green-400';
  if (n >= 60) return 'text-yellow-400';
  return 'text-slate-400';
}

export default function GamingPerformance({ data }: { data: GamingPerf[] }) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-white">🎮 Rendimiento en videojuegos</h2>
      <p className="mb-6 text-sm text-slate-500">FPS estimados en condiciones normales de juego.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyan-400/10">
              <th className="pb-3 text-left text-xs uppercase tracking-[0.18em] text-slate-500">Juego</th>
              <th className="pb-3 text-center text-xs uppercase tracking-[0.18em] text-slate-500">FPS prom.</th>
              <th className="pb-3 text-center text-xs uppercase tracking-[0.18em] text-slate-500">Resolución</th>
              <th className="pb-3 text-right text-xs uppercase tracking-[0.18em] text-slate-500">Calidad</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.game}
                className={`border-b border-cyan-400/[0.06] ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
              >
                <td className="py-3.5 font-medium text-white">{row.game}</td>
                <td className={`py-3.5 text-center font-bold ${fpsColor(row.fps)}`}>{row.fps}</td>
                <td className="py-3.5 text-center text-slate-400">{row.resolution}</td>
                <td className="py-3.5 text-right text-slate-400">{row.quality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
