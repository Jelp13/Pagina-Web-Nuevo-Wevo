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
  performance: 'Excelente' | 'Muy bueno' | 'Bueno' | 'Básico';
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
  fullSpecs: ProductSpec[];
  gamingPerformance: GamingPerf[];
  creativePerformance: CreativePerf[];
  features: ProductFeature[];
  images: string[];
  price: string;
  numericPrice: number;
  originalPrice?: number;
  url: string;
}

export interface Peripheral {
  icon: string;
  name: string;
  desc: string;
}

// Características principales de Nuevo Wevo
export const FEATURES: Feature[] = [
  { icon: '⚡', text: 'Envío exprés en Colombia' },
  { icon: '💬', text: 'Asesoría rápida por WhatsApp' },
  { icon: '🔐', text: 'Compra segura y confiable' },
  { icon: '🛠️', text: 'Montaje y soporte incluidos' },
];

// Productos destacados del catálogo
export const PRODUCTS: Product[] = [
  {
    id: 'torre-wevo-pochado',
    badge: 'TOP',
    category: 'Gaming',
    name: 'Torre Wevo Pochado',
    specs: 'Ryzen 5 7600X · RTX 5060 Ti · 16GB · 1TB SSD',
    description: 'La torre más potente de la línea Wevo. Diseñada para gaming AAA en alta resolución, edición de video 4K y transmisiones en vivo sin compromisos. El AMD Ryzen 5 7600X con arquitectura Zen 4 combinado con la NVIDIA RTX 5060 Ti entrega frames brutales en cualquier título moderno, mientras la memoria DDR5 garantiza multitarea sin cuellos de botella.',
    fullSpecs: [
      { label: 'Procesador', value: 'AMD Ryzen 5 7600X (6C/12T, hasta 5.3 GHz)' },
      { label: 'Tarjeta gráfica', value: 'NVIDIA GeForce RTX 5060 Ti 8GB GDDR7' },
      { label: 'Memoria RAM', value: '16GB DDR5 5200MHz' },
      { label: 'Almacenamiento', value: '1TB NVMe SSD Gen4 (7,000 MB/s)' },
      { label: 'Placa base', value: 'B650M · Socket AM5' },
      { label: 'Fuente de poder', value: '750W 80+ Gold Certificada' },
      { label: 'Refrigeración', value: 'Cooler de torre 120mm PWM' },
      { label: 'Chasis', value: 'Torre Mid-Tower ATX con panel lateral' },
      { label: 'Sistema operativo', value: 'Windows 11 Home (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant', fps: '400+', resolution: '1080p', quality: 'Ultra' },
      { game: 'Fortnite', fps: '240+', resolution: '1440p', quality: 'Épico' },
      { game: 'CS2', fps: '300+', resolution: '1080p', quality: 'Alto' },
      { game: 'GTA V', fps: '120+', resolution: '4K', quality: 'Ultra' },
      { game: 'Apex Legends', fps: '200+', resolution: '1440p', quality: 'Alto' },
      { game: 'League of Legends', fps: '400+', resolution: '1080p', quality: 'Ultra' },
      { game: 'Warzone', fps: '120+', resolution: '1440p', quality: 'Alto' },
      { game: 'Cyberpunk 2077', fps: '80+', resolution: '1440p', quality: 'Ultra' },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop', performance: 'Excelente', detail: 'Archivos pesados sin lag' },
      { software: 'Adobe Illustrator', performance: 'Excelente', detail: 'Vectores complejos fluidos' },
      { software: 'Adobe Premiere Pro', performance: 'Excelente', detail: 'Edición 4K en tiempo real' },
      { software: 'After Effects', performance: 'Muy bueno', detail: 'Renders rápidos con CUDA' },
      { software: 'DaVinci Resolve', performance: 'Excelente', detail: 'Color grading 4K fluido' },
      { software: 'Blender', performance: 'Muy bueno', detail: 'Renders GPU acelerados' },
      { software: 'CapCut', performance: 'Excelente', detail: 'Exportación ultrarrápida' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming AAA' },
      { icon: '📡', label: 'Streaming profesional' },
      { icon: '🎬', label: 'Edición de video 4K' },
      { icon: '🎨', label: 'Diseño gráfico' },
      { icon: '🧊', label: 'Renderizado 3D' },
      { icon: '⚡', label: 'Multitarea pesada' },
    ],
    images: ['/Imagenes/productos/set-up-completo.jpg'],
    price: '$ 8.599.990',
    numericPrice: 8599990,
    url: 'https://nuevowevo.com/producto/torre-wevo-pochado-amd-ryzen-5-7600x-rtx-5060ti/',
  },
  {
    id: 'torre-clara-de-wevo',
    badge: 'Nuevo',
    category: 'Estilo',
    name: 'Torre Clara de Wevo',
    specs: 'Ryzen 7 5700X · RTX 5060 · 1TB SSD',
    description: 'Elegancia minimalista en un case blanco impecable. La Torre Clara combina potencia real con un diseño sofisticado para quienes quieren rendimiento premium sin renunciar a la estética. El AMD Ryzen 7 5700X de 8 núcleos y la RTX 5060 garantizan gaming fluido y creatividad sin límites, todo en un chasis que destaca en cualquier espacio.',
    fullSpecs: [
      { label: 'Procesador', value: 'AMD Ryzen 7 5700X (8C/16T, hasta 4.6 GHz)' },
      { label: 'Tarjeta gráfica', value: 'NVIDIA GeForce RTX 5060 8GB GDDR7' },
      { label: 'Memoria RAM', value: '16GB DDR4 3200MHz' },
      { label: 'Almacenamiento', value: '1TB NVMe SSD Gen3 (3,500 MB/s)' },
      { label: 'Placa base', value: 'B550M · Socket AM4' },
      { label: 'Fuente de poder', value: '650W 80+ Bronze Certificada' },
      { label: 'Refrigeración', value: 'Cooler de torre 120mm silencioso' },
      { label: 'Chasis', value: 'Case Blanco Mid-Tower con panel de vidrio templado' },
      { label: 'Sistema operativo', value: 'Windows 11 Home (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant', fps: '350+', resolution: '1080p', quality: 'Ultra' },
      { game: 'Fortnite', fps: '200+', resolution: '1440p', quality: 'Alto' },
      { game: 'CS2', fps: '250+', resolution: '1080p', quality: 'Alto' },
      { game: 'GTA V', fps: '100+', resolution: '1440p', quality: 'Ultra' },
      { game: 'Apex Legends', fps: '180+', resolution: '1440p', quality: 'Alto' },
      { game: 'League of Legends', fps: '400+', resolution: '1080p', quality: 'Ultra' },
      { game: 'Warzone', fps: '100+', resolution: '1080p', quality: 'Alto' },
      { game: 'Cyberpunk 2077', fps: '60+', resolution: '1080p', quality: 'Ultra' },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop', performance: 'Excelente', detail: 'Fluido con archivos grandes' },
      { software: 'Adobe Illustrator', performance: 'Excelente', detail: 'Sin caídas en proyectos complejos' },
      { software: 'Adobe Premiere Pro', performance: 'Muy bueno', detail: 'Edición 1080p/1440p en tiempo real' },
      { software: 'After Effects', performance: 'Bueno', detail: 'Renders moderados con GPU' },
      { software: 'DaVinci Resolve', performance: 'Muy bueno', detail: 'Color grading 1440p fluido' },
      { software: 'Blender', performance: 'Bueno', detail: 'Escenas medianas sin problema' },
      { software: 'CapCut', performance: 'Excelente', detail: 'Exportación rápida en alta calidad' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming 1440p' },
      { icon: '🤍', label: 'Diseño minimalista' },
      { icon: '🎨', label: 'Diseño gráfico' },
      { icon: '🎬', label: 'Edición de video' },
      { icon: '📡', label: 'Streaming' },
      { icon: '⚡', label: 'Multitarea' },
    ],
    images: ['/Imagenes/productos/set-up-pagina-principal.jpg'],
    price: '$ 6.099.990',
    numericPrice: 6099990,
    url: 'https://nuevowevo.com/producto/torre-clara-de-wevo-amd-ryzen-7-5700x-rtx-5060-blanca/',
  },
  {
    id: 'torre-wevo-revuelto',
    badge: null,
    category: 'Potencia',
    name: 'Torre Wevo Revuelto',
    specs: 'Ryzen 7 5700X · RTX 5060 Ti · 16GB · 1TB SSD',
    description: 'El equilibrio perfecto para el gamer que quiere más sin pagar lo máximo. Con el AMD Ryzen 7 5700X de 8 núcleos y la RTX 5060 Ti, esta torre maneja gaming fluido en 1440p, multitarea pesada y creación de contenido sin sacrificar nada. La opción más inteligente del catálogo.',
    fullSpecs: [
      { label: 'Procesador', value: 'AMD Ryzen 7 5700X (8C/16T, hasta 4.6 GHz)' },
      { label: 'Tarjeta gráfica', value: 'NVIDIA GeForce RTX 5060 Ti 8GB GDDR7' },
      { label: 'Memoria RAM', value: '16GB DDR4 3200MHz' },
      { label: 'Almacenamiento', value: '1TB NVMe SSD Gen3 (3,500 MB/s)' },
      { label: 'Placa base', value: 'B550M · Socket AM4' },
      { label: 'Fuente de poder', value: '750W 80+ Gold Certificada' },
      { label: 'Refrigeración', value: 'Cooler de torre dual 120mm' },
      { label: 'Chasis', value: 'Mid-Tower ATX con flujo de aire optimizado' },
      { label: 'Sistema operativo', value: 'Windows 11 Home (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant', fps: '400+', resolution: '1080p', quality: 'Ultra' },
      { game: 'Fortnite', fps: '240+', resolution: '1440p', quality: 'Épico' },
      { game: 'CS2', fps: '280+', resolution: '1440p', quality: 'Alto' },
      { game: 'GTA V', fps: '120+', resolution: '1440p', quality: 'Ultra' },
      { game: 'Apex Legends', fps: '200+', resolution: '1440p', quality: 'Alto' },
      { game: 'League of Legends', fps: '400+', resolution: '1440p', quality: 'Ultra' },
      { game: 'Warzone', fps: '120+', resolution: '1440p', quality: 'Alto' },
      { game: 'Cyberpunk 2077', fps: '75+', resolution: '1440p', quality: 'Alto' },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop', performance: 'Excelente', detail: 'Fluido con archivos muy pesados' },
      { software: 'Adobe Illustrator', performance: 'Excelente', detail: 'Vectores complejos sin caída' },
      { software: 'Adobe Premiere Pro', performance: 'Excelente', detail: 'Edición 4K fluida' },
      { software: 'After Effects', performance: 'Muy bueno', detail: 'Compositing avanzado con GPU' },
      { software: 'DaVinci Resolve', performance: 'Excelente', detail: 'Color grading 4K profesional' },
      { software: 'Blender', performance: 'Muy bueno', detail: 'Renders GPU potentes' },
      { software: 'CapCut', performance: 'Excelente', detail: 'Exportación ultrarrápida' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming 1440p/4K' },
      { icon: '📡', label: 'Streaming profesional' },
      { icon: '🎬', label: 'Edición de video 4K' },
      { icon: '🎨', label: 'Diseño gráfico' },
      { icon: '🧊', label: 'Renderizado 3D' },
      { icon: '⚡', label: 'Multitarea pesada' },
    ],
    images: [],
    price: '$ 7.399.990',
    numericPrice: 7399990,
    url: 'https://nuevowevo.com/producto/torre-wevo-revuelto-amd-ryzen-7-5700x-rtx-5060ti/',
  },
  {
    id: 'torre-wevo-frito',
    badge: 'Oferta',
    category: 'Ahorro',
    name: 'Torre Wevo Frito',
    specs: 'Ryzen 7 5700X · RX 9060 XT · 16GB · 512GB SSD',
    description: 'La puerta de entrada al gaming competitivo. Accesible pero potente: capaz de correr los títulos de esports más exigentes con fluidez total. El AMD Ryzen 7 5700X de 8 núcleos y la Radeon RX 9060 XT entregan frames competitivos en Valorant, CS2 y League of Legends sin gastar de más.',
    fullSpecs: [
      { label: 'Procesador', value: 'AMD Ryzen 7 5700X (8C/16T, hasta 4.6 GHz)' },
      { label: 'Tarjeta gráfica', value: 'AMD Radeon RX 9060 XT 8GB GDDR6' },
      { label: 'Memoria RAM', value: '16GB DDR4 3200MHz' },
      { label: 'Almacenamiento', value: '512GB NVMe SSD Gen3' },
      { label: 'Placa base', value: 'B550M · Socket AM4' },
      { label: 'Fuente de poder', value: '650W 80+ Bronze Certificada' },
      { label: 'Refrigeración', value: 'Cooler de torre 92mm silencioso' },
      { label: 'Chasis', value: 'Mid-Tower compacto con ventilación lateral' },
      { label: 'Sistema operativo', value: 'Windows 11 Home (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant', fps: '300+', resolution: '1080p', quality: 'Alto' },
      { game: 'Fortnite', fps: '144+', resolution: '1080p', quality: 'Alto' },
      { game: 'CS2', fps: '200+', resolution: '1080p', quality: 'Alto' },
      { game: 'GTA V', fps: '80+', resolution: '1080p', quality: 'Alto' },
      { game: 'Apex Legends', fps: '144+', resolution: '1080p', quality: 'Alto' },
      { game: 'League of Legends', fps: '400+', resolution: '1080p', quality: 'Ultra' },
      { game: 'Warzone', fps: '80+', resolution: '1080p', quality: 'Medio' },
      { game: 'Cyberpunk 2077', fps: '45+', resolution: '1080p', quality: 'Medio' },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop', performance: 'Muy bueno', detail: 'Archivos medianos sin problema' },
      { software: 'Adobe Illustrator', performance: 'Muy bueno', detail: 'Proyectos estándar fluidos' },
      { software: 'Adobe Premiere Pro', performance: 'Bueno', detail: 'Edición 1080p en tiempo real' },
      { software: 'After Effects', performance: 'Básico', detail: 'Compositing simple recomendado' },
      { software: 'DaVinci Resolve', performance: 'Bueno', detail: 'Edición 1080p fluida' },
      { software: 'Blender', performance: 'Básico', detail: 'Escenas simples y medianas' },
      { software: 'CapCut', performance: 'Muy bueno', detail: 'Exportación rápida en 1080p' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming esports' },
      { icon: '💰', label: 'Mejor precio-rendimiento' },
      { icon: '📡', label: 'Streaming básico' },
      { icon: '🎨', label: 'Diseño gráfico básico' },
      { icon: '📚', label: 'Trabajo y estudio' },
      { icon: '⚡', label: 'Multitarea' },
    ],
    images: [],
    price: '$ 4.849.990',
    numericPrice: 4849990,
    originalPrice: 5499990,
    url: 'https://nuevowevo.com/producto/torre-wevo-frito-amd-ryzen-7-5700x-radeon-9060xt/',
  },
  {
    id: 'torre-broce',
    badge: null,
    category: 'Gaming',
    name: 'Torre Broce',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-cosido',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Cosido',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-con-jamon',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Con Jamón',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-de-codorniz',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo de Codorniz',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-extra',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Extra',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-perico',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Perico',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-ranchero',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Ranchero',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-tibio',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Tibio',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
  {
    id: 'torre-wevo-tortilla',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Tortilla',
    specs: '',
    description: '',
    fullSpecs: [],
    gamingPerformance: [],
    creativePerformance: [],
    features: [],
    images: [],
    price: 'Por definir',
    numericPrice: 0,
    url: '#',
  },
];

/**
 * ─── TORRES DESTACADAS ────────────────────────────────────────────────────────
 * Cambia los 4 IDs de abajo para actualizar qué torres aparecen en:
 *   · "Torres recomendadas" (sección Tu PC / Quiz)
 *   · "También te puede interesar" (página de detalle de cada torre)
 *
 * Los IDs disponibles son los `id` de cada producto en el array PRODUCTS.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const FEATURED_IDS: string[] = [
  'torre-wevo-pochado',
  'torre-clara-de-wevo',
  'torre-wevo-revuelto',
  'torre-wevo-frito',
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) =>
  FEATURED_IDS.includes(p.id),
);

// Periféricos recomendados
export const PERIPHERALS: Peripheral[] = [
  { icon: '🖱️', name: 'Mouse gaming', desc: 'Precisión avanzada y máximo control.' },
  { icon: '⌨️', name: 'Teclados mecánicos', desc: 'Switches táctiles y diseño sobrio.' },
  { icon: '🎧', name: 'Audífonos', desc: 'Sonido envolvente para juego y stream.' },
  { icon: '🎤', name: 'Micrófonos', desc: 'Voz clara y profesional para todo uso.' },
  { icon: '🖥️', name: 'Monitores', desc: 'Alta tasa de refresco y colores nítidos.' },
  { icon: '📷', name: 'Cámaras', desc: 'Imagen limpia para videollamadas y streams.' },
];

// Marcas aliadas
export const BRANDS = ['COUGAR', 'KINGSTON', 'MSI', 'LOGITECH'];

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
