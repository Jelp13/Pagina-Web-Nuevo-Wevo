'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminVideoSummary } from '@/lib/admin-videos';

const inputClass =
  'w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

const ALLOWED_TYPES = 'video/mp4,video/webm,video/quicktime';

interface Props {
  homeVideos: AdminVideoSummary[];
  empresasVideo: AdminVideoSummary | null;
}

export default function AdminVideosClient({ homeVideos, empresasVideo }: Props) {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-1 text-xl font-bold text-white">Videos de inicio (TikTok)</h2>
        <p className="mb-6 text-sm text-slate-400">
          Estos son los videos que se muestran en la sección de TikTok de la página de inicio.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeVideos.map((v) => (
            <HomeVideoCard key={v.id} video={v} />
          ))}
          <AddHomeVideoCard />
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-xl font-bold text-white">Video — Mantenimientos a empresas</h2>
        <p className="mb-6 text-sm text-slate-400">
          Se muestra en la página de Mantenimientos, en la sección dirigida a empresas.
        </p>

        <div className="max-w-md">
          {empresasVideo ? (
            <EmpresasVideoCard video={empresasVideo} />
          ) : (
            <EmpresasVideoUpload />
          )}
        </div>
      </section>
    </div>
  );
}

function HomeVideoCard({ video }: { video: AdminVideoSummary }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tiktokUser, setTiktokUser] = useState(video.tiktokUser ?? '');
  const [tiktokUrl, setTiktokUrl] = useState(video.tiktokUrl ?? '');
  const [profileUrl, setProfileUrl] = useState(video.profileUrl ?? '');

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleSaveMeta(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiktokUser, tiktokUrl, profileUrl }),
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

  async function handleReplaceFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/api/admin/videos/${video.id}/archivo`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir el video');
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
    if (!confirm('¿Eliminar este video de la página de inicio?')) return;
    setError('');
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, { method: 'DELETE' });
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
    <div className="flex flex-col gap-3 rounded-[24px] border border-cyan-400/10 bg-white/5 p-5">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black">
        <video src={video.url} controls playsInline className="h-full w-full object-cover" />
      </div>

      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-cyan-400/50">
        {uploading ? 'Subiendo...' : 'Reemplazar video'}
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES}
          className="hidden"
          disabled={uploading}
          onChange={handleReplaceFile}
        />
      </label>

      <form onSubmit={handleSaveMeta} className="flex flex-col gap-2">
        <input
          type="text"
          value={tiktokUser}
          onChange={(e) => setTiktokUser(e.target.value)}
          placeholder="@usuario"
          className={inputClass}
        />
        <input
          type="url"
          value={tiktokUrl}
          onChange={(e) => setTiktokUrl(e.target.value)}
          placeholder="Enlace al video en TikTok"
          className={inputClass}
        />
        <input
          type="url"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          placeholder="Enlace al perfil de TikTok"
          className={inputClass}
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="mt-1 flex items-center gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-2 text-xs font-bold text-slate-950 transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar datos'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
          >
            {deleting ? '...' : 'Eliminar'}
          </button>
        </div>
      </form>
    </div>
  );
}

function AddHomeVideoCard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tiktokUser, setTiktokUser] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('Selecciona un archivo de video');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('placement', 'home');
      formData.append('file', file);
      formData.append('tiktokUser', tiktokUser);
      formData.append('tiktokUrl', tiktokUrl);
      formData.append('profileUrl', profileUrl);
      const res = await fetch('/api/admin/videos', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir el video');
        return;
      }
      setTiktokUser('');
      setTiktokUrl('');
      setProfileUrl('');
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
      className="flex flex-col gap-3 rounded-[24px] border border-dashed border-cyan-400/20 bg-white/[0.02] p-5"
    >
      <div className="flex aspect-[9/16] w-full items-center justify-center rounded-xl border border-cyan-400/10 bg-slate-900/40 text-center">
        <p className="px-4 text-sm text-slate-500">{file ? file.name : '+ Nuevo video'}</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-xs text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-300/15 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cyan-300"
      />
      <input
        type="text"
        value={tiktokUser}
        onChange={(e) => setTiktokUser(e.target.value)}
        placeholder="@usuario"
        className={inputClass}
      />
      <input
        type="url"
        value={tiktokUrl}
        onChange={(e) => setTiktokUrl(e.target.value)}
        placeholder="Enlace al video en TikTok"
        className={inputClass}
      />
      <input
        type="url"
        value={profileUrl}
        onChange={(e) => setProfileUrl(e.target.value)}
        placeholder="Enlace al perfil de TikTok"
        className={inputClass}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-2 text-xs font-bold text-slate-950 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {uploading ? 'Subiendo...' : 'Agregar video'}
      </button>
    </form>
  );
}

function EmpresasVideoCard({ video }: { video: AdminVideoSummary }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleReplaceFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/api/admin/videos/${video.id}/archivo`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir el video');
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
    if (!confirm('¿Eliminar este video? Volverá a mostrarse el aviso "Video próximamente".')) return;
    setError('');
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, { method: 'DELETE' });
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
    <div className="flex flex-col gap-3 rounded-[24px] border border-cyan-400/10 bg-white/5 p-5">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video src={video.url} controls playsInline className="h-full w-full object-cover" />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex items-center gap-2">
        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-cyan-400/50">
          {uploading ? 'Subiendo...' : 'Reemplazar video'}
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_TYPES}
            className="hidden"
            disabled={uploading}
            onChange={handleReplaceFile}
          />
        </label>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
        >
          {deleting ? '...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

function EmpresasVideoUpload() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('Selecciona un archivo de video');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('placement', 'mantenimientos_empresas');
      formData.append('file', file);
      const res = await fetch('/api/admin/videos', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir el video');
        return;
      }
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
      className="flex flex-col gap-3 rounded-[24px] border border-dashed border-cyan-400/20 bg-white/[0.02] p-5"
    >
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-cyan-400/10 bg-slate-900/40 text-center">
        <p className="px-4 text-sm text-slate-500">{file ? file.name : 'Actualmente sin video — muestra "Video próximamente"'}</p>
      </div>

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
        className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-2 text-xs font-bold text-slate-950 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {uploading ? 'Subiendo...' : 'Subir video'}
      </button>
    </form>
  );
}
