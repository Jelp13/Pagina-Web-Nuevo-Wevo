import { db } from './db';

function parseJson<T>(value: unknown): T {
  return typeof value === 'string' ? (JSON.parse(value) as T) : (value as T);
}

async function getSetting<T>(key: string): Promise<T | null> {
  const row = await db.selectFrom('site_settings').select('value').where('key', '=', key).executeTakeFirst();
  if (!row) return null;
  return parseJson<T>(row.value);
}

async function setSetting(key: string, value: unknown): Promise<void> {
  const json = JSON.stringify(value);
  await db
    .insertInto('site_settings')
    .values({ key, value: json })
    .onDuplicateKeyUpdate({ value: json })
    .execute();
}

const FEATURED_TORRES_KEY = 'featured_torres_ids';
const HERO_IMAGE_KEY = 'home_hero_image_id';

export async function getFeaturedTorresIds(): Promise<string[]> {
  return (await getSetting<string[]>(FEATURED_TORRES_KEY)) ?? [];
}

export async function setFeaturedTorresIds(ids: string[]): Promise<void> {
  await setSetting(FEATURED_TORRES_KEY, ids);
}

export async function getHomeHeroImageUrl(): Promise<string | null> {
  const id = await getSetting<number>(HERO_IMAGE_KEY);
  return id ? `/api/imagenes/${id}` : null;
}

// Igual que con las imágenes de producto y los videos: nunca se sobreescribe
// el blob de un id existente (se sirve con caché "immutable" de 1 año), así
// que se inserta una fila nueva y se borra la vieja después.
export async function setHomeHeroImage(data: Buffer, mimeType: string): Promise<void> {
  const oldId = await getSetting<number>(HERO_IMAGE_KEY);

  const result = await db.insertInto('images').values({ data, mime_type: mimeType }).executeTakeFirstOrThrow();
  await setSetting(HERO_IMAGE_KEY, Number(result.insertId));

  if (oldId) {
    await db.deleteFrom('images').where('id', '=', oldId).execute();
  }
}

export async function clearHomeHeroImage(): Promise<void> {
  const oldId = await getSetting<number>(HERO_IMAGE_KEY);
  await db.deleteFrom('site_settings').where('key', '=', HERO_IMAGE_KEY).execute();
  if (oldId) {
    await db.deleteFrom('images').where('id', '=', oldId).execute();
  }
}

const CONTACT_INFO_KEY = 'contact_info';

export interface ContactInfo {
  phone: string; // dígitos, ej: "3163713928"
  email: string;
  address: string;
  hours: string; // texto libre, una línea por renglón
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '3163713928',
  email: 'ventas@nuevowevo.com',
  address: 'Cra. 67 #43-35, Bogotá, Cundinamarca',
  hours: 'Lunes a viernes: 8:00 am a 12:30 pm y 1:30 pm a 4:30 pm\nSábados: 9:00 am a 12:00 pm',
};

export async function getContactInfo(): Promise<ContactInfo> {
  return (await getSetting<ContactInfo>(CONTACT_INFO_KEY)) ?? DEFAULT_CONTACT_INFO;
}

export async function setContactInfo(info: ContactInfo): Promise<void> {
  await setSetting(CONTACT_INFO_KEY, info);
}
