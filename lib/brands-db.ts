import { db } from './db';

export interface PublicBrand {
  name: string;
  logo: string;
}

export async function getBrandsForPublic(): Promise<PublicBrand[]> {
  const rows = await db.selectFrom('brands').select(['name', 'image_id']).orderBy('sort_order').execute();
  return rows.map((r) => ({ name: r.name, logo: `/api/imagenes/${r.image_id}` }));
}

export interface AdminBrand {
  id: number;
  name: string;
  sortOrder: number;
  logo: string;
}

export async function getAllBrandsForAdmin(): Promise<AdminBrand[]> {
  const rows = await db.selectFrom('brands').selectAll().orderBy('sort_order').execute();
  return rows.map((r) => ({ id: r.id, name: r.name, sortOrder: r.sort_order, logo: `/api/imagenes/${r.image_id}` }));
}

export async function createBrand(name: string, data: Buffer, mimeType: string): Promise<number> {
  const image = await db.insertInto('images').values({ data, mime_type: mimeType }).executeTakeFirstOrThrow();
  const imageId = Number(image.insertId);

  const existing = await db.selectFrom('brands').select('sort_order').execute();
  const sortOrder = existing.length ? Math.max(...existing.map((r) => r.sort_order)) + 1 : 0;

  const result = await db
    .insertInto('brands')
    .values({ name, image_id: imageId, sort_order: sortOrder })
    .executeTakeFirstOrThrow();

  return Number(result.insertId);
}

export async function updateBrandName(id: number, name: string): Promise<void> {
  await db.updateTable('brands').set({ name }).where('id', '=', id).execute();
}

// Igual que con las imágenes de producto y los videos: se inserta una imagen
// nueva y se borra la vieja, en vez de mutar el blob de un id ya cacheado.
export async function replaceBrandLogo(id: number, data: Buffer, mimeType: string): Promise<void> {
  const brand = await db.selectFrom('brands').select('image_id').where('id', '=', id).executeTakeFirst();
  if (!brand) throw new Error('Marca no encontrada');

  const image = await db.insertInto('images').values({ data, mime_type: mimeType }).executeTakeFirstOrThrow();
  await db.updateTable('brands').set({ image_id: Number(image.insertId) }).where('id', '=', id).execute();
  await db.deleteFrom('images').where('id', '=', brand.image_id).execute();
}

export async function deleteBrand(id: number): Promise<void> {
  const brand = await db.selectFrom('brands').select('image_id').where('id', '=', id).executeTakeFirst();
  await db.deleteFrom('brands').where('id', '=', id).execute();
  if (brand) {
    await db.deleteFrom('images').where('id', '=', brand.image_id).execute();
  }
}
