import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PerifericosGrid from '@/components/PerifericosGrid';
import PerifericosCTA from '@/components/PerifericosCTA';
import PerifericosFilters from '@/components/PerifericosFilters';
import { PERIPHERALS } from '@/lib/constants';
import { getPeripheralProducts } from '@/lib/products-db';
import { absoluteUrl } from '@/lib/seo';
import { PERIPHERAL_CATEGORY_SEO } from '@/lib/peripheral-category-seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ categoria: string }> }) {
  const params = await props.params;
  const seo = PERIPHERAL_CATEGORY_SEO[params.categoria];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: absoluteUrl(`/perifericos/categoria/${params.categoria}`) },
  };
}

export default async function PerifericoCategoriaPage(props: { params: Promise<{ categoria: string }> }) {
  const params = await props.params;
  const categoria = PERIPHERALS.find((p) => p.slug === params.categoria);
  if (!categoria) notFound();

  const todosLosPerifericos = await getPeripheralProducts();
  const productos = todosLosPerifericos.filter((p) => p.categorySlug === categoria.slug);

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-[1180px] px-6 py-16">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Periféricos</p>
        <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">{categoria.name}</h1>
        <p className="mt-4 max-w-xl text-slate-400">
          Todos los productos disponibles en la categoría {categoria.name.toLowerCase()}.
        </p>
      </section>

      {/* Filtros de categoría */}
      <section className="mx-auto max-w-[1180px] px-6 pb-8">
        <PerifericosFilters activeSlug={categoria.slug} />
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
