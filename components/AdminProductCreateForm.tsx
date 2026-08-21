'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PERIPHERALS } from '@/lib/constants';

type Section = 'torres' | 'perifericos' | 'portatiles';

const SECTION_LABEL: Record<Section, string> = {
  torres: 'Torres',
  perifericos: 'Periféricos',
  portatiles: 'Portátiles',
};

const inputClass =
  'w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

export default function AdminProductCreateForm() {
  const router = useRouter();

  const [section, setSection] = useState<Section>('torres');
  const [categorySlug, setCategorySlug] = useState(PERIPHERALS[0]?.slug ?? '');
  const [name, setName] = useState('');
  const [badge, setBadge] = useState('');
  const [specs, setSpecs] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [numericPrice, setNumericPrice] = useState('');
  const [hasDiscount, setHasDiscount] = useState(false);
  const [originalPrice, setOriginalPrice] = useState('');
  const [inStock, setInStock] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const category =
      section === 'torres' ? 'Gaming' : section === 'portatiles' ? 'Portátiles' : PERIPHERALS.find((p) => p.slug === categorySlug)?.name ?? '';

    try {
      const res = await fetch('/api/admin/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          category,
          categorySlug: section === 'perifericos' ? categorySlug : null,
          badge: badge || null,
          name,
          specs,
          shortDescription: shortDescription || null,
          description,
          numericPrice: Number(numericPrice),
          originalPrice: hasDiscount && originalPrice ? Number(originalPrice) : null,
          inStock,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al crear el producto');
        return;
      }

      router.push(`/admin/productos/${data.id}`);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Sección</h2>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(SECTION_LABEL) as Section[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSection(s)}
              className={`rounded-2xl border py-3 text-sm font-semibold transition-colors ${
                section === s
                  ? 'border-cyan-400/50 bg-cyan-300/10 text-cyan-300'
                  : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
              }`}
            >
              {SECTION_LABEL[s]}
            </button>
          ))}
        </div>

        {section === 'perifericos' && (
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Categoría</label>
            <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} className={inputClass}>
              {PERIPHERALS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>

      <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Información del producto</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">Badge (opcional)</label>
              <input
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ej: TOP, Nuevo"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">Specs (línea corta)</label>
              <input value={specs} onChange={(e) => setSpecs(e.target.value)} className={inputClass} required />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Descripción corta (opcional)</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={3}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Descripción completa</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className={inputClass}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-300">Precio</label>
              <input
                type="number"
                min={1}
                value={numericPrice}
                onChange={(e) => setNumericPrice(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={hasDiscount}
                  onChange={(e) => setHasDiscount(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-900"
                />
                Este producto está en descuento
              </label>
              <input
                type="number"
                min={1}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                disabled={!hasDiscount}
                placeholder="Precio original (antes del descuento)"
                className={`${inputClass} disabled:opacity-40`}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900"
            />
            Producto disponible (desmarca si está agotado)
          </label>
        </div>
      </section>

      <p className="text-xs text-slate-500">
        Después de crear el producto podrás subirle imágenes desde su página de edición. Las tablas de
        especificaciones técnicas y rendimiento en juegos/software se agregan más adelante.
      </p>

      {error && <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto sm:self-end sm:px-10"
      >
        {saving ? 'Creando...' : 'Crear producto'}
      </button>
    </form>
  );
}
