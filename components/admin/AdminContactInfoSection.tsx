'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ContactInfo } from '@/lib/site-settings';

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

export default function AdminContactInfoSection({ contactInfo }: { contactInfo: ContactInfo }) {
  const router = useRouter();
  const [phone, setPhone] = useState(contactInfo.phone);
  const [email, setEmail] = useState(contactInfo.email);
  const [address, setAddress] = useState(contactInfo.address);
  const [hours, setHours] = useState(contactInfo.hours);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/contacto', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email, address, hours }),
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
      <h2 className="mb-1 text-lg font-bold text-white">Información de contacto</h2>
      <p className="mb-5 text-sm text-slate-400">
        Se usa en /contacto y en /mantenimientos: WhatsApp, teléfono, correo, dirección y horarios.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Teléfono / WhatsApp</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="3163713928"
              inputMode="numeric"
              maxLength={10}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ventas@nuevowevo.com"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">Dirección</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Cra. 67 #43-35, Bogotá, Cundinamarca"
            className={inputClass}
            required
          />
          <p className="mt-1 text-xs text-slate-500">También actualiza el mapa de /mantenimientos.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">Horarios de atención</label>
          <textarea
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            rows={3}
            placeholder={'Lunes a viernes: 8:00 am a 12:30 pm y 1:30 pm a 4:30 pm\nSábados: 9:00 am a 12:00 pm'}
            className={inputClass}
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="self-start rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar información de contacto'}
        </button>
      </form>
    </section>
  );
}
