'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizQuestionText } from '@/lib/site-settings';

const inputClass =
  'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30';

export default function AdminQuizQuestionsSection({ questions }: { questions: QuizQuestionText[] }) {
  const router = useRouter();
  const [values, setValues] = useState<QuizQuestionText[]>(questions);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function updateQuestion(index: number, q: string) {
    setValues((prev) => prev.map((item, i) => (i === index ? { ...item, q } : item)));
  }

  function updateOption(qIndex: number, optIndex: number, value: string) {
    setValues((prev) =>
      prev.map((item, i) =>
        i === qIndex ? { ...item, opts: item.opts.map((o, j) => (j === optIndex ? value : o)) } : item,
      ),
    );
  }

  async function handleSave() {
    setError('');
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings/preguntas-encuesta', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts: values }),
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
      <h2 className="mb-1 text-lg font-bold text-white">Preguntas de la encuesta “Tu PC ideal”</h2>
      <p className="mb-5 text-sm text-slate-400">
        Solo el texto es editable. No se pueden agregar, quitar ni reordenar preguntas u opciones, porque la
        recomendación depende de cuál posición eligió el cliente.
      </p>

      <div className="flex flex-col gap-5">
        {values.map((question, qIndex) => (
          <div key={qIndex} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-300">
              Pregunta {qIndex + 1}
            </p>
            <input
              value={question.q}
              onChange={(e) => updateQuestion(qIndex, e.target.value)}
              className={`${inputClass} mb-3`}
            />
            <div className="grid gap-2 sm:grid-cols-2">
              {question.opts.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                  placeholder={`Opción ${optIndex + 1}`}
                  className={inputClass}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar preguntas'}
      </button>
    </section>
  );
}
