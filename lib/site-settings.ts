import { db } from './db';
import { QUIZ_QUESTIONS } from './constants';
import type { HeroBlockKey, PageTitles } from './hero-blocks-meta';
import { DEFAULT_LEGAL_PAGES, LEGAL_SLUGS } from './legal-pages-defaults';
import type { LegalSlug, LegalPageContent } from './legal-pages-defaults';

export type { HeroBlock, HeroBlockKey, PageTitles } from './hero-blocks-meta';
export type { LegalSlug, LegalPageContent } from './legal-pages-defaults';

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

const PAGE_TITLES_KEY = 'page_titles';

const DEFAULT_PAGE_TITLES: PageTitles = {
  homeHero: {
    eyebrow: 'Tecnología minimalista, rendimiento potente',
    title: 'Tu setup,',
    titleAccent: 'tus reglas.',
    subtitle:
      '¿No sabes qué PC comprar? Encuentra la tuya en 2 minutos. Responde 7 preguntas y te recomendamos el equipo exacto para tu uso y presupuesto.',
    note: '',
  },
  homeQuizPromo: {
    eyebrow: 'Recomendador inteligente',
    title: '¿Listo para encontrar tu PC ideal?',
    titleAccent: '',
    subtitle:
      'Responde las preguntas en una página dedicada y recibe una recomendación personalizada según tu uso y presupuesto.',
    note: '',
  },
  torresHero: {
    eyebrow: 'Catálogo completo',
    title: 'Torres disponibles.',
    titleAccent: '',
    subtitle: 'Selección de equipos ensamblados con componentes premium, listos para gaming, diseño y productividad.',
    note: '',
  },
  portatilesHero: {
    eyebrow: 'Catálogo completo',
    title: 'Portátiles.',
    titleAccent: '',
    subtitle: 'Equipos móviles para gaming, estudio y trabajo diario, con configuraciones para cada presupuesto.',
    note: '',
  },
  perifericosHero: {
    eyebrow: 'Catálogo completo',
    title: 'Periféricos.',
    titleAccent: '',
    subtitle: 'Todo lo que necesitas para completar tu setup: monitores, periféricos y accesorios gaming.',
    note: '',
  },
  contactoHero: {
    eyebrow: 'Contáctanos',
    title: 'Estamos aquí para ayudarte.',
    titleAccent: '',
    subtitle: 'Escríbenos por WhatsApp, correo o completa el formulario y te respondemos en menos de 2 horas.',
    note: '',
  },
  quizHero: {
    eyebrow: '',
    title: 'Encuentra tu PC ideal con unas pocas preguntas.',
    titleAccent: '',
    subtitle:
      'Completa el cuestionario pensado para recomendarte la torre y el setup que mejor se adaptan a tu experiencia y presupuesto.',
    note: '',
  },
  mantenimientosHero: {
    eyebrow: '',
    title: 'Mantenimientos',
    titleAccent: '',
    subtitle: 'Nos especializamos en mantenimiento preventivo para equipos tecnológicos de toda gama y categoría.',
    note: 'Realizamos mantenimiento preventivo para computadores, portátiles, consolas y equipos de alto rendimiento. Agenda tu servicio directamente por WhatsApp.',
  },
};

export async function getPageTitles(): Promise<PageTitles> {
  const saved = await getSetting<Partial<PageTitles>>(PAGE_TITLES_KEY);
  if (!saved) return DEFAULT_PAGE_TITLES;
  // Merge por bloque para que un bloque nuevo agregado en el código (sin
  // migrar) siempre tenga un valor por defecto en vez de romper la página.
  const merged = { ...DEFAULT_PAGE_TITLES };
  for (const key of Object.keys(DEFAULT_PAGE_TITLES) as HeroBlockKey[]) {
    if (saved[key]) merged[key] = { ...DEFAULT_PAGE_TITLES[key], ...saved[key] };
  }
  return merged;
}

export async function setPageTitles(titles: PageTitles): Promise<void> {
  await setSetting(PAGE_TITLES_KEY, titles);
}

const QUIZ_QUESTION_TEXTS_KEY = 'quiz_question_texts';

export interface QuizQuestionText {
  q: string;
  opts: string[];
}

export async function getQuizQuestionTexts(): Promise<QuizQuestionText[]> {
  const saved = await getSetting<QuizQuestionText[]>(QUIZ_QUESTION_TEXTS_KEY);
  if (saved && saved.length === QUIZ_QUESTIONS.length) return saved;
  return QUIZ_QUESTIONS.map((q) => ({ q: q.q, opts: [...q.opts] }));
}

export async function setQuizQuestionTexts(texts: QuizQuestionText[]): Promise<void> {
  await setSetting(QUIZ_QUESTION_TEXTS_KEY, texts);
}

function legalKey(slug: LegalSlug): string {
  return `legal_${slug}`;
}

export async function getLegalPage(slug: LegalSlug): Promise<LegalPageContent> {
  const saved = await getSetting<LegalPageContent>(legalKey(slug));
  return saved ?? DEFAULT_LEGAL_PAGES[slug];
}

export async function getAllLegalPagesForAdmin(): Promise<Record<LegalSlug, LegalPageContent>> {
  const entries = await Promise.all(LEGAL_SLUGS.map(async (slug) => [slug, await getLegalPage(slug)] as const));
  return Object.fromEntries(entries) as Record<LegalSlug, LegalPageContent>;
}

export async function setLegalPage(slug: LegalSlug, content: LegalPageContent): Promise<void> {
  await setSetting(legalKey(slug), content);
}
