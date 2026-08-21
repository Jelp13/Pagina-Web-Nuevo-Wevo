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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface ProductCreateInput {
  section: 'torres' | 'perifericos' | 'portatiles';
  category: string;
  categorySlug: string | null;
  badge: string | null;
  name: string;
  specs: string;
  description: string;
  shortDescription: string | null;
  numericPrice: number;
  originalPrice: number | null;
  inStock: boolean;
}

export async function createProduct(input: ProductCreateInput): Promise<string> {
  const baseId = slugify(input.name) || 'producto';
  let id = baseId;
  let suffix = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await db.selectFrom('products').select('id').where('id', '=', id).executeTakeFirst()) {
    suffix += 1;
    id = `${baseId}-${suffix}`;
  }

  const existing = await db
    .selectFrom('products')
    .select('sort_order')
    .where('section', '=', input.section)
    .execute();
  const sortOrder = existing.length ? Math.max(...existing.map((r) => r.sort_order)) + 1 : 0;

  await db
    .insertInto('products')
    .values({
      id,
      section: input.section,
      category: input.category,
      category_slug: input.categorySlug,
      badge: input.badge,
      name: input.name,
      specs: input.specs,
      description: input.description,
      short_description: input.shortDescription,
      full_specs: '[]',
      gaming_performance: '[]',
      creative_performance: '[]',
      features: '[]',
      images: '[]',
      price_label: formatCOP(input.numericPrice),
      numeric_price: input.numericPrice,
      original_price: input.originalPrice,
      in_stock: input.inStock ? 1 : 0,
      external_url: input.section === 'torres' ? '#' : null,
      sort_order: sortOrder,
    })
    .execute();

  return id;
}

export async function deleteProduct(id: string): Promise<void> {
  const row = await db.selectFrom('products').select('images').where('id', '=', id).executeTakeFirst();
  if (row) {
    const images = parseImages(row.images);
    for (const url of images) {
      const match = url.match(/^\/api\/imagenes\/(\d+)$/);
      if (match) {
        // eslint-disable-next-line no-await-in-loop
        await db.deleteFrom('images').where('id', '=', Number(match[1])).execute();
      }
    }
  }
  await db.deleteFrom('products').where('id', '=', id).execute();
}
