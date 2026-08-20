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

function parseJson<T>(value: unknown): T {
  return typeof value === 'string' ? (JSON.parse(value) as T) : (value as T);
}

function rowToProduct(row: ProductRow): Product {
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
    url: row.external_url ?? '',
  };
}

function rowToPeripheralProduct(row: ProductRow): PeripheralProduct {
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
  return ids.map((id) => byId.get(id)).filter((r): r is ProductRow => !!r).map(rowToProduct);
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
