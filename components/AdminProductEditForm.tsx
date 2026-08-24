'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { AdminProductDetail } from '@/lib/admin-products';
import ListFieldEditor from '@/components/admin/ListFieldEditor';

interface Props {
  producto: AdminProductDetail;
  esAdmin: boolean;
}

const inputClass =
  'w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

const PERFORMANCE_OPTIONS = [
  'Excepcional',
  'Excelente',
  'Fluido',
  'Muy bueno',
  'Bueno',
  'Aceptable',
  'Básico',
  'Limitado',
  'No recomendado',
];

export default function AdminProductEditForm({ producto, esAdmin }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState(producto.images);
  const [name, setName] = useState(producto.name);
  const [badge, setBadge] = useState(producto.badge ?? '');
  const [specs, setSpecs] = useState(producto.specs);
  const [shortDescription, setShortDescription] = useState(producto.shortDescription ?? '');
  const [description, setDescription] = useState(producto.description);
  const [numericPrice, setNumericPrice] = useState(String(producto.numericPrice));
  const [hasDiscount, setHasDiscount] = useState(producto.originalPrice != null);
  const [originalPrice, setOriginalPrice] = useState(
    producto.originalPrice != null ? String(producto.originalPrice) : '',
  );
  const [inStock, setInStock] = useState(producto.inStock);
  const [fullSpecs, setFullSpecs] = useState(producto.fullSpecs);
  const [gamingPerformance, setGamingPerformance] = useState(producto.gamingPerformance);
  const [creativePerformance, setCreativePerformance] = useState(producto.creativePerformance);
  const [features, setFeatures] = useState(producto.features);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/productos/${producto.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          badge: badge || null,
          specs,
          shortDescription: shortDescription || null,
          description,
          numericPrice: Number(numericPrice),
          originalPrice: hasDiscount && originalPrice ? Number(originalPrice) : null,
          inStock,
          fullSpecs,
          gamingPerformance,
          creativePerformance,
          features,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al guardar');
        return;
      }

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`/api/admin/productos/${producto.id}/imagenes`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al subir la imagen');
        return;
      }
      setImages((prev) => [...prev, data.url]);
      router.refresh();
    } catch {
      setError('Error de conexión al subir la imagen.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleRemoveImage(url: string) {
    if (images.length <= 1) {
      setError('El producto debe tener al menos una imagen.');
      return;
    }
    if (!confirm('¿Quitar esta imagen del producto?')) return;

    setError('');
    try {
      const res = await fetch(`/api/admin/productos/${producto.id}/imagenes`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al quitar la imagen');
        return;
      }
      setImages((prev) => prev.filter((u) => u !== url));
      router.refresh();
    } catch {
      setError('Error de conexión al quitar la imagen.');
    }
  }

  async function handleDelete() {
    if (deleteConfirmText !== producto.name) return;
    setDeleteError('');
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/productos/${producto.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setDeleteError(data.error ?? 'Error al eliminar el producto');
        return;
      }
      router.push('/admin/productos');
      router.refresh();
    } catch {
      setDeleteError('Error de conexión al eliminar.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      {/* Imágenes */}
      <section className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Imágenes</h2>
        <div className="flex flex-wrap gap-4">
          {images.map((url) => (
            <div key={url} className="group relative h-28 w-28 overflow-hidden rounded-2xl border border-slate-700">
              <Image src={url} alt={name} fill className="object-cover" sizes="112px" />
              <button
                type="button"
                onClick={() => handleRemoveImage(url)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/90 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Quitar imagen"
              >
                ✕
              </button>
            </div>
          ))}
          <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-slate-600 text-xs text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300">
            {uploading ? 'Subiendo...' : '+ Agregar'}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">JPG, PNG o WEBP — máximo 8MB por imagen.</p>
      </section>

      {/* Textos y precio */}
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

          <div>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                disabled={!esAdmin}
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 disabled:opacity-40"
              />
              Producto disponible (desmarca si está agotado)
            </label>
            {!esAdmin && (
              <p className="mt-1.5 text-xs text-slate-500">Solo un administrador puede cambiar la disponibilidad.</p>
            )}
          </div>
        </div>
      </section>

      {/* Características rápidas */}
      <ListFieldEditor
        title="Características rápidas"
        description="Los íconos y textos cortos que aparecen junto al precio (ej: 🎮 RTX 5060 8GB)."
        value={features as never}
        onChange={(rows) => setFeatures(rows as never)}
        fields={[
          { key: 'icon', label: 'Ícono (emoji)', placeholder: '🎮' },
          { key: 'label', label: 'Texto', placeholder: 'RTX 5060 8GB' },
        ]}
        emptyRow={{ icon: '', label: '' }}
        addLabel="+ Agregar característica"
      />

      {/* Especificaciones */}
      <ListFieldEditor
        title="Especificaciones"
        description="La tabla de ficha técnica completa (pestaña “Especificaciones”)."
        value={fullSpecs as never}
        onChange={(rows) => setFullSpecs(rows as never)}
        fields={[
          { key: 'label', label: 'Campo', placeholder: 'Procesador' },
          { key: 'value', label: 'Valor', placeholder: 'AMD Ryzen 5 7600X' },
        ]}
        emptyRow={{ label: '', value: '' }}
        addLabel="+ Agregar especificación"
      />

      {/* Rendimiento en gaming */}
      <ListFieldEditor
        title="Rendimiento en Gaming"
        description="Tabla de FPS por juego (pestaña “Gaming”)."
        value={gamingPerformance as never}
        onChange={(rows) => setGamingPerformance(rows as never)}
        fields={[
          { key: 'game', label: 'Juego', placeholder: 'Valorant' },
          { key: 'fps', label: 'FPS', placeholder: '240–330' },
          { key: 'resolution', label: 'Resolución', placeholder: '1440p' },
          { key: 'quality', label: 'Calidad', placeholder: 'Ultra' },
        ]}
        emptyRow={{ game: '', fps: '', resolution: '', quality: '' }}
        addLabel="+ Agregar juego"
      />

      {/* Rendimiento en diseño y edición */}
      <ListFieldEditor
        title="Rendimiento en Diseño y Edición"
        description="Tabla de software creativo (pestaña “Diseño y Edición”)."
        value={creativePerformance as never}
        onChange={(rows) => setCreativePerformance(rows as never)}
        fields={[
          { key: 'software', label: 'Software', placeholder: 'Photoshop' },
          { key: 'performance', label: 'Desempeño', type: 'select', options: PERFORMANCE_OPTIONS },
          { key: 'detail', label: 'Detalle', placeholder: 'Sin limitaciones, respuesta instantánea' },
        ]}
        emptyRow={{ software: '', performance: PERFORMANCE_OPTIONS[0], detail: '' }}
        addLabel="+ Agregar software"
      />

      {error && <p className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</p>}
      {saved && <p className="rounded-xl bg-green-500/10 px-4 py-2.5 text-sm text-green-400">Cambios guardados.</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto sm:self-end sm:px-10"
      >
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </button>

      {/* Zona de peligro */}
      {esAdmin && (
        <section className="rounded-[28px] border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="mb-2 text-lg font-bold text-red-300">Eliminar producto</h2>
          <p className="mb-4 text-sm text-slate-400">
            Esto quita el producto de la tienda permanentemente y no se puede deshacer. Para confirmar, escribe el
            nombre exacto del producto: <span className="font-semibold text-slate-300">{producto.name}</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={producto.name}
              className={inputClass}
            />
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteConfirmText !== producto.name || deleting}
              className="shrink-0 rounded-2xl bg-red-500/90 px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {deleting ? 'Eliminando...' : 'Eliminar definitivamente'}
            </button>
          </div>
          {deleteError && <p className="mt-3 text-sm text-red-400">{deleteError}</p>}
        </section>
      )}
    </form>
  );
}
