'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { MaintenanceCard } from '@/lib/maintenance-cards-db';

const CATEGORY_LABEL: Record<MaintenanceCard['category'], string> = {
  torres: 'Torres',
  portatiles: 'Portátiles',
  otros: 'Otros equipos',
};

const CATEGORIES: MaintenanceCard['category'][] = ['torres', 'portatiles', 'otros'];

const COLOR_PRESETS = [
  { label: 'Cian', value: 'rgba(34,211,238,0.18)' },
  { label: 'Azul', value: 'rgba(59,130,246,0.18)' },
  { label: 'Gris', value: 'rgba(100,116,139,0.25)' },
  { label: 'Morado', value: 'rgba(168,85,247,0.18)' },
  { label: 'Verde azulado', value: 'rgba(20,184,166,0.18)' },
];

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

export default function AdminMaintenanceCardsSection({ cards }: { cards: MaintenanceCard[] }) {
  return (
    <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
      <h2 className="mb-1 text-lg font-bold text-white">Carruseles de mantenimientos</h2>
      <p className="mb-5 text-sm text-slate-400">
        Las tarjetas que se muestran en /mantenimientos, agrupadas por Torres, Portátiles y Otros equipos.
      </p>

      <div className="flex flex-col gap-8">
        {CATEGORIES.map((cat) => (
          <div key={cat}>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-cyan-300">{CATEGORY_LABEL[cat]}</h3>
            <div className="flex flex-col gap-4">
              {cards
                .filter((c) => c.category === cat)
                .map((c) => (
                  <CardForm key={c.id} card={c} defaultCategory={cat} />
                ))}
              <CardForm defaultCategory={cat} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CardForm({ card, defaultCategory }: { card?: MaintenanceCard; defaultCategory: MaintenanceCard['category'] }) {
  const router = useRouter();
  const isNew = !card;

  const [category, setCategory] = useState<MaintenanceCard['category']>(card?.category ?? defaultCategory);
  const [gama, setGama] = useState(card?.gama ?? '');
  const [title, setTitle] = useState(card?.title ?? '');
  const [description, setDescription] = useState(card?.description ?? '');
  const [icon, setIcon] = useState(card?.icon ?? '');
  const [accentColor, setAccentColor] = useState(card?.accentColor ?? COLOR_PRESETS[0].value);
  const [services, setServices] = useState((card?.services ?? []).join('\n'));

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function buildPayload() {
    return {
      category,
      gama,
      title,
      description,
      icon,
      accentColor,
      services: services
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/settings/carruseles' : `/api/admin/settings/carruseles/${card!.id}`;
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al guardar');
        return;
      }
      if (isNew) {
        setGama('');
        setTitle('');
        setDescription('');
        setIcon('');
        setServices('');
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

  async function handleDelete() {
    if (!card) return;
    if (!confirm(`¿Eliminar la tarjeta "${card.gama} — ${card.title}"?`)) return;
    setError('');
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/settings/carruseles/${card.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al eliminar');
        return;
      }
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className={`flex flex-col gap-3 rounded-2xl border p-4 ${
        isNew ? 'border-dashed border-cyan-400/20 bg-white/[0.02]' : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      {isNew && <p className="text-xs font-semibold text-cyan-300">+ Nueva tarjeta</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">Gama / etiqueta</label>
          <input value={gama} onChange={(e) => setGama(e.target.value)} placeholder="Gama Alta" className={inputClass} required />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Torres" className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className={inputClass}
          required
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">Ícono</label>
          <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="🖥️" className={inputClass} required />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">Color de acento</label>
          <div className="flex flex-wrap gap-1.5">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setAccentColor(c.value)}
                title={c.label}
                className={`h-7 w-7 rounded-full border-2 transition-transform ${
                  accentColor === c.value ? 'border-cyan-300 scale-110' : 'border-transparent'
                }`}
                style={{ background: c.value.replace(/[\d.]+\)$/, '1)') }}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">
          Servicios (uno por línea, opcional — vacío muestra “Próximamente”)
        </label>
        <textarea
          value={services}
          onChange={(e) => setServices(e.target.value)}
          rows={4}
          placeholder={'Mantenimiento preventivo\nDiagnóstico'}
          className={inputClass}
        />
      </div>

      {isNew && (
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wide text-slate-500">Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as MaintenanceCard['category'])} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABEL[c]}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-lg bg-gradient-to-r from-cyan-300 to-blue-500 py-2 text-xs font-bold text-slate-950 transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : isNew ? 'Agregar tarjeta' : 'Guardar cambios'}
        </button>
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
          >
            {deleting ? '...' : 'Eliminar'}
          </button>
        )}
      </div>
    </form>
  );
}
