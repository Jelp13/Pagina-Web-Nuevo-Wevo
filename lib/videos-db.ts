import { db } from './db';

export interface HomeVideo {
  id: number;
  src: string;
  user: string;
  tiktokUrl: string;
  profileUrl: string;
}

export async function getHomeVideos(): Promise<HomeVideo[]> {
  const rows = await db
    .selectFrom('site_videos')
    .select(['id', 'tiktok_user', 'tiktok_url', 'profile_url'])
    .where('placement', '=', 'home')
    .orderBy('sort_order')
    .execute();

  return rows.map((r) => ({
    id: r.id,
    src: `/api/videos/${r.id}`,
    user: r.tiktok_user ?? '@nuevowevo',
    tiktokUrl: r.tiktok_url ?? '',
    profileUrl: r.profile_url ?? '',
  }));
}

export interface EmpresasVideo {
  id: number;
  src: string;
}

export async function getMantenimientosEmpresasVideo(): Promise<EmpresasVideo | null> {
  const row = await db
    .selectFrom('site_videos')
    .select('id')
    .where('placement', '=', 'mantenimientos_empresas')
    .orderBy('sort_order')
    .executeTakeFirst();

  if (!row) return null;
  return { id: row.id, src: `/api/videos/${row.id}` };
}
