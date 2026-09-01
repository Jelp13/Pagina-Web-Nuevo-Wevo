'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { LegalSlug, LegalPageContent } from '@/lib/legal-pages-defaults';

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

export default function AdminLegalEditForm({ slug, content }: { slug: LegalSlug; content: LegalPageContent }) {
  const router = useRouter();
  const [title, setTitle] = useState(content.title);
  const [updatedLabel, setUpdatedLabel] = useState(content.updatedLabel);
  const [contentMarkdown, setContentMarkdown] = useState(content.contentMarkdown);
  const [showPreview, setShowPreview] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/settings/legal/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, updatedLabel, contentMarkdown }),
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
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">Título de la página</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">Fecha / etiqueta de actualización</label>
          <input
            value={updatedLabel}
            onChange={(e) => setUpdatedLabel(e.target.value)}
            placeholder="Ej: Junio de 2026"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-medium text-slate-300">
            Contenido (Markdown — ## título, ### subtítulo, - lista, **negrita**, [texto](url))
          </label>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="rounded-full border border-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-300/10"
          >
            {showPreview ? 'Ocultar vista previa' : 'Ver vista previa'}
          </button>
        </div>

        <div className={showPreview ? 'grid gap-4 lg:grid-cols-2' : ''}>
          <textarea
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            rows={26}
            className={`${inputClass} font-mono text-xs leading-relaxed`}
            required
          />
          {showPreview && (
            <div className="max-h-[640px] overflow-y-auto rounded-xl border border-slate-700 bg-slate-950/60 p-5">
              <div
                className="
                  space-y-4 text-sm text-slate-400 leading-relaxed
                  [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-2
                  [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-cyan-200 [&_h3]:mt-4 [&_h3]:mb-1.5
                  [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:space-y-1
                  [&_strong]:text-slate-200 [&_strong]:font-semibold
                  [&_a]:text-cyan-300 [&_a]:underline
                "
              >
                <ReactMarkdown>{contentMarkdown}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar cambios'}
      </button>
    </form>
  );
}
