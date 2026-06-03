/**
 * Constantes de datos estáticos
 * Todos los datos de productos, características, periféricos y marcas
 */

export interface Feature {
  icon: string;
  text: string;
}

export interface Product {
  badge: string | null;
  category: string;
  name: string;
  specs: string;
  price: string;
  url: string;
}

export interface Peripheral {
  icon: string;
  name: string;
  desc: string;
}

// Características principales de Nuevo Wevo
export const FEATURES: Feature[] = [
  {
    icon: '⚡',
    text: 'Envío exprés en Colombia',
  },
  {
    icon: '💬',
    text: 'Asesoría rápida por WhatsApp',
  },
  {
    icon: '🔐',
    text: 'Compra segura y confiable',
  },
  {
    icon: '🛠️',
    text: 'Montaje y soporte incluidos',
  },
];

// Productos destacados del catálogo
export const PRODUCTS: Product[] = [
  {
    badge: 'TOP',
    category: 'Gaming',
    name: 'Torre Wevo Pochado',
    specs: 'Ryzen 5 7600X · RTX 5060 Ti · 16GB · 1TB SSD',
    price: '$ 8.599.990',
    url: 'https://nuevowevo.com/producto/torre-wevo-pochado-amd-ryzen-5-7600x-rtx-5060ti/',
  },
  {
    badge: 'Nuevo',
    category: 'Estilo',
    name: 'Torre Clara de Wevo',
    specs: 'Ryzen 7 5700X · RTX 5060 · 1TB SSD',
    price: '$ 6.099.990',
    url: 'https://nuevowevo.com/producto/torre-clara-de-wevo-amd-ryzen-7-5700x-rtx-5060-blanca/',
  },
  {
    badge: null,
    category: 'Potencia',
    name: 'Torre Wevo Revuelto',
    specs: 'Ryzen 7 5700X · RTX 5060 Ti · 16GB · 1TB SSD',
    price: '$ 7.399.990',
    url: 'https://nuevowevo.com/producto/torre-wevo-revuelto-amd-ryzen-7-5700x-rtx-5060ti/',
  },
  {
    badge: 'Oferta',
    category: 'Ahorro',
    name: 'Torre Wevo Frito',
    specs: 'Ryzen 7 5700X · RX 9060 XT · 16GB · 512GB SSD',
    price: '$ 4.849.990',
    url: 'https://nuevowevo.com/producto/torre-wevo-frito-amd-ryzen-7-5700x-radeon-9060xt/',
  },
];

// Periféricos recomendados
export const PERIPHERALS: Peripheral[] = [
  {
    icon: '🖱️',
    name: 'Mouse gaming',
    desc: 'Precisión avanzada y máximo control.',
  },
  {
    icon: '⌨️',
    name: 'Teclados mecánicos',
    desc: 'Switches táctiles y diseño sobrio.',
  },
  {
    icon: '🎧',
    name: 'Audífonos',
    desc: 'Sonido envolvente para juego y stream.',
  },
  {
    icon: '🎤',
    name: 'Micrófonos',
    desc: 'Voz clara y profesional para todo uso.',
  },
  {
    icon: '🖥️',
    name: 'Monitores',
    desc: 'Alta tasa de refresco y colores nítidos.',
  },
  {
    icon: '📷',
    name: 'Cámaras',
    desc: 'Imagen limpia para videollamadas y streams.',
  },
];

// Marcas aliadas
export const BRANDS = ['COUGAR', 'KINGSTON', 'MSI', 'LOGITECH', 'AMD', 'INTEL', 'NVIDIA'];

// Preguntas del quiz (Encuentre tu PC)
export interface QuizQuestion {
  q: string;
  opts: string[];
  multiple?: boolean;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: '¿Para qué vas a usar tu PC principalmente?',
    opts: ['Gaming intenso', 'Diseño/edición', 'Trabajo y estudio', 'Uso casual'],
  },
  {
    q: '¿Cuál es tu presupuesto?',
    opts: ['Hasta $4.5M', '$4.5M–$6M', '$6M–$8M', 'Más de $8M'],
  },
  {
    q: '¿Qué experiencia tienes con los PC?',
    opts: ['Principiante', 'Intermedio', 'Avanzado'],
  },
  {
    q: '¿Qué valoras más?',
    opts: ['Rendimiento', 'Estilo', 'Silencio', 'Precio'],
  },
  {
    q: '¿Ya tienes monitor o necesitas uno?',
    opts: ['Ya tengo', 'Necesito uno'],
  },
  {
    q: '¿Qué juegos quieres jugar?',
    opts: ['Valorant', 'League of Legends', 'Fortnite', 'Cyberpunk 2077', 'CoD Warzone', 'GTA V', 'No quiero jugar'],
    multiple: true,
  },
  {
    q: '¿En qué resolución quieres jugar?',
    opts: ['1080p', '1440p', '4K'],
    multiple: true,
  },
];
