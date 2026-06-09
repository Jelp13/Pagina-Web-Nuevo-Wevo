'use client';

import { useMemo, useState } from 'react';

type Question = {
  q: string;
  opts: string[];
};

type Result = {
  name: string;
  desc: string;
  url: string;
};

type QuizProps = {
  questions?: Question[];
  getResult?: (answers: number[]) => Result;
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

const defaultGetResult = (answers: number[]) => {
  const [, presupuesto, experiencia, valor] = answers;

  if (valor === 1) return defaultResults.estilo;
  if (experiencia === 0) return defaultResults.entry;
  if (experiencia === 1) {
    return presupuesto === 0 ? defaultResults.entry : defaultResults.budget;
  }

  if (presupuesto === 0) return defaultResults.entry;
  if (presupuesto === 1) return defaultResults.budget;
  if (presupuesto === 2) return defaultResults.gaming_medio;
  return defaultResults.gaming_alto;
};

export default function Quiz({ questions = defaultQuestions, getResult = defaultGetResult, title, subtitle }: QuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);

  const selected = answers[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);

  const result = useMemo(() => {
    if (!completed) return null;
    const safeAnswers = answers.map((answer) => (answer === null ? 0 : answer));
    return getResult(safeAnswers as number[]);
  }, [answers, completed, getResult]);

  const handleSelect = (index: number) => {
    const nextAnswers = [...answers];
    nextAnswers[current] = index;
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (selected == null) {
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
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers(Array(questions.length).fill(null));
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
            {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p> : null}
          </div>
          <div className="grid gap-4">
            {questions[current].opts.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(index)}
                className={`rounded-3xl border px-5 py-4 text-left text-sm transition-colors ${
                  selected === index
                    ? 'border-cyan-300/60 bg-cyan-300/10 text-white'
                    : 'border-slate-700 bg-slate-950/80 text-slate-300 hover:border-cyan-300/20 hover:bg-slate-900'
                }`}
              >
                {option}
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
          <p className="mx-auto max-w-xl text-lg text-cyan-400 mt-2">  Si no es lo que buscabas, no te preocupes, contáctanos y te cotizaremos una torre que se acomode a ti.</p>
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
              href="https://wa.me/573001234567"
              target="_blank"
              rel="norteferrer"
              className="rounded-full border border-green-400/60 bg-green-500/25 px-6 py-3 text-sm font-semibold text-green-300 flex items-center justify-center transition-colors"
              >Contactanos</a>
          </div>
        </div>
      )}
    </div>
  );
}
