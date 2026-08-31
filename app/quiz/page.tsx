/**
 * Página Quiz - Recomendador Inteligente de PCs
 *
 * Este archivo es el server component: obtiene las torres de la base de
 * datos y se las pasa a QuizPageClient, que tiene toda la interactividad.
 */

import QuizPageClient from '@/components/QuizPageClient';
import { getTorres, getFeaturedTorres } from '@/lib/products-db';
import { getFeaturedTorresIds, getPageTitles, getQuizQuestionTexts } from '@/lib/site-settings';
import { getBrandsForPublic } from '@/lib/brands-db';
import { QUIZ_QUESTIONS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function QuizPage() {
  const featuredIds = await getFeaturedTorresIds();
  const [allTorres, featuredTorres, brands, titles, questionTexts] = await Promise.all([
    getTorres(),
    getFeaturedTorres(featuredIds),
    getBrandsForPublic(),
    getPageTitles(),
    getQuizQuestionTexts(),
  ]);

  // El texto de cada pregunta/opción es editable desde el panel, pero el
  // número de opciones, su orden y si es de selección múltiple es lógica
  // fija en el código: el motor de recomendación depende de esa posición.
  const quizQuestions = QUIZ_QUESTIONS.map((original, i) => ({
    q: questionTexts[i]?.q ?? original.q,
    opts: original.opts.map((opt, j) => questionTexts[i]?.opts[j] ?? opt),
    multiple: original.multiple,
  }));

  return (
    <QuizPageClient
      allTorres={allTorres}
      featuredTorres={featuredTorres}
      brands={brands}
      quizQuestions={quizQuestions}
      hero={titles.quizHero}
    />
  );
}
