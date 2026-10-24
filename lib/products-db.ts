import type { Selectable } from 'kysely';
import { db } from './db';
import type { ProductRow } from './db';
import type {
  Product,
  PeripheralProduct,
  ProductSpec,
  GamingPerf,
  CreativePerf,
  ProductFeature,
} from './constants';

type ProductSelect = Selectable<ProductRow>;

function parseJson<T>(value: unknown): T {
  return typeof value === 'string' ? (JSON.parse(value) as T) : (value as T);
}

function rowToProduct(row: ProductSelect): Product {
  return {
    id: row.id,
    badge: row.badge,
    category: row.category,
    name: row.name,
    specs: row.specs,
    description: row.description,
    shortDescription: row.short_description ?? undefined,
    fullSpecs: parseJson<ProductSpec[]>(row.full_specs),
    gamingPerformance: parseJson<GamingPerf[]>(row.gaming_performance),
    creativePerformance: parseJson<CreativePerf[]>(row.creative_performance),
    features: parseJson<ProductFeature[]>(row.features),
    images: parseJson<string[]>(row.images),
    price: row.price_label,
    numericPrice: row.numeric_price,
    originalPrice: row.original_price ?? undefined,
    inStock: Boolean(row.in_stock),
    url: row.external_url ?? '',
  };
}

function rowToPeripheralProduct(row: ProductSelect): PeripheralProduct {
  return {
    id: row.id,
    badge: row.badge,
    category: row.category,
    categorySlug: row.category_slug ?? '',
    name: row.name,
    specs: row.specs,
    description: row.description,
    shortDescription: row.short_description ?? undefined,
    fullSpecs: parseJson<ProductSpec[]>(row.full_specs),
    gamingPerformance: parseJson<GamingPerf[]>(row.gaming_performance),
    creativePerformance: parseJson<CreativePerf[]>(row.creative_performance),
    features: parseJson<ProductFeature[]>(row.features),
    images: parseJson<string[]>(row.images),
    price: row.price_label,
    numericPrice: row.numeric_price,
    originalPrice: row.original_price ?? undefined,
    inStock: Boolean(row.in_stock),
  };
}

// ── Torres ──────────────────────────────────────────────────────────────

export async function getTorres(): Promise<Product[]> {
  const rows = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'torres')
    .orderBy('sort_order')
    .execute();
  return rows.map(rowToProduct);
}

export async function getTorreById(id: string): Promise<Product | undefined> {
  const row = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'torres')
    .where('id', '=', id)
    .executeTakeFirst();
  return row ? rowToProduct(row) : undefined;
}

export async function getFeaturedTorres(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const rows = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'torres')
    .where('id', 'in', ids)
    .execute();
  const byId = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => byId.get(id)).filter((r): r is ProductSelect => !!r).map(rowToProduct);
}

// ── Periféricos ─────────────────────────────────────────────────────────

export async function getPeripheralProducts(): Promise<PeripheralProduct[]> {
  const rows = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'perifericos')
    .orderBy('sort_order')
    .execute();
  return rows.map(rowToPeripheralProduct);
}

export async function getPeripheralById(id: string): Promise<PeripheralProduct | undefined> {
  const row = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'perifericos')
    .where('id', '=', id)
    .executeTakeFirst();
  return row ? rowToPeripheralProduct(row) : undefined;
}

// ── Portátiles ──────────────────────────────────────────────────────────

export async function getLaptopProducts(): Promise<PeripheralProduct[]> {
  const rows = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'portatiles')
    .orderBy('sort_order')
    .execute();
  return rows.map(rowToPeripheralProduct);
}

export async function getLaptopById(id: string): Promise<PeripheralProduct | undefined> {
  const row = await db
    .selectFrom('products')
    .selectAll()
    .where('section', '=', 'portatiles')
    .where('id', '=', id)
    .executeTakeFirst();
  return row ? rowToPeripheralProduct(row) : undefined;
}

// ── Verificación de precios (checkout) ─────────────────────────────────
//
// El precio de un producto NUNCA debe tomarse de lo que envía el cliente
// (carrito/checkout): se busca aquí, en la base de datos, por id, sin
// importar la sección. Esta es la única fuente de verdad del precio real.

export interface ProductPriceInfo {
  id: string;
  name: string;
  numericPrice: number;
  inStock: boolean;
}

export async function getProductPricesByIds(ids: string[]): Promise<Map<string, ProductPriceInfo>> {
  if (ids.length === 0) return new Map();

  const rows = await db
    .selectFrom('products')
    .select(['id', 'name', 'numeric_price', 'in_stock'])
    .where('id', 'in', ids)
    .execute();

  return new Map(
    rows.map((r) => [r.id, { id: r.id, name: r.name, numericPrice: r.numeric_price, inStock: Boolean(r.in_stock) }]),
  );
}
