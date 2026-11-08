// Título/descripción de búsqueda por categoría de periférico. Separado
// de PERIPHERALS (lib/constants.ts) porque ese arreglo alimenta el texto
// que ve la persona en pantalla, mientras que esto es específico para el
// <title>/meta description de cada página /perifericos/categoria/[slug].
export const PERIPHERAL_CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  mouse: {
    title: 'Mouse Gamer en Colombia | Nuevo Wevo',
    description: 'Mouse gamer con sensores de alta precisión y DPI ajustable. Envío a toda Colombia.',
  },
  teclados: {
    title: 'Teclados Mecánicos Gamer en Colombia | Nuevo Wevo',
    description: 'Teclados gamer mecánicos e híbridos, muchos con iluminación RGB. Envío a toda Colombia.',
  },
  audifonos: {
    title: 'Audífonos Gamer en Colombia | Nuevo Wevo',
    description: 'Audífonos y diademas gamer con sonido envolvente para juego y streaming. Envío a toda Colombia.',
  },
  microfonos: {
    title: 'Micrófonos para Streaming y Gaming en Colombia | Nuevo Wevo',
    description: 'Micrófonos USB para streaming, gaming y trabajo. Envío a toda Colombia.',
  },
  monitores: {
    title: 'Monitores Gamer en Colombia | Nuevo Wevo',
    description: 'Monitores gamer de alta frecuencia de refresco y bajo tiempo de respuesta. Envío a toda Colombia.',
  },
  camaras: {
    title: 'Cámaras Web en Colombia | Nuevo Wevo',
    description: 'Cámaras web para videollamadas, streaming y trabajo remoto. Envío a toda Colombia.',
  },
  otros: {
    title: 'Accesorios Gamer en Colombia | Nuevo Wevo',
    description: 'Accesorios y complementos gamer: mandos, soportes y más. Envío a toda Colombia.',
  },
};
