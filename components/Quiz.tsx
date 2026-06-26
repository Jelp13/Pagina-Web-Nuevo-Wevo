'use client';

import { useMemo, useState } from 'react';
import { WHATSAPP_LINK } from '@/lib/config';

type Question = {
  q: string;
  opts: string[];
  multiple?: boolean;
};

type Result = {
  name: string;
  desc: string;
  url: string;
};

type QuizProps = {
  questions?: Question[];
  getResult?: (answers: (number | number[] | null)[]) => Result;
  title?: string;
  subtitle?: string;
};

const defaultQuestions: Question[] = [
  {
    q: '¿Para qué vas a usar tu PC principalmente?',
    opts: ['Gaming intenso', 'Diseño/edición', 'Trabajo y estudio', 'Uso casual'],
  },
  {
    q: '¿Cuál es tu presupuesto?',
    opts: ['Hasta $4.5M', '$4.5M–$6M', '$6M–$8M', 'Más de $8M'],
  },
  {
    q: '¿Qué tipo de juegos prefieres?',
    opts: ['Esports', 'AAA', 'Indie/casual', 'No juego mucho'],
  },
  {
    q: '¿Qué valoras más?',
    opts: ['Rendimiento', 'Estilo', 'Silencio', 'Precio'],
  },
  {
    q: '¿Prefieres un equipo con estilo minimalista?',
    opts: ['Sí', 'RGB elegante', 'Case blanco', 'Me da igual'],
  },
];

const defaultResults: Record<string, Result> = {
  gaming_alto: {
    name: 'Torre Wevo Pochado',
    desc: 'Máxima potencia para gaming AAA y esports con estilo minimalista.',
    url: 'https://nuevowevo.com/producto/torre-wevo-pochado-amd-ryzen-5-7600x-rtx-5060ti/',
  },
  gaming_medio: {
    name: 'Torre Wevo Revuelto',
    desc: 'Equilibrio perfecto entre rendimiento y precio.',
    url: 'https://nuevowevo.com/producto/torre-wevo-revuelto-amd-ryzen-7-5700x-rtx-5060ti/',
  },
  budget: {
    name: 'Torre Wevo Frito',
    desc: 'Potencia accesible para gaming y trabajo ligero.',
    url: 'https://nuevowevo.com/producto/torre-wevo-frito-amd-ryzen-7-5700x-radeon-9060xt/',
  },
  entry: {
    name: 'Torre Wevo Tibio',
    desc: 'Ideal para estudio, oficina y juegos casuales.',
    url: 'https://nuevowevo.com/producto/torre-wevo-tibio-amd-ryzen-5-8600g/',
  },
  estilo: {
    name: 'Torre Clara de Wevo',
    desc: 'Diseño blanco elegante con potencia confiable.',
    url: 'https://nuevowevo.com/producto/torre-clara-de-wevo-amd-ryzen-7-5700x-rtx-5060-blanca/',
  },
};

const defaultGetResult = (answers: (number | number[] | null)[]) => {
  const [, presupuesto, experiencia, valor] = answers;
  const p = typeof presupuesto === 'number' ? presupuesto : 0;
  const e = typeof experiencia === 'number' ? experiencia : 0;
  const v = typeof valor === 'number' ? valor : 0;

  if (v === 1) return defaultResults.estilo;
  if (e === 0) return defaultResults.entry;
  if (e === 1) return p === 0 ? defaultResults.entry : defaultResults.budget;
  if (p === 0) return defaultResults.entry;
  if (p === 1) return defaultResults.budget;
  if (p === 2) return defaultResults.gaming_medio;
  return defaultResults.gaming_alto;
};

export default function Quiz({ questions = defaultQuestions, getResult = defaultGetResult, title, subtitle }: QuizProps) {
  const [answers, setAnswers] = useState<(number | number[] | null)[]>(
    questions.map((q) => (q.multiple ? [] : null))
  );
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  const selected = answers[current];
  const isMultiple = questions[current].multiple ?? false;
  const progress = Math.round(((current + 1) / questions.length) * 100);

  const isSelected = (index: number) => {
    if (isMultiple) return Array.isArray(selected) && selected.includes(index);
    return selected === index;
  };

  const result = useMemo(() => {
    if (!completed) return null;
    return getResult(answers);
  }, [answers, completed, getResult]);

  const handleSelect = (index: number) => {
    const nextAnswers = [...answers];
    if (isMultiple) {
      const prev = Array.isArray(nextAnswers[current]) ? (nextAnswers[current] as number[]) : [];
      nextAnswers[current] = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];
    } else {
      nextAnswers[current] = index;
    }
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (!isMultiple && selected == null) {
      window.alert('Selecciona una opción para continuar.');
      return;
    }
    if (current === questions.length - 1) {
      setCompleted(true);
      return;
    }
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleRestart = () => {
    setAnswers(questions.map((q) => (q.multiple ? [] : null)));
    setCurrent(0);
    setCompleted(false);
  };

  return (
    <div className="rounded-[32px] border border-cyan-400/10 bg-white/5 p-6 shadow-glow sm:p-10">
      <div className="mb-6 overflow-hidden rounded-3xl bg-slate-950/80 p-4">
        <div className="h-2 rounded-full bg-slate-900">
          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" style={{ width: `${completed ? 100 : progress}%` }} />
        </div>
      </div>

      {!completed ? (
        <>
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Pregunta {current + 1} de {questions.length}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{questions[current].q}</h3>
            {isMultiple && (
              <p className="mt-2 text-xs text-slate-500">Puedes seleccionar varias opciones</p>
            )}
            {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p> : null}
          </div>
          <div className="grid gap-4">
            {questions[current].opts.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(index)}
                className={`rounded-3xl border px-5 py-4 text-left text-sm transition-colors ${
                  isSelected(index)
                    ? 'border-cyan-300/60 bg-cyan-300/10 text-white'
                    : 'border-slate-700 bg-slate-950/80 text-slate-300 hover:border-cyan-300/20 hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center gap-3">
                  {isMultiple && (
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      isSelected(index) ? 'border-cyan-300 bg-cyan-300/20' : 'border-slate-600'
                    }`}>
                      {isSelected(index) && (
                        <svg className="h-2.5 w-2.5 text-cyan-300" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  )}
                  {option}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full border border-cyan-400/20 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
              disabled={current === 0}
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-7 py-3 text-sm font-semibold text-slate-950 hover:opacity-95"
            >
              {current === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Resultado</p>
          <h3 className="text-3xl font-semibold text-white">{result?.name}</h3>
          <p className="mx-auto max-w-xl text-slate-400">{result?.desc}</p>
          <p className="mx-auto max-w-xl text-lg text-cyan-400 mt-2">Si no es lo que buscabas, no te preocupes, contáctanos y te cotizaremos una torre que se acomode a ti.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={result?.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cyan-300/90 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Ver producto
            </a>
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-full border border-cyan-400/20 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
            >
              Reiniciar
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-full border border-green-400/60 bg-green-500/25 px-8 py-3.5 text-sm font-semibold text-green-300 hover:bg-green-500/35 transition-colors"
            >
              Ir a WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
