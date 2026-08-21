import { Kysely, MysqlDialect, type Generated } from 'kysely';
import { createPool } from 'mysql2';

export interface ProductRow {
  id: string;
  section: 'torres' | 'perifericos' | 'portatiles';
  category: string;
  category_slug: string | null;
  badge: string | null;
  name: string;
  specs: string;
  description: string;
  short_description: string | null;
  full_specs: string; // JSON
  gaming_performance: string; // JSON
  creative_performance: string; // JSON
  features: string; // JSON
  images: string; // JSON
  price_label: string;
  numeric_price: number;
  original_price: number | null;
  external_url: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface AdminRow {
  id: Generated<number>;
  username: string;
  password_hash: string;
  role: 'admin' | 'ventas';
  created_at: Generated<Date>;
}

interface Database {
  products: ProductRow;
  admins: AdminRow;
}

const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
  }),
});

export const db = new Kysely<Database>({ dialect });
