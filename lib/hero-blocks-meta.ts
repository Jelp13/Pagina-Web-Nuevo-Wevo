// Metadatos de los bloques de título editables. Sin dependencias de servidor
// (nada de `db`) para poder importarse tanto desde componentes cliente del
// admin como desde lib/site-settings.ts y las rutas de API.

export interface HeroBlock {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  note: string;
}

export type HeroBlockKey =
  | 'homeHero'
  | 'homeQuizPromo'
  | 'torresHero'
  | 'portatilesHero'
  | 'perifericosHero'
  | 'contactoHero'
  | 'quizHero'
  | 'mantenimientosHero';

export type PageTitles = Record<HeroBlockKey, HeroBlock>;

export const HERO_BLOCK_META: Record<HeroBlockKey, { label: string; page: string; fields: (keyof HeroBlock)[] }> = {
  homeHero: { label: 'Encabezado principal', page: 'Inicio', fields: ['eyebrow', 'title', 'titleAccent', 'subtitle'] },
  homeQuizPromo: { label: 'Promoción del quiz', page: 'Inicio', fields: ['eyebrow', 'title', 'subtitle'] },
  torresHero: { label: 'Encabezado', page: 'Torres', fields: ['eyebrow', 'title', 'subtitle'] },
  portatilesHero: { label: 'Encabezado', page: 'Portátiles', fields: ['eyebrow', 'title', 'subtitle'] },
  perifericosHero: { label: 'Encabezado (sin filtro de categoría)', page: 'Periféricos', fields: ['eyebrow', 'title', 'subtitle'] },
  contactoHero: { label: 'Encabezado', page: 'Contacto', fields: ['eyebrow', 'title', 'subtitle'] },
  quizHero: { label: 'Encabezado', page: 'Quiz', fields: ['title', 'subtitle'] },
  mantenimientosHero: { label: 'Encabezado', page: 'Mantenimientos', fields: ['title', 'subtitle', 'note'] },
};
