/**
 * Página Quiz - Recomendador Inteligente de PCs
 *
 * Este archivo es el server component: obtiene las torres de la base de
 * datos y se las pasa a QuizPageClient, que tiene toda la interactividad.
 */

import QuizPageClient from '@/components/QuizPageClient';
import { getTorres, getFeaturedTorres } from '@/lib/products-db';
import { getFeaturedTorresIds } from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

export default async function QuizPage() {
  const featuredIds = await getFeaturedTorresIds();
  const [allTorres, featuredTorres] = await Promise.all([
    getTorres(),
    getFeaturedTorres(featuredIds),
  ]);

  return <QuizPageClient allTorres={allTorres} featuredTorres={featuredTorres} />;
}
