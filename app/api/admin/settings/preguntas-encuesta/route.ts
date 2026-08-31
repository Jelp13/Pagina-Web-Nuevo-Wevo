import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setQuizQuestionTexts } from '@/lib/site-settings';
import { QUIZ_QUESTIONS } from '@/lib/constants';

export async function PATCH(req: NextRequest) {
  try {
    const { texts } = await req.json();

    if (!Array.isArray(texts) || texts.length !== QUIZ_QUESTIONS.length) {
      return NextResponse.json({ error: 'La lista de preguntas no tiene el formato esperado' }, { status: 400 });
    }

    const clean: { q: string; opts: string[] }[] = [];
    for (let i = 0; i < texts.length; i++) {
      const t = texts[i];
      const original = QUIZ_QUESTIONS[i];
      if (typeof t?.q !== 'string' || !t.q.trim()) {
        return NextResponse.json({ error: `Falta el texto de la pregunta ${i + 1}` }, { status: 400 });
      }
      if (!Array.isArray(t.opts) || t.opts.length !== original.opts.length) {
        return NextResponse.json(
          { error: `La pregunta ${i + 1} debe tener exactamente ${original.opts.length} opciones` },
          { status: 400 },
        );
      }
      const opts = t.opts.map((o: unknown) => String(o).trim());
      if (opts.some((o: string) => !o)) {
        return NextResponse.json({ error: `Todas las opciones de la pregunta ${i + 1} deben tener texto` }, { status: 400 });
      }
      clean.push({ q: t.q.trim(), opts });
    }

    await setQuizQuestionTexts(clean);
    revalidatePath('/quiz');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Quiz question texts update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
