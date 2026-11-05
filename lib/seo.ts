import { SITE_URL } from './config';

// Recorta una descripción larga a un tamaño razonable para la meta
// description (Google la corta de todas formas alrededor de los 155-160
// caracteres; mejor cortarla nosotros en un espacio limpio que dejar que
// la corte a la mitad de una palabra).
export function truncateForMeta(text: string, maxLength = 155): string {
  const clean = text.trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export interface ProductJsonLdInput {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  images: string[];
  numericPrice: number;
  inStock: boolean;
  path: string; // ej. '/torres/mi-torre'
}

function absoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url}`;
}

// Datos estructurados (schema.org/Product) para que Google pueda mostrar
// precio y disponibilidad directamente en el resultado de búsqueda.
export function buildProductJsonLd(product: ProductJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription ?? product.description,
    image: product.images.map(absoluteUrl),
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Nuevo Wevo' },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(product.path),
      priceCurrency: 'COP',
      price: product.numericPrice,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}
