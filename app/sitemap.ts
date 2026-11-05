import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config';
import { getTorres, getLaptopProducts, getPeripheralProducts } from '@/lib/products-db';

// force-dynamic (igual que el resto de páginas del sitio): evita que Next
// intente conectarse a la base de datos durante el build para "congelar"
// el sitemap como archivo estático — se genera en cada solicitud real.
export const dynamic = 'force-dynamic';

const PAGINAS_ESTATICAS = [
  '',
  '/torres',
  '/portatiles',
  '/perifericos',
  '/quiz',
  '/contacto',
  '/mantenimientos',
  '/legal/terminos',
  '/legal/politica-privacidad',
  '/legal/datos-personales',
  '/legal/eliminacion-datos',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [torres, portatiles, perifericos] = await Promise.all([
    getTorres(),
    getLaptopProducts(),
    getPeripheralProducts(),
  ]);

  const estaticas: MetadataRoute.Sitemap = PAGINAS_ESTATICAS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productos: MetadataRoute.Sitemap = [
    ...torres.map((p) => ({ url: `${SITE_URL}/torres/${p.id}`, lastModified: new Date() })),
    ...portatiles.map((p) => ({ url: `${SITE_URL}/portatiles/${p.id}`, lastModified: new Date() })),
    ...perifericos.map((p) => ({ url: `${SITE_URL}/perifericos/${p.id}`, lastModified: new Date() })),
  ];

  return [...estaticas, ...productos];
}
