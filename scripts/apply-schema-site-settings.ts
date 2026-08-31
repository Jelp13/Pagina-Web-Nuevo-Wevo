import { readFileSync } from 'node:fs';
import path from 'node:path';
import { sql } from 'kysely';
import { db } from '../lib/db.ts';

const schemaPath = path.resolve(import.meta.dirname, '../db/schema-site-settings.sql');
const schema = readFileSync(schemaPath, 'utf-8');
await sql.raw(schema).execute(db);
console.log('Tabla site_settings lista.');

const existing = await db.selectFrom('site_settings').select('value').where('key', '=', 'featured_torres_ids').executeTakeFirst();
if (!existing) {
  const ids = ['torre-wevo-pochado', 'torre-clara-de-wevo', 'torre-wevo-revuelto', 'torre-wevo-tortilla'];
  await db.insertInto('site_settings').values({ key: 'featured_torres_ids', value: JSON.stringify(ids) }).execute();
  console.log('Sembradas las 4 torres destacadas actuales (mismas que ya estaban hardcodeadas).');
} else {
  console.log('featured_torres_ids ya tenía valor — no se siembra de nuevo.');
}

await db.destroy();
