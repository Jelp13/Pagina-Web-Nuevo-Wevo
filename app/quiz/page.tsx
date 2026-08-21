/**
 * Página Quiz - Recomendador Inteligente de PCs
 *
 * Este archivo es el server component: obtiene las torres de la base de
 * datos y se las pasa a QuizPageClient, que tiene toda la interactividad.
 */

import QuizPageClient from '@/components/QuizPageClient';
import { FEATURED_IDS } from '@/lib/constants';
import { getTorres, getFeaturedTorres } from '@/lib/products-db';

export const dynamic = 'force-dynamic';

export default async function QuizPage() {
  const [allTorres, featuredTorres] = await Promise.all([
    getTorres(),
    getFeaturedTorres(FEATURED_IDS),
  ]);

  return <QuizPageClient allTorres={allTorres} featuredTorres={featuredTorres} />;
}
