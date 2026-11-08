import MantenimientosCarousel, { type Card } from './MantenimientosCarousel';

function CategoriaHeader({ icon, label }: { icon: string; label: string }) {
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

// Categorías apiladas una debajo de otra (no en columnas lado a lado):
// el gerente pidió que esta sección fuera vertical para que cada
// categoría se lea de corrido sin comprimirse en un tercio del ancho.
export default function MantenimientosGrid({ torresCards, portatilesCards, otrosCards }: Props) {
  const categorias = [
    { icon: '🖥️', label: 'Torres', cards: torresCards },
    { icon: '💻', label: 'Portátiles', cards: portatilesCards },
    { icon: '🎮', label: 'Otros Equipos', cards: otrosCards },
  ];

  return (
    <div className="flex flex-col gap-14">
      {categorias.map((cat) => (
        <div key={cat.label}>
          <CategoriaHeader icon={cat.icon} label={cat.label} />
          {cat.cards.length > 0 ? (
            <MantenimientosCarousel cards={cat.cards} />
          ) : (
            <p className="text-sm italic text-slate-600">Sin tarjetas todavía.</p>
          )}
        </div>
      ))}
    </div>
  );
}
