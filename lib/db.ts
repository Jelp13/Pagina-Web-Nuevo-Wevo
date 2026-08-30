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
  in_stock: number; // TINYINT(1): 0 o 1
  external_url: string | null;
  sort_order: number;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface AdminRow {
  id: Generated<number>;
  username: string;
  password_hash: string;
  role: 'admin' | 'ventas';
  created_at: Generated<Date>;
}

export interface ImageRow {
  id: Generated<number>;
  data: Buffer;
  mime_type: string;
  created_at: Generated<Date>;
}

export interface SiteVideoRow {
  id: Generated<number>;
  placement: 'home' | 'mantenimientos_empresas';
  sort_order: number;
  tiktok_user: string | null;
  tiktok_url: string | null;
  profile_url: string | null;
  data: Buffer;
  mime_type: string;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface OrderRow {
  id: Generated<number>;
  reference: string;
  nombres: string;
  apellidos: string;
  email: string;
  tipo_documento: string;
  documento: string;
  telefono: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  items: string; // JSON
  total: number;
  payment_method: string;
  status: 'pendiente' | 'pagado' | 'rechazado' | 'cancelado';
  status_reason: string | null;
  status_updated_by: string | null;
  mp_payment_id: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

interface Database {
  products: ProductRow;
  admins: AdminRow;
  images: ImageRow;
  orders: OrderRow;
  site_videos: SiteVideoRow;
}

const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // El límite de 75 conexiones del plan es por proceso concurrente, no por
    // esta sola app: en runtime solo hay UN proceso de Node corriendo (a
    // diferencia del build, que sí abría varios workers en paralelo), así
    // que un pool más generoso aquí es seguro y evita cuellos de botella
    // ahora que cada página consulta la base de datos en cada visita.
    connectionLimit: 10,
  }),
});

export const db = new Kysely<Database>({ dialect });
