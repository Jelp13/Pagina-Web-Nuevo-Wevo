/**
 * Página Quiz - Recomendador Inteligente de PCs
 *
 * Este archivo es el server component: obtiene las torres de la base de
 * datos y se las pasa a QuizPageClient, que tiene toda la interactividad.
 */

import QuizPageClient from '@/components/QuizPageClient';
import { getTorres, getFeaturedTorres } from '@/lib/products-db';
import { getFeaturedTorresIds } from '@/lib/site-settings';
import { getBrandsForPublic } from '@/lib/brands-db';

export const dynamic = 'force-dynamic';

export default async function QuizPage() {
  const featuredIds = await getFeaturedTorresIds();
  const [allTorres, featuredTorres, brands] = await Promise.all([
    getTorres(),
    getFeaturedTorres(featuredIds),
    getBrandsForPublic(),
  ]);

  return <QuizPageClient allTorres={allTorres} featuredTorres={featuredTorres} brands={brands} />;
}
