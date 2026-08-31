// Crea las tablas brands y maintenance_cards, y siembra los datos que hasta
// ahora estaban hardcodeados en lib/constants.ts y components/MantenimientosCarousel.tsx
// (ya migrados a MySQL para poder editarlos desde /admin/contenido).
// Uso: node --experimental-strip-types --env-file=.env.local scripts/apply-schema-phase6b.ts

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { sql } from 'kysely';
import { db } from '../lib/db.ts';

async function applySchema(file: string) {
  const p = path.resolve(import.meta.dirname, '../db', file);
  await sql.raw(readFileSync(p, 'utf-8')).execute(db);
  console.log(`Aplicado: ${file}`);
}

await applySchema('schema-brands.sql');
await applySchema('schema-maintenance-cards.sql');

// --- Sembrar marcas (mismas 4 que ya estaban hardcodeadas) ---
const existingBrands = await db.selectFrom('brands').select('id').execute();
if (existingBrands.length === 0) {
  const seeds = [
    { name: 'COUGAR', file: 'public/Imagenes/logo-cougar.jpg', mime: 'image/jpeg' },
    { name: 'KINGSTON', file: 'public/Imagenes/logo-kingston.png', mime: 'image/png' },
    { name: 'MSI', file: 'public/Imagenes/logo-msi.png', mime: 'image/png' },
    { name: 'LOGITECH', file: 'public/Imagenes/logo-logitech.png', mime: 'image/png' },
  ];
  for (let i = 0; i < seeds.length; i++) {
    const s = seeds[i];
    const filePath = path.resolve(import.meta.dirname, '..', s.file);
    const data = readFileSync(filePath);
    const image = await db.insertInto('images').values({ data, mime_type: s.mime }).executeTakeFirstOrThrow();
    await db.insertInto('brands').values({ name: s.name, image_id: Number(image.insertId), sort_order: i }).execute();
    console.log(`Marca sembrada: ${s.name}`);
  }
} else {
  console.log('Ya hay marcas — no se siembra de nuevo.');
}

// --- Sembrar tarjetas de mantenimiento (mismas 8 que ya estaban hardcodeadas) ---
const existingCards = await db.selectFrom('maintenance_cards').select('id').execute();
if (existingCards.length === 0) {
  const cards = [
    { category: 'torres', gama: 'Gama Alta', title: 'Torres', description: 'Mantenimiento especializado para estaciones de trabajo, gaming profesional y edición 4K. Maximizamos el rendimiento y prolongamos la vida útil de equipos de alto exigencia.', icon: '🖥️', accentColor: 'rgba(34,211,238,0.18)', services: ['Mantenimiento preventivo','Cambio de partes','Ensamble de equipos','Diagnóstico','Aumento de memoria RAM','Aumento de almacenamiento'] },
    { category: 'torres', gama: 'Gama Media', title: 'Torres', description: 'Servicio preventivo para computadores de oficina, empresas y uso doméstico avanzado. Mantenemos tu equipo en condiciones óptimas para una productividad continua.', icon: '🖥️', accentColor: 'rgba(59,130,246,0.18)', services: ['Mantenimiento preventivo','Cambio de partes','Ensamble de equipos','Diagnóstico','Aumento de memoria RAM','Aumento de almacenamiento'] },
    { category: 'torres', gama: 'Gama Baja', title: 'Torres', description: 'Mantenimiento preventivo accesible para computadores de estudio y hogar. Garantizamos el buen funcionamiento de tu equipo sin importar su gama.', icon: '🖥️', accentColor: 'rgba(100,116,139,0.25)', services: ['Mantenimiento preventivo','Cambio de partes','Ensamble de equipos','Diagnóstico','Aumento de memoria RAM','Aumento de almacenamiento'] },
    { category: 'portatiles', gama: 'Gama Alta', title: 'Portátiles', description: 'Mantenimiento especializado para laptops de alto rendimiento: gaming, diseño gráfico, arquitectura y edición. Cuidamos tu herramienta de trabajo con la precisión que merece.', icon: '💻', accentColor: 'rgba(34,211,238,0.18)', services: ['Mantenimiento preventivo','Reparación de bisagras','Diagnóstico','Cambio de teclado','Cambio de pantalla','Aumento de memoria RAM','Aumento de almacenamiento'] },
    { category: 'portatiles', gama: 'Gama Media', title: 'Portátiles', description: 'Mantenimiento preventivo para portátiles orientados al estudio, la oficina y el trabajo profesional. Optimizamos el rendimiento y la duración de batería.', icon: '💻', accentColor: 'rgba(59,130,246,0.18)', services: ['Mantenimiento preventivo','Reparación de bisagras','Diagnóstico','Cambio de teclado','Cambio de pantalla','Aumento de memoria RAM','Aumento de almacenamiento'] },
    { category: 'portatiles', gama: 'Gama Baja', title: 'Portátiles', description: 'Mantenimiento preventivo para portátiles de tareas básicas y uso doméstico. Un servicio accesible que garantiza el correcto funcionamiento de tu equipo en el día a día.', icon: '💻', accentColor: 'rgba(100,116,139,0.25)', services: ['Mantenimiento preventivo','Reparación de bisagras','Diagnóstico','Cambio de teclado','Cambio de pantalla','Aumento de memoria RAM','Aumento de almacenamiento'] },
    { category: 'otros', gama: 'Consolas', title: 'Consolas', description: 'Mantenimiento preventivo para consolas de videojuegos de todas las generaciones. Limpieza interna, cambio de pasta térmica y revisión completa para un rendimiento óptimo.', icon: '🎮', accentColor: 'rgba(168,85,247,0.18)', services: ['Mantenimiento preventivo','Diagnóstico','Mantenimiento controles','Aumento de almacenamiento (Dependiendo la consola)'] },
    { category: 'otros', gama: 'All in One', title: 'All in One', description: 'Mantenimiento preventivo para equipos All in One. Cuidamos cada componente integrado para garantizar el mejor rendimiento y la máxima durabilidad de tu equipo.', icon: '🖥️', accentColor: 'rgba(20,184,166,0.18)', services: ['Mantenimiento preventivo','Diagnóstico','Aumento de memoria RAM','Aumento de almacenamiento'] },
  ] as const;

  const sortByCat: Record<string, number> = {};
  for (const c of cards) {
    const so = sortByCat[c.category] ?? 0;
    await db.insertInto('maintenance_cards').values({
      category: c.category,
      gama: c.gama,
      title: c.title,
      description: c.description,
      icon: c.icon,
      accent_color: c.accentColor,
      services: JSON.stringify(c.services),
      sort_order: so,
    }).execute();
    sortByCat[c.category] = so + 1;
    console.log(`Tarjeta sembrada: ${c.category} / ${c.gama}`);
  }
} else {
  console.log('Ya hay tarjetas de mantenimiento — no se siembra de nuevo.');
}

await db.destroy();
