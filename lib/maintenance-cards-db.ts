import { db } from './db';

export interface MaintenanceCard {
  id: number;
  category: 'torres' | 'portatiles' | 'otros';
  gama: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  services: string[] | null;
  sortOrder: number;
}

function parseServices(json: unknown): string[] | null {
  if (json == null) return null;
  if (Array.isArray(json)) return json as string[];
  if (typeof json === 'string' && json.trim()) return JSON.parse(json) as string[];
  return null;
}

function toCard(row: {
  id: number;
  category: 'torres' | 'portatiles' | 'otros';
  gama: string;
  title: string;
  description: string;
  icon: string;
  accent_color: string;
  services: string | null;
  sort_order: number;
}): MaintenanceCard {
  return {
    id: row.id,
    category: row.category,
    gama: row.gama,
    title: row.title,
    description: row.description,
    icon: row.icon,
    accentColor: row.accent_color,
    services: parseServices(row.services),
    sortOrder: row.sort_order,
  };
}

export async function getAllMaintenanceCards(): Promise<MaintenanceCard[]> {
  const rows = await db.selectFrom('maintenance_cards').selectAll().orderBy('category').orderBy('sort_order').execute();
  return rows.map(toCard);
}

export interface MaintenanceCardInput {
  category: 'torres' | 'portatiles' | 'otros';
  gama: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  services: string[] | null;
}

export async function createMaintenanceCard(input: MaintenanceCardInput): Promise<number> {
  const existing = await db
    .selectFrom('maintenance_cards')
    .select('sort_order')
    .where('category', '=', input.category)
    .execute();
  const sortOrder = existing.length ? Math.max(...existing.map((r) => r.sort_order)) + 1 : 0;

  const result = await db
    .insertInto('maintenance_cards')
    .values({
      category: input.category,
      gama: input.gama,
      title: input.title,
      description: input.description,
      icon: input.icon,
      accent_color: input.accentColor,
      services: input.services ? JSON.stringify(input.services) : null,
      sort_order: sortOrder,
    })
    .executeTakeFirstOrThrow();

  return Number(result.insertId);
}

export async function updateMaintenanceCard(id: number, input: MaintenanceCardInput): Promise<void> {
  await db
    .updateTable('maintenance_cards')
    .set({
      category: input.category,
      gama: input.gama,
      title: input.title,
      description: input.description,
      icon: input.icon,
      accent_color: input.accentColor,
      services: input.services ? JSON.stringify(input.services) : null,
    })
    .where('id', '=', id)
    .execute();
}

export async function deleteMaintenanceCard(id: number): Promise<void> {
  await db.deleteFrom('maintenance_cards').where('id', '=', id).execute();
}
