import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
  label: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ label, title, updated, children }: Props) {
  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-16 pb-24">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{label}</p>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-slate-500">Última actualización: {updated}</p>
        </header>
        <div
          className="
            space-y-6 text-slate-400 leading-relaxed
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-cyan-400/10 [&_h2]:pb-2
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-cyan-200 [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-1.5
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-1.5
            [&_strong]:text-slate-200 [&_strong]:font-semibold
            [&_a]:text-cyan-300 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-cyan-200
            [&_li]:leading-relaxed
          "
        >
          {children}
        </div>
      </article>
      <Footer />
    </main>
  );
}
