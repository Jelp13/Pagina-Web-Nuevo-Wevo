export interface Card {
  id: number;
  gama: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  services: string[] | null;
}

// Todas las tarjetas se muestran siempre visibles, apiladas una debajo de
// otra: antes había que hacer clic en flechas/puntos para ver las demás
// opciones de cada categoría y casi nadie lo hacía.
export default function MantenimientosCarousel({ cards }: { cards: Card[] }) {
  return (
    <div className="flex flex-col gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 shadow-lg"
        >
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

          {/* Services section — chips compactos en vez de lista en dos
              columnas: dicen lo mismo ocupando menos espacio vertical. */}
          <div className="flex-1 border-t border-cyan-400/10 p-7">
            {card.services ? (
              <>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Servicios disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-cyan-400/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                    >
                      {s}
                    </span>
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
      ))}
    </div>
  );
}
