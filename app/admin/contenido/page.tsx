import Link from 'next/link';
import { getTorres } from '@/lib/products-db';
import { getFeaturedTorresIds, getHomeHeroImageUrl } from '@/lib/site-settings';
import AdminContenidoClient from '@/components/admin/AdminContenidoClient';

export const dynamic = 'force-dynamic';

export default async function AdminContenidoPage() {
  const [torres, featuredIds, heroImageUrl] = await Promise.all([
    getTorres(),
    getFeaturedTorresIds(),
    getHomeHeroImageUrl(),
  ]);

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[900px]">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver al panel
        </Link>
        <h1 className="mt-2 mb-2 text-3xl font-bold text-white">Contenido del sitio</h1>
        <p className="mb-8 text-sm text-slate-400">
          Elementos de la página de inicio y otras secciones públicas que no son productos.
        </p>

        <AdminContenidoClient
          torres={torres.map((t) => ({ id: t.id, name: t.name, category: t.category }))}
          featuredIds={featuredIds}
          heroImageUrl={heroImageUrl}
        />
      </div>
    </main>
  );
}
