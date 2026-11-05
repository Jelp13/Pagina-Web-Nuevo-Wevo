import MantenimientosCarousel, { type Card } from './MantenimientosCarousel';

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

interface Props {
  torresCards: Card[];
  portatilesCards: Card[];
  otrosCards: Card[];
}

export default function MantenimientosGrid({ torresCards, portatilesCards, otrosCards }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {/* Columna 1 — Torres */}
      <div>
        <ColumnHeader icon="🖥️" label="Torres" />
        {torresCards.length > 0 ? (
          <MantenimientosCarousel cards={torresCards} />
        ) : (
          <p className="text-sm italic text-slate-600">Sin tarjetas todavía.</p>
        )}
      </div>

      {/* Columna 2 — Portátiles */}
      <div>
        <ColumnHeader icon="💻" label="Portátiles" />
        {portatilesCards.length > 0 ? (
          <MantenimientosCarousel cards={portatilesCards} />
        ) : (
          <p className="text-sm italic text-slate-600">Sin tarjetas todavía.</p>
        )}
      </div>

      {/* Columna 3 — Otros Equipos */}
      <div className="md:col-span-2 lg:col-span-1">
        <div className="md:mx-auto md:max-w-[calc(50%-20px)] lg:max-w-full">
          <ColumnHeader icon="🎮" label="Otros Equipos" />
          {otrosCards.length > 0 ? (
            <MantenimientosCarousel cards={otrosCards} />
          ) : (
            <p className="text-sm italic text-slate-600">Sin tarjetas todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}
