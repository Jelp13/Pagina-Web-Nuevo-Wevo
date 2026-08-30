import { readFileSync } from 'node:fs';
import path from 'node:path';
import { sql } from 'kysely';
import { db } from '../lib/db.ts';

const schemaPath = path.resolve(import.meta.dirname, '../db/schema-orders-status-reason.sql');
const schema = readFileSync(schemaPath, 'utf-8');
await sql.raw(schema).execute(db);
console.log('Columnas status_reason / status_updated_by listas en orders.');
await db.destroy();
