// Crea la tabla site_videos y siembra los 3 videos de TikTok que hasta ahora
// estaban hardcodeados en components/TikTokSection.tsx (ya migrados a MySQL
// para poder editarlos desde /admin/videos).
// Uso: node --experimental-strip-types --env-file=.env.local scripts/apply-schema-videos.ts

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { sql } from 'kysely';
import { db } from '../lib/db.ts';

const SEED_HOME_VIDEOS = [
  {
    file: 'public/Video/Cocheros.mp4',
    tiktokUser: '@nuevowevo',
    tiktokUrl: 'https://www.tiktok.com/@nuevowevo/video/7646864525857279250',
    profileUrl: 'https://www.tiktok.com/@nuevowevo',
  },
  {
    file: 'public/Video/Colabroacion empresa.mp4',
    tiktokUser: '@menkian',
    tiktokUrl: 'https://www.tiktok.com/@menkian/video/7613862613923024148',
    profileUrl: 'https://www.tiktok.com/@menkian',
  },
  {
    file: 'public/Video/WhatsApp Video 2026-06-06 at 11.45.53 PM.mp4',
    tiktokUser: '@nuevowevo',
    tiktokUrl: 'https://www.tiktok.com/@nuevowevo/video/7622375858975624468',
    profileUrl: 'https://www.tiktok.com/@nuevowevo',
  },
];

async function main() {
  const schemaPath = path.resolve(import.meta.dirname, '../db/schema-videos.sql');
  const schema = readFileSync(schemaPath, 'utf-8');
  await sql.raw(schema).execute(db);
  console.log('Tabla site_videos lista.');

  const existing = await db.selectFrom('site_videos').where('placement', '=', 'home').select('id').execute();
  if (existing.length > 0) {
    console.log(`Ya hay ${existing.length} video(s) en "home" — no se siembra de nuevo.`);
    await db.destroy();
    return;
  }

  for (let i = 0; i < SEED_HOME_VIDEOS.length; i++) {
    const v = SEED_HOME_VIDEOS[i];
    const filePath = path.resolve(import.meta.dirname, '..', v.file);
    const data = readFileSync(filePath);
    await db
      .insertInto('site_videos')
      .values({
        placement: 'home',
        sort_order: i,
        tiktok_user: v.tiktokUser,
        tiktok_url: v.tiktokUrl,
        profile_url: v.profileUrl,
        data,
        mime_type: 'video/mp4',
      })
      .execute();
    console.log(`Sembrado: ${v.file} (${(data.length / 1024 / 1024).toFixed(1)}MB)`);
  }

  console.log('Listo.');
  await db.destroy();
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
