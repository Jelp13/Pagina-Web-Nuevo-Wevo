import Link from 'next/link';
import { getAllLegalPagesForAdmin } from '@/lib/site-settings';
import { LEGAL_SLUGS, LEGAL_PAGE_META } from '@/lib/legal-pages-defaults';

export const dynamic = 'force-dynamic';

export default async function AdminLegalPage() {
  const pages = await getAllLegalPagesForAdmin();

  return (
    <main className="min-h-screen bg-[#05080f] px-6 py-12">
      <div className="mx-auto max-w-[820px]">
        <Link href="/admin" className="text-sm text-slate-500 hover:text-cyan-300">
          ← Volver al panel
        </Link>
        <h1 className="mt-2 mb-2 text-3xl font-bold text-white">Políticas legales</h1>
        <p className="mb-8 text-sm text-slate-400">
          Términos, privacidad y tratamiento de datos. El contenido se escribe en Markdown (## para títulos, - para
          listas, **negrita**, [texto](url) para enlaces).
        </p>

        <div className="flex flex-col gap-3">
          {LEGAL_SLUGS.map((slug) => {
            const page = pages[slug];
            return (
              <Link
                key={slug}
                href={`/admin/legal/${slug}`}
                className="rounded-2xl border border-cyan-400/10 bg-white/5 p-5 transition-colors hover:border-cyan-300/30 hover:bg-white/10"
              >
                <p className="text-xs uppercase tracking-wide text-cyan-300">{LEGAL_PAGE_META[slug].label}</p>
                <h2 className="mt-1 font-semibold text-white">{page.title}</h2>
                <p className="mt-1 text-xs text-slate-500">Actualizado: {page.updatedLabel}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
