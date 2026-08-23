import { db } from './db';

export type VideoPlacement = 'home' | 'mantenimientos_empresas';

export interface AdminVideoSummary {
  id: number;
  placement: VideoPlacement;
  sortOrder: number;
  tiktokUser: string | null;
  tiktokUrl: string | null;
  profileUrl: string | null;
  mimeType: string;
  url: string;
}

function toSummary(row: {
  id: number;
  placement: VideoPlacement;
  sort_order: number;
  tiktok_user: string | null;
  tiktok_url: string | null;
  profile_url: string | null;
  mime_type: string;
}): AdminVideoSummary {
  return {
    id: row.id,
    placement: row.placement,
    sortOrder: row.sort_order,
    tiktokUser: row.tiktok_user,
    tiktokUrl: row.tiktok_url,
    profileUrl: row.profile_url,
    mimeType: row.mime_type,
    url: `/api/videos/${row.id}`,
  };
}

export async function getAllVideosForAdmin(): Promise<AdminVideoSummary[]> {
  const rows = await db
    .selectFrom('site_videos')
    .select(['id', 'placement', 'sort_order', 'tiktok_user', 'tiktok_url', 'profile_url', 'mime_type'])
    .orderBy('placement')
    .orderBy('sort_order')
    .execute();

  return rows.map(toSummary);
}

export async function getVideoById(id: number) {
  return db.selectFrom('site_videos').selectAll().where('id', '=', id).executeTakeFirst();
}

export interface VideoMetaInput {
  tiktokUser: string | null;
  tiktokUrl: string | null;
  profileUrl: string | null;
}

export async function createVideo(
  placement: VideoPlacement,
  data: Buffer,
  mimeType: string,
  meta: VideoMetaInput,
): Promise<number> {
  const existing = await db
    .selectFrom('site_videos')
    .select('sort_order')
    .where('placement', '=', placement)
    .execute();
  const sortOrder = existing.length ? Math.max(...existing.map((r) => r.sort_order)) + 1 : 0;

  const result = await db
    .insertInto('site_videos')
    .values({
      placement,
      sort_order: sortOrder,
      tiktok_user: meta.tiktokUser,
      tiktok_url: meta.tiktokUrl,
      profile_url: meta.profileUrl,
      data,
      mime_type: mimeType,
    })
    .executeTakeFirstOrThrow();

  return Number(result.insertId);
}

export async function updateVideoMeta(id: number, meta: VideoMetaInput): Promise<void> {
  await db
    .updateTable('site_videos')
    .set({
      tiktok_user: meta.tiktokUser,
      tiktok_url: meta.tiktokUrl,
      profile_url: meta.profileUrl,
    })
    .where('id', '=', id)
    .execute();
}

// Reemplaza el archivo de un video. Igual que con las imágenes de productos,
// nunca se sobreescribe el blob de un id existente: /api/videos/[id] se sirve
// con caché "immutable" de 1 año, así que mutar el contenido de un id ya
// cacheado dejaría copias viejas sirviéndose desde el CDN indefinidamente.
// En vez de eso se borra la fila vieja y se crea una nueva con un id nuevo.
export async function replaceVideoFile(id: number, data: Buffer, mimeType: string): Promise<number> {
  const existing = await db.selectFrom('site_videos').selectAll().where('id', '=', id).executeTakeFirst();
  if (!existing) throw new Error('Video no encontrado');

  const result = await db
    .insertInto('site_videos')
    .values({
      placement: existing.placement,
      sort_order: existing.sort_order,
      tiktok_user: existing.tiktok_user,
      tiktok_url: existing.tiktok_url,
      profile_url: existing.profile_url,
      data,
      mime_type: mimeType,
    })
    .executeTakeFirstOrThrow();

  await db.deleteFrom('site_videos').where('id', '=', id).execute();

  return Number(result.insertId);
}

export async function deleteVideo(id: number): Promise<void> {
  await db.deleteFrom('site_videos').where('id', '=', id).execute();
}
