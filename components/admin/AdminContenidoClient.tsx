'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TorreOption {
  id: string;
  name: string;
  category: string;
}

interface Props {
  torres: TorreOption[];
  featuredIds: string[];
  heroImageUrl: string | null;
}

export default function AdminContenidoClient({ torres, featuredIds, heroImageUrl }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <TorresDestacadas torres={torres} featuredIds={featuredIds} />
      <HeroImagen heroImageUrl={heroImageUrl} />
    </div>
  );
}

function TorresDestacadas({ torres, featuredIds }: { torres: TorreOption[]; featuredIds: string[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(featuredIds);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleSave() {
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/torres-destacadas', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selected }),
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
      <h2 className="mb-1 text-lg font-bold text-white">Torres destacadas</h2>
      <p className="mb-5 text-sm text-slate-400">
        Aparecen en el inicio, en el quiz recomendador y en “también te puede interesar” dentro de cada torre.
      </p>

      <div className="flex flex-col gap-2">
        {torres.map((t) => (
          <label
            key={t.id}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm transition-colors hover:border-cyan-400/30"
          >
            <input
              type="checkbox"
              checked={selected.includes(t.id)}
              onChange={() => toggle(t.id)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900"
            />
            <span className="font-medium text-white">{t.name}</span>
            <span className="text-xs text-slate-500">{t.category}</span>
          </label>
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || selected.length === 0}
        className="mt-5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar torres destacadas'}
      </button>
    </section>
  );
}

function HeroImagen({ heroImageUrl }: { heroImageUrl: string | null }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/settings/hero-imagen', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir la imagen');
        return;
      }
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleReset() {
    if (!confirm('¿Volver a la imagen original de fondo del inicio?')) return;
    setError('');
    setResetting(true);
    try {
      const res = await fetch('/api/admin/settings/hero-imagen', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al restaurar la imagen');
        return;
      }
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setResetting(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
      <h2 className="mb-1 text-lg font-bold text-white">Imagen de fondo del inicio</h2>
      <p className="mb-5 text-sm text-slate-400">La imagen grande detrás del título de la página de inicio.</p>

      <div className="relative mb-5 aspect-video w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
        <Image src={heroImageUrl ?? '/Imagenes/hero-bg2.jpg'} alt="Fondo del inicio" fill className="object-cover" sizes="480px" />
      </div>

      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-full border border-cyan-400/30 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400/50">
          {uploading ? 'Subiendo...' : 'Reemplazar imagen'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
        </label>
        {heroImageUrl && (
          <button
            type="button"
            onClick={handleReset}
            disabled={resetting}
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-red-400/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resetting ? 'Restaurando...' : 'Usar imagen original'}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-500">JPG, PNG o WEBP — máximo 8MB.</p>
    </section>
  );
}
