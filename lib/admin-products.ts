import { db } from './db';
import { formatCOP } from './format';

function parseImages(json: string): string[] {
  return typeof json === 'string' ? (JSON.parse(json) as string[]) : (json as unknown as string[]);
}

export interface AdminProductSummary {
  id: string;
  section: 'torres' | 'perifericos' | 'portatiles';
  category: string;
  name: string;
  numericPrice: number;
  originalPrice: number | null;
  inStock: boolean;
  image: string | null;
}

export async function getAllProductsForAdmin(): Promise<AdminProductSummary[]> {
  const rows = await db
    .selectFrom('products')
    .select(['id', 'section', 'category', 'name', 'numeric_price', 'original_price', 'in_stock', 'images'])
    .orderBy('section')
    .orderBy('sort_order')
    .execute();

  return rows.map((r) => {
    const imgs = parseImages(r.images);
    return {
      id: r.id,
      section: r.section,
      category: r.category,
      name: r.name,
      numericPrice: r.numeric_price,
      originalPrice: r.original_price,
      inStock: Boolean(r.in_stock),
      image: imgs[0] ?? null,
    };
  });
}

export interface AdminProductDetail {
  id: string;
  section: 'torres' | 'perifericos' | 'portatiles';
  category: string;
  badge: string | null;
  name: string;
  specs: string;
  description: string;
  shortDescription: string | null;
  images: string[];
  numericPrice: number;
  originalPrice: number | null;
  inStock: boolean;
}

export async function getAdminProductById(id: string): Promise<AdminProductDetail | undefined> {
  const row = await db.selectFrom('products').selectAll().where('id', '=', id).executeTakeFirst();
  if (!row) return undefined;

  return {
    id: row.id,
    section: row.section,
    category: row.category,
    badge: row.badge,
    name: row.name,
    specs: row.specs,
    description: row.description,
    shortDescription: row.short_description,
    images: parseImages(row.images),
    numericPrice: row.numeric_price,
    originalPrice: row.original_price,
    inStock: Boolean(row.in_stock),
  };
}

export interface ProductUpdateInput {
  badge: string | null;
  name: string;
  specs: string;
  description: string;
  shortDescription: string | null;
  numericPrice: number;
  originalPrice: number | null;
  inStock: boolean;
}

export async function updateProduct(id: string, input: ProductUpdateInput): Promise<void> {
  await db
    .updateTable('products')
    .set({
      badge: input.badge,
      name: input.name,
      specs: input.specs,
      description: input.description,
      short_description: input.shortDescription,
      numeric_price: input.numericPrice,
      price_label: formatCOP(input.numericPrice),
      original_price: input.originalPrice,
      in_stock: input.inStock ? 1 : 0,
    })
    .where('id', '=', id)
    .execute();
}

export async function addProductImage(productId: string, data: Buffer, mimeType: string): Promise<string> {
  const result = await db
    .insertInto('images')
    .values({ data, mime_type: mimeType })
    .executeTakeFirstOrThrow();
  const imageId = Number(result.insertId);
  const url = `/api/imagenes/${imageId}`;

  const row = await db
    .selectFrom('products')
    .select('images')
    .where('id', '=', productId)
    .executeTakeFirstOrThrow();
  const images = parseImages(row.images);
  images.push(url);

  await db
    .updateTable('products')
    .set({ images: JSON.stringify(images) })
    .where('id', '=', productId)
    .execute();

  return url;
}

export async function removeProductImage(productId: string, imageUrl: string): Promise<void> {
  const row = await db
    .selectFrom('products')
    .select('images')
    .where('id', '=', productId)
    .executeTakeFirstOrThrow();
  const images = parseImages(row.images).filter((u) => u !== imageUrl);

  await db
    .updateTable('products')
    .set({ images: JSON.stringify(images) })
    .where('id', '=', productId)
    .execute();

  const match = imageUrl.match(/^\/api\/imagenes\/(\d+)$/);
  if (match) {
    await db.deleteFrom('images').where('id', '=', Number(match[1])).execute();
  }
}

export async function getImageById(id: number) {
  return db.selectFrom('images').selectAll().where('id', '=', id).executeTakeFirst();
}
