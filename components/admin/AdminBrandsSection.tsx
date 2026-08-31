'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { AdminBrand } from '@/lib/brands-db';

const ALLOWED_TYPES = 'image/jpeg,image/png,image/webp';

export default function AdminBrandsSection({ brands }: { brands: AdminBrand[] }) {
  return (
    <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
      <h2 className="mb-1 text-lg font-bold text-white">Marcas</h2>
      <p className="mb-5 text-sm text-slate-400">Los logos que aparecen en el inicio y en el quiz.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <BrandCard key={b.id} brand={b} />
        ))}
        <AddBrandCard />
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: AdminBrand }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(brand.name);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleSaveName() {
    if (name.trim() === brand.name) return;
    setError('');
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/settings/marcas/${brand.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al guardar');
        return;
      }
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  }

  async function handleReplaceLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/api/admin/settings/marcas/${brand.id}/logo`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir el logo');
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

  async function handleDelete() {
    if (!confirm(`¿Eliminar la marca "${brand.name}"?`)) return;
    setError('');
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/settings/marcas/${brand.id}`, { method: 'DELETE' });
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
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="relative flex h-20 items-center justify-center overflow-hidden rounded-xl bg-white">
        <Image src={brand.logo} alt={brand.name} width={140} height={64} className="max-h-14 w-auto object-contain" />
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSaveName}
        disabled={saving}
        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer rounded-lg border border-cyan-400/30 bg-slate-900/80 px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:border-cyan-400/50">
          {uploading ? 'Subiendo...' : 'Reemplazar logo'}
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES}
            className="hidden"
            disabled={uploading}
            onChange={handleReplaceLogo}
          />
        </label>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
        >
          {deleting ? '...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

function AddBrandCard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Escribe el nombre de la marca');
      return;
    }
    if (!file) {
      setError('Selecciona el logo');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('file', file);
      const res = await fetch('/api/admin/settings/marcas', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al agregar la marca');
        return;
      }
      setName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-dashed border-cyan-400/20 bg-white/[0.02] p-4"
    >
      <div className="flex h-20 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 text-center">
        <p className="px-3 text-xs text-slate-500">{file ? file.name : '+ Nueva marca'}</p>
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la marca"
        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-xs text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-300/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cyan-300"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="rounded-lg bg-gradient-to-r from-cyan-300 to-blue-500 py-2 text-xs font-bold text-slate-950 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {uploading ? 'Agregando...' : 'Agregar marca'}
      </button>
    </form>
  );
}
