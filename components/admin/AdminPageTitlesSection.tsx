'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HERO_BLOCK_META } from '@/lib/hero-blocks-meta';
import type { PageTitles, HeroBlockKey, HeroBlock } from '@/lib/hero-blocks-meta';

const FIELD_LABEL: Record<keyof HeroBlock, string> = {
  eyebrow: 'Etiqueta (arriba del título)',
  title: 'Título',
  titleAccent: 'Título — parte resaltada en cian',
  subtitle: 'Subtítulo',
  note: 'Nota destacada',
};

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

const BLOCK_KEYS = Object.keys(HERO_BLOCK_META) as HeroBlockKey[];

export default function AdminPageTitlesSection({ titles }: { titles: PageTitles }) {
  const router = useRouter();
  const [values, setValues] = useState<PageTitles>(titles);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function updateField(block: HeroBlockKey, field: keyof HeroBlock, value: string) {
    setValues((prev) => ({ ...prev, [block]: { ...prev[block], [field]: value } }));
  }

  async function handleSave() {
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/titulos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al guardar');
        return;
      }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
      <h2 className="mb-1 text-lg font-bold text-white">Títulos del sitio</h2>
      <p className="mb-5 text-sm text-slate-400">
        Los encabezados y subtítulos de cada página. Guarda todos los cambios juntos con el botón de abajo.
      </p>

      <div className="flex flex-col gap-5">
        {BLOCK_KEYS.map((key) => {
          const meta = HERO_BLOCK_META[key];
          const block = values[key];
          return (
            <div key={key} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                {meta.page} — {meta.label}
              </p>
              <div className="flex flex-col gap-3">
                {meta.fields.map((field) => (
                  <div key={field}>
                    <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">
                      {FIELD_LABEL[field]}
                    </label>
                    {field === 'subtitle' || field === 'note' ? (
                      <textarea
                        value={block[field]}
                        onChange={(e) => updateField(key, field, e.target.value)}
                        rows={2}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        value={block[field]}
                        onChange={(e) => updateField(key, field, e.target.value)}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar todos los títulos'}
      </button>
    </section>
  );
}
