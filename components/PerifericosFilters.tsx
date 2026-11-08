import Link from 'next/link';
import { PERIPHERALS } from '@/lib/constants';

// Pastillas de filtro por categoría, compartidas entre /perifericos y
// las páginas dedicadas /perifericos/categoria/[slug].
export default function PerifericosFilters({ activeSlug }: { activeSlug: string | null }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/perifericos"
        className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
          !activeSlug
            ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-300'
            : 'border-slate-700 bg-white/5 text-slate-400 hover:border-cyan-300/30 hover:text-slate-200'
        }`}
      >
        Todos
      </Link>
      {PERIPHERALS.map((cat) => (
        <Link
          key={cat.slug}
          href={`/perifericos/categoria/${cat.slug}`}
          className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
            activeSlug === cat.slug
              ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-300'
              : 'border-slate-700 bg-white/5 text-slate-400 hover:border-cyan-300/30 hover:text-slate-200'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
