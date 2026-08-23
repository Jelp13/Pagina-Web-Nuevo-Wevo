import Link from 'next/link';
import { getAllVideosForAdmin } from '@/lib/admin-videos';
import AdminVideosClient from '@/components/AdminVideosClient';

export const dynamic = 'force-dynamic';

export default async function AdminVideosPage() {
  const videos = await getAllVideosForAdmin();
  const homeVideos = videos.filter((v) => v.placement === 'home');
  const empresasVideo = videos.find((v) => v.placement === 'mantenimientos_empresas') ?? null;

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[1180px]">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver al panel
        </Link>
        <h1 className="mt-2 mb-8 text-3xl font-bold text-white">Editor de videos</h1>

        <AdminVideosClient homeVideos={homeVideos} empresasVideo={empresasVideo} />
      </div>
    </main>
  );
}
