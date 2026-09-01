import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLegalPage } from '@/lib/site-settings';
import { LEGAL_SLUGS, LEGAL_PAGE_META } from '@/lib/legal-pages-defaults';
import type { LegalSlug } from '@/lib/legal-pages-defaults';
import AdminLegalEditForm from '@/components/admin/AdminLegalEditForm';

export const dynamic = 'force-dynamic';

export default async function AdminLegalEditPage({ params }: { params: { slug: string } }) {
  if (!LEGAL_SLUGS.includes(params.slug as LegalSlug)) notFound();
  const slug = params.slug as LegalSlug;

  const content = await getLegalPage(slug);

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[1000px]">
        <Link href="/admin/legal" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver a políticas legales
        </Link>
        <h1 className="mt-2 mb-8 text-3xl font-bold text-white">{LEGAL_PAGE_META[slug].label}</h1>

        <AdminLegalEditForm slug={slug} content={content} />
      </div>
    </main>
  );
}
