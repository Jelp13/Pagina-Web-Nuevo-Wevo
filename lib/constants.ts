/**
 * Constantes de datos estáticos
 * Todos los datos de productos, características, periféricos y marcas
 */

export interface Feature {
  icon: string;
  text: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface GamingPerf {
  game: string;
  fps: string;
  resolution: string;
  quality: string;
}

export interface CreativePerf {
  software: string;
  performance: 'Excepcional' | 'Excelente' | 'Fluido' | 'Muy bueno' | 'Bueno' | 'Aceptable' | 'Básico' | 'Limitado' | 'No recomendado';
  detail: string;
}

export interface ProductFeature {
  icon: string;
  label: string;
}

export interface Product {
  id: string;
  badge: string | null;
  category: string;
  name: string;
  specs: string;
  description: string;
  shortDescription?: string;
  fullSpecs: ProductSpec[];
  gamingPerformance: GamingPerf[];
  creativePerformance: CreativePerf[];
  features: ProductFeature[];
  images: string[];
  price: string;
  numericPrice: number;
  originalPrice?: number;
  inStock: boolean;
  url: string;
}

export interface Peripheral {
  icon: string;
  name: string;
  desc: string;
  slug: string;
}

export interface PeripheralProduct {
  id: string;
  badge: string | null;
  category: string;
  categorySlug: string;
  name: string;
  specs: string;
  description: string;
  shortDescription?: string;
  fullSpecs: ProductSpec[];
  gamingPerformance: GamingPerf[];
  creativePerformance: CreativePerf[];
  features: ProductFeature[];
  images: string[];
  price: string;
  numericPrice: number;
  originalPrice?: number;
  inStock: boolean;
}

// Características principales de Nuevo Wevo
export const FEATURES: Feature[] = [
  { icon: '⚡', text: 'Envío exprés en Colombia' },
  { icon: '💬', text: 'Asesoría rápida por WhatsApp' },
  { icon: '🔐', text: 'Compra segura y confiable' },
  { icon: '🛠️', text: 'Montaje y soporte incluidos' },
];

// Periféricos recomendados
export const PERIPHERALS: Peripheral[] = [
  { icon: '🖱️', name: 'Mouse gaming',      desc: 'Precisión avanzada y máximo control.',           slug: 'mouse'      },
  { icon: '⌨️', name: 'Teclados mecánicos', desc: 'Switches táctiles y diseño sobrio.',             slug: 'teclados'   },
  { icon: '🎧', name: 'Audífonos',          desc: 'Sonido envolvente para juego y stream.',          slug: 'audifonos'  },
  { icon: '🎤', name: 'Micrófonos',         desc: 'Voz clara y profesional para todo uso.',          slug: 'microfonos' },
  { icon: '🖥️', name: 'Monitores',          desc: 'Alta tasa de refresco y colores nítidos.',        slug: 'monitores'  },
  { icon: '📷', name: 'Cámaras',            desc: 'Imagen limpia para videollamadas y streams.',     slug: 'camaras'    },
  { icon: '📦', name: 'Otros',              desc: 'Accesorios y complementos adicionales.',          slug: 'otros'      },
];

// Marcas aliadas
export interface Brand {
  name: string;
  logo: string;
}

export const BRANDS: Brand[] = [
  { name: 'COUGAR', logo: '/Imagenes/logo-cougar.jpg' },
  { name: 'KINGSTON', logo: '/Imagenes/logo-kingston.png' },
  { name: 'MSI', logo: '/Imagenes/logo-msi.png' },
  { name: 'LOGITECH', logo: '/Imagenes/logo-logitech.png' },
];

// Preguntas del quiz (Encuentre tu PC)
export interface QuizQuestion {
  q: string;
  opts: string[];
  multiple?: boolean;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    // [0] uso: 0=competitivo, 1=AAA, 2=diseño, 3=trabajo, 4=mixto
    q: '¿Cuál será el uso principal de tu PC?',
    opts: [
      'Gaming competitivo (Valorant, CS2, LoL)',
      'Gaming AAA (Cyberpunk, GTA V, Warzone)',
      'Diseño gráfico y edición de video',
      'Trabajo y estudio (Office, streaming, video)',
      'Todo un poco (gaming + trabajo o creación)',
    ],
  },
  {
    // [1] presupuesto: 0=<3.5M, 1=3.5-5M, 2=5-7M, 3=7-10M, 4=>10M
    q: '¿Cuál es tu presupuesto disponible?',
    opts: [
      'Hasta $3.5M',
      '$3.5M – $5M',
      '$5M – $7M',
      '$7M – $10M',
      'Más de $10M',
    ],
  },
  {
    // [2] resolución: 0=1080p, 1=1440p, 2=4K, 3=noSé
    q: '¿En qué resolución planeas usar tu equipo?',
    opts: [
      '1080p (Full HD) — la más común',
      '1440p (2K) — mejor nitidez',
      '4K — la máxima calidad',
      'No sé / aún no tengo monitor',
    ],
  },
  {
    // [3] fps: 0=60fps/casual, 1=120fps, 2=200fps/competitivo, 3=noJuega
    q: '¿Cuántos FPS necesitas al jugar?',
    opts: [
      '60 FPS me basta (gaming casual)',
      '120+ FPS para jugar cómodamente',
      '200+ FPS para gaming competitivo',
      'No juego videojuegos',
    ],
  },
  {
    // [4] software: multiple — 0=PS/AI, 1=Premiere/DV, 2=Blender/C4D, 3=ninguno
    q: '¿Usas o planeas usar alguno de estos programas?',
    opts: [
      'Photoshop / Illustrator (diseño gráfico)',
      'Premiere Pro / DaVinci Resolve (video)',
      'Blender / Cinema 4D (renderizado 3D)',
      'Ninguno — no hago trabajo creativo',
    ],
    multiple: true,
  },
  {
    // [5] estética: 0=negro/RGB, 1=blanco, 2=indiferente
    q: '¿Qué estética prefieres para tu setup?',
    opts: [
      'Negro / RGB (estilo gamer clásico)',
      'Blanco premium (clean y elegante)',
      'Me da igual, priorizo el rendimiento',
    ],
  },
  {
    // [6] valor: 0=máxRendimiento, 1=moderno/actualizable, 2=calidadPrecio, 3=precioMínim
    q: '¿Qué es lo más importante en tu nuevo equipo?',
    opts: [
      'El máximo rendimiento para mi presupuesto',
      'Plataforma moderna y actualizable (AM5 / DDR5)',
      'La mejor relación calidad-precio',
      'El precio más bajo posible',
    ],
  },
  {
    // [7] intensidad: 0=casual, 1=regular, 2=intensivo, 3=profesional
    q: '¿Con qué intensidad planeas usar el equipo?',
    opts: [
      'Casual (pocas horas, tareas básicas)',
      'Regular (varias horas al día, gaming y trabajo)',
      'Intensivo (muchas horas de gaming AAA o trabajo pesado)',
      'Profesional (dependo del PC para mi trabajo o negocio)',
    ],
  },
];
