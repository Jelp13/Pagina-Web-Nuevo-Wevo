import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PerifericosGrid from '@/components/PerifericosGrid';
import PerifericosCTA from '@/components/PerifericosCTA';
import PerifericosFilters from '@/components/PerifericosFilters';
import { PERIPHERALS } from '@/lib/constants';
import { getPeripheralProducts } from '@/lib/products-db';
import { getPageTitles } from '@/lib/site-settings';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Periféricos Gamer en Colombia | Nuevo Wevo',
  description: 'Periféricos gamer en Colombia: monitores, mouse, teclados y audífonos gaming con envío a todo el país.',
  alternates: { canonical: absoluteUrl('/perifericos') },
};

export default async function Perifericos(
  props: {
    searchParams: Promise<{ categoria?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const categoriaActiva = searchParams.categoria ?? null;

  const [todosLosPerifericos, titles] = await Promise.all([getPeripheralProducts(), getPageTitles()]);
  const hero = titles.perifericosHero;

  const productos = categoriaActiva
    ? todosLosPerifericos.filter((p) => p.categorySlug === categoriaActiva)
    : todosLosPerifericos;

  const categoriaLabel =
    PERIPHERALS.find((p) => p.slug === categoriaActiva)?.name ?? null;

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
          {categoriaLabel ? categoriaLabel : hero.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
          {categoriaLabel ? categoriaLabel : hero.title}
        </h1>
        <p className="mt-4 max-w-xl text-slate-400">
          {categoriaLabel
            ? `Todos los productos disponibles en la categoría ${categoriaLabel.toLowerCase()}.`
            : hero.subtitle}
        </p>
      </section>

      {/* Filtros de categoría — enlazan a la página propia de cada
          categoría (mejor para SEO que un simple ?categoria=) */}
      <section className="mx-auto max-w-[1180px] px-6 pb-8">
        <PerifericosFilters activeSlug={categoriaActiva} />
      </section>

      {/* Grid de productos */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <PerifericosGrid productos={productos} />
        <PerifericosCTA />
      </section>

      <Footer />
    </main>
  );
}
