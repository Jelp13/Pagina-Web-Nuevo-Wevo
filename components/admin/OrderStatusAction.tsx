'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderStatusAction({ orderId }: { orderId: number }) {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState<'pagado' | 'cancelado' | null>(null);
  const [error, setError] = useState('');

  async function handleChange(status: 'pagado' | 'cancelado') {
    if (!reason.trim()) {
      setError('Escribe una justificación antes de cambiar el estado.');
      return;
    }
    setError('');
    setLoading(status);

    try {
      const res = await fetch(`/api/admin/ventas/${orderId}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reason: reason.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Error al cambiar el estado');
        return;
      }
      router.refresh();
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex min-w-[220px] flex-col gap-1.5">
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Justificación (ej: pagó por WhatsApp)"
        rows={2}
        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
      />
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => handleChange('pagado')}
          disabled={loading !== null}
          className="flex-1 rounded-lg bg-green-500/15 px-2 py-1.5 text-xs font-semibold text-green-400 transition-colors hover:bg-green-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading === 'pagado' ? 'Guardando...' : 'Marcar pagado'}
        </button>
        <button
          type="button"
          onClick={() => handleChange('cancelado')}
          disabled={loading !== null}
          className="flex-1 rounded-lg bg-red-500/15 px-2 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading === 'cancelado' ? 'Guardando...' : 'Marcar cancelado'}
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
