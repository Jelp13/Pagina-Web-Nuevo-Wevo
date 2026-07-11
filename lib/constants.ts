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
    specs: 'Ryzen 5 7600X · RTX 5060 Ti 8GB · 32GB DDR5 · 500GB SSD',
    shortDescription: 'Computador gaming AM5 con procesador AMD Ryzen 5 7600X de 6 núcleos a 4.7GHz, tarjeta gráfica RTX 5060 Ti 8GB, 32GB RAM DDR5 5200MHz y SSD NVMe 500GB. Plataforma moderna de alta frecuencia para gaming en 1440p. Incluye Windows 11.',
    description: 'La Torre Wevo Pochado representa la combinación perfecta entre plataforma AM5 de última generación y rendimiento gráfico RTX premium. Equipada con el procesador AMD Ryzen 5 7600X de 6 núcleos a 4.7GHz y la potente tarjeta gráfica GeForce RTX 5060 Ti de 8GB, esta torre ofrece una experiencia de gaming excepcional en 1440p y rendimiento sólido en 4K.\n\nCon 32GB de memoria RAM DDR5 (2x16GB) a 5200MHz, la Torre Wevo Pochado aprovecha la velocidad extrema de la memoria de última generación para ofrecer multitarea sin precedentes, edición de video fluida en alta resolución y un rendimiento global superior. Su SSD NVMe de 500GB garantiza arranques instantáneos y cargas ultrarrápidas.\n\nLa placa base B650M con WiFi integrado ofrece una plataforma AM5 moderna con todas las características de conectividad actuales, incluyendo PCIe 4.0 y soporte para futuras actualizaciones de procesador. La fuente de poder de 750W con certificación 80 Plus Bronce proporciona energía estable y eficiente.\n\nEl sistema de refrigeración líquida Cougar Poseidón Elite ARGB de 240mm mantiene el procesador en temperaturas ideales, y el chasis Cougar FV150 con vidrio templado y 4 ventiladores ARGB completa un conjunto visual impresionante. Con Windows 11 preinstalado, la Torre Wevo Pochado es la opción ideal para quienes buscan tecnología DDR5, plataforma AM5 y gráficos RTX 5060 Ti en un solo equipo de alto rendimiento.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 5 7600X (6C/12T, hasta 5.3 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 5060 Ti 8GB' },
      { label: 'Placa base',        value: 'B650M WiFi · Socket AM5' },
      { label: 'Memoria RAM',       value: '32GB DDR5 5200MHz (2×16GB Dual Channel)' },
      { label: 'Almacenamiento',    value: '500GB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '750W 80 Plus Bronze' },
      { label: 'Refrigeración',     value: 'Cougar Poseidón Elite ARGB 240mm (líquida)' },
      { label: 'Chasis',            value: 'Cougar FV150 · Vidrio templado · 4 ventiladores ARGB' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '330–500',  resolution: '1440p', quality: 'Ultra'              },
      { game: 'Fortnite',             fps: '160–240',  resolution: '1440p', quality: 'Épica'              },
      { game: 'League of Legends',    fps: '400–600+', resolution: '1440p', quality: 'Ultra'              },
      { game: 'CS2',                  fps: '240–360',  resolution: '1440p', quality: 'Ultra'              },
      { game: 'Cyberpunk 2077',       fps: '80–120',   resolution: '1440p', quality: 'Ultra + Ray Tracing'},
      { game: 'GTA V',                fps: '175–260',  resolution: '1440p', quality: 'Ultra'              },
      { game: 'Apex Legends',         fps: '175–250',  resolution: '1440p', quality: 'Ultra'              },
      { game: 'Call of Duty Warzone', fps: '155–220',  resolution: '1440p', quality: 'Ultra'              },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Excelente', detail: 'Sin limitaciones, respuesta instantánea' },
      { software: 'Illustrator',     performance: 'Excelente', detail: 'Sin limitaciones' },
      { software: 'Premiere Pro',    performance: 'Excelente', detail: 'Edición 4K/6K muy fluida, ancho de banda DDR5 notable' },
      { software: 'DaVinci Resolve', performance: 'Excelente', detail: 'Edición 4K y color grading profesional muy fluido' },
      { software: 'After Effects',   performance: 'Muy bueno', detail: 'Composiciones complejas con renders rápidos' },
      { software: 'Blender',         performance: 'Muy bueno', detail: 'Renders 3D complejos en tiempos cortos' },
      { software: 'Cinema 4D',       performance: 'Muy bueno', detail: 'Flujo de trabajo 3D profesional fluido' },
      { software: 'Canva / CapCut',  performance: 'Fluido',    detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming Ultra 1440p' },
      { icon: '🔴', label: 'Ryzen 5 7600X AM5' },
      { icon: '🟢', label: 'RTX 5060 Ti 8GB' },
      { icon: '❄️', label: 'Liquid cooling 240mm' },
      { icon: '⚡', label: '32GB DDR5 Dual Channel' },
      { icon: '🌐', label: 'WiFi integrado' },
    ],
    images: ['/Imagenes/productos/set-up-completo.jpg'],
    price: '$ 8.299.990',
    numericPrice: 8299990,
    url: 'https://nuevowevo.com/producto/torre-wevo-pochado-amd-ryzen-5-7600x-rtx-5060ti/',
  },
  {
    id: 'torre-clara-de-wevo',
    badge: 'Nuevo',
    category: 'Gaming',
    name: 'Torre Clara de Wevo',
    specs: 'Ryzen 7 5700X · RTX 5060 8GB Blanca · 16GB DDR4 · 500GB SSD',
    shortDescription: 'Computador gaming en diseño blanco premium con procesador AMD Ryzen 7 5700X, tarjeta gráfica RTX 5060 8GB edición blanca, 16GB RAM DDR4 y chasis XPG Starker Air BTF blanco. Setup gamer blanco de alto rendimiento. Incluye Windows 11.',
    description: 'La Torre Clara de Wevo es la versión blanca y premium de nuestra línea gaming, diseñada para quienes buscan un setup gamer elegante y moderno en color blanco. Equipada con el potente procesador AMD Ryzen 7 5700X de 8 núcleos y la exclusiva tarjeta gráfica GeForce RTX 5060 de 8GB en versión blanca, esta torre ofrece rendimiento excepcional con una estética impecable.\n\nCon 16GB de memoria RAM DDR4 RGB a 3200MHz y un SSD NVMe de 500GB, la Torre Clara de Wevo proporciona velocidad y capacidad para gaming en 1080p/1440p, edición de video y productividad avanzada. La placa base B550M con WiFi integrado asegura conectividad moderna y estabilidad total.\n\nLa fuente de poder de 650W con certificación 80 Plus Bronce ofrece eficiencia energética confiable. El sistema de refrigeración líquida Cougar Poseidón Elite ARGB de 240mm en color blanco mantiene temperaturas óptimas con una estética que complementa perfectamente el diseño del equipo.\n\nTodo esto viene presentado en el espectacular chasis XPG Starker Air BTF con vidrio templado y 4 ventiladores ARGB en color blanco, creando un setup visual impresionante. Con Windows 11 incluido, la Torre Clara de Wevo es perfecta para quienes desean un PC gamer blanco de alto rendimiento con estética premium.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 7 5700X (8C/16T, hasta 4.6 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 5060 8GB (Edición Blanca)' },
      { label: 'Placa base',        value: 'B550M-A WiFi · Socket AM4' },
      { label: 'Memoria RAM',       value: '16GB DDR4 3200MHz' },
      { label: 'Almacenamiento',    value: '500GB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '650W 80 Plus Bronze' },
      { label: 'Refrigeración',     value: 'Cougar Poseidón Elite ARGB 240mm Blanca (líquida)' },
      { label: 'Chasis',            value: 'XPG Starker Air BTF · Vidrio templado · 4 ventiladores ARGB Blanco' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '280–420',  resolution: '1080p / 1440p', quality: 'Ultra'          },
      { game: 'Fortnite',             fps: '140–200',  resolution: '1080p',         quality: 'Épica'          },
      { game: 'League of Legends',    fps: '340–500+', resolution: '1080p / 1440p', quality: 'Ultra'          },
      { game: 'CS2',                  fps: '200–300',  resolution: '1080p / 1440p', quality: 'Ultra'          },
      { game: 'Cyberpunk 2077',       fps: '65–95',    resolution: '1080p',         quality: 'Ultra + RT básico' },
      { game: 'GTA V',                fps: '150–220',  resolution: '1080p',         quality: 'Ultra'          },
      { game: 'Apex Legends',         fps: '150–210',  resolution: '1080p',         quality: 'Ultra'          },
      { game: 'Call of Duty Warzone', fps: '130–180',  resolution: '1080p',         quality: 'Ultra'          },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Excelente', detail: 'Archivos muy grandes, filtros complejos y 3D fluidos' },
      { software: 'Illustrator',     performance: 'Excelente', detail: 'Proyectos complejos sin ninguna limitación' },
      { software: 'Premiere Pro',    performance: 'Muy bueno', detail: 'Edición 4K fluida, multicámara sin problema' },
      { software: 'DaVinci Resolve', performance: 'Muy bueno', detail: 'Edición 4K y corrección de color profesional fluida' },
      { software: 'After Effects',   performance: 'Bueno',     detail: 'Composiciones complejas con renders razonables' },
      { software: 'Blender',         performance: 'Bueno',     detail: 'Renders 3D medianos fluidos, escenas complejas aceptables' },
      { software: 'Canva / CapCut',  performance: 'Fluido',    detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🤍', label: 'Setup blanco premium' },
      { icon: '🎮', label: 'Gaming 1080p / 1440p' },
      { icon: '🟢', label: 'RTX 5060 8GB Blanca' },
      { icon: '❄️', label: 'Liquid cooling 240mm Blanca' },
      { icon: '🌐', label: 'WiFi integrado' },
      { icon: '🎬', label: 'Edición 4K fluida' },
    ],
    images: ['/Imagenes/productos/set-up-pagina-principal2.jpeg'],
    price: '$ 5.999.990',
    numericPrice: 5999990,
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
    images: ['/Imagenes/productos/torre-wevo-revuelto.jpeg'],
    price: '$ 7.399.990',
    numericPrice: 7399990,
    url: 'https://nuevowevo.com/producto/torre-wevo-revuelto-amd-ryzen-7-5700x-rtx-5060ti/',
  },
  {
    id: 'torre-broce',
    badge: null,
    category: 'Productividad',
    name: 'Torre Bronce',
    specs: 'Ryzen 5 5600GT · Gráficos integrados · 16GB · 512GB SSD',
    shortDescription: 'PC de escritorio para trabajo, estudio y entretenimiento con procesador AMD Ryzen 5 5600GT con gráficos integrados Radeon, 16GB RAM DDR4, SSD NVMe 512GB y WiFi integrado. Incluye Windows 11 Pro.',
    description: 'La Torre Bronce Power es una computadora de escritorio de alto rendimiento diseñada para ofrecer velocidad, estabilidad y eficiencia en trabajo, estudio y entretenimiento. Gracias a su potente procesador AMD Ryzen 5 5600GT, esta PC permite ejecutar múltiples aplicaciones, herramientas profesionales y tareas exigentes con gran fluidez.\n\nEquipada con 16GB de memoria RAM DDR4 a 3200MHz, la Torre Bronce Power proporciona un rendimiento rápido para multitarea, navegación avanzada y aplicaciones modernas. Su SSD NVMe de 512GB garantiza arranques ultrarrápidos, carga veloz de programas y transferencia de datos de alta velocidad.\n\nLa placa base A520M-Plus WiFi ofrece gran estabilidad y conectividad moderna con WiFi integrado, facilitando la conexión a internet sin necesidad de adaptadores adicionales. Además, el equipo incorpora una fuente de poder de 600W con certificación 80 Plus Bronze, asegurando eficiencia energética y un suministro estable para todos los componentes.\n\nUna excelente opción para quienes buscan una PC rápida, confiable y preparada para las exigencias del trabajo moderno y el entretenimiento digital.',
    fullSpecs: [
      { label: 'Procesador',       value: 'AMD Ryzen 5 5600GT (6C/12T, hasta 4.6 GHz)' },
      { label: 'Gráficos',         value: 'AMD Radeon Graphics integrados (Ryzen 5 5600GT)' },
      { label: 'Memoria RAM',      value: '16GB DDR4 3200MHz' },
      { label: 'Almacenamiento',   value: '512GB NVMe SSD M.2' },
      { label: 'Placa base',       value: 'A520M-A · Socket AM4' },
      { label: 'Fuente de poder',  value: '600W 80+ Bronze Certificada' },
      { label: 'Chasis',           value: 'CAJA ATX Power Group X18' },
      { label: 'Sistema operativo',value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',           fps: '80–120',        resolution: '1080p', quality: 'Medio' },
      { game: 'Fortnite',           fps: '30–50',         resolution: '1080p', quality: 'Bajo'  },
      { game: 'League of Legends',  fps: '80–120',        resolution: '1080p', quality: 'Medio' },
      { game: 'CS2',                fps: '50–80',         resolution: '1080p', quality: 'Bajo'  },
      { game: 'Cyberpunk 2077',     fps: 'No recomendado',resolution: '—',     quality: '—'     },
      { game: 'GTA V',              fps: '40–60',         resolution: '1080p', quality: 'Bajo'  },
      { game: 'Apex Legends',       fps: '40–70',         resolution: '1080p', quality: 'Bajo'  },
      { game: 'Call of Duty Warzone',fps:'No recomendado',resolution: '—',     quality: '—'     },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Básico',         detail: 'Operaciones simples, archivos livianos' },
      { software: 'Illustrator',     performance: 'Básico',         detail: 'Archivos vectoriales sencillos' },
      { software: 'Premiere Pro',    performance: 'Limitado',       detail: 'Video 720p/1080p simple, sin efectos pesados' },
      { software: 'DaVinci Resolve', performance: 'Limitado',       detail: 'Edición 1080p básica, sin corrección de color avanzada' },
      { software: 'After Effects',   performance: 'No recomendado', detail: 'Composiciones muy lentas' },
      { software: 'Blender',         performance: 'No recomendado', detail: 'Renders extremadamente lentos' },
      { software: 'Canva / CapCut',  performance: 'Fluido',         detail: 'Uso web y edición casual sin problema' },
    ],
    features: [
      { icon: '💼', label: 'Trabajo y oficina' },
      { icon: '📚', label: 'Estudio y educación' },
      { icon: '🌐', label: 'WiFi integrado' },
      { icon: '⚡', label: 'Multitarea fluida' },
      { icon: '🎮', label: 'Gaming casual' },
      { icon: '🔒', label: 'Windows 11 Pro' },
    ],
    images: ['/Imagenes/productos/torre-broce.jpeg'],
    price: '$ 2.849.990',
    numericPrice: 2849990,
    url: '#',
  },
  {
    id: 'torre-wevo-cosido',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Cosido',
    specs: 'Core i5-12400F · RTX 3050 6GB · 16GB DDR5 · 500GB SSD',
    shortDescription: 'Computador gaming con procesador Intel Core i5-12400F de 6 núcleos, tarjeta gráfica RTX 3050 6GB, 16GB RAM DDR5 y SSD NVMe 500GB. Plataforma Intel sólida para gaming en 1080p y productividad. Incluye Windows 11.',
    description: 'La Torre Wevo Cosido es un computador de escritorio con plataforma Intel, diseñado para quienes prefieren la confiabilidad y rendimiento de los procesadores Intel. Equipado con el procesador Intel Core i5-12400F de 6 núcleos y la tarjeta gráfica GeForce RTX 3050 de 6GB, este equipo ofrece una experiencia sólida en gaming en 1080p, edición de video y productividad profesional.\n\nCon 16GB de memoria RAM DDR5 a 5200MHz, la Torre Wevo Cosido aprovecha la velocidad de la última generación de memoria para un rendimiento superior en multitarea y aplicaciones modernas. Su SSD NVMe de 500GB garantiza arranques ultrarrápidos y tiempos de carga mínimos.\n\nLa placa base B760M con WiFi integrado ofrece compatibilidad con procesadores Intel de 12ª, 13ª y 14ª generación, DDR5 y amplia conectividad. La fuente de poder de 650W con certificación 80 Plus Bronze proporciona energía estable y eficiente para todo el sistema.\n\nEl disipador Antec A400i ARGB mantiene las temperaturas bajo control con iluminación RGB espectacular, y el chasis Cougar FV150 con vidrio templado y 4 ventiladores ARGB ofrece un diseño gamer impactante con excelente ventilación. Con Windows 11 preinstalado, la Torre Wevo Cosido es perfecta para quienes buscan potencia Intel con estética gamer premium.',
    fullSpecs: [
      { label: 'Procesador',        value: 'Intel Core i5-12400F (6C/12T, hasta 4.4 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 3050 6GB GDDR6' },
      { label: 'Memoria RAM',       value: '16GB DDR5 5200MHz' },
      { label: 'Almacenamiento',    value: '500GB NVMe SSD M.2' },
      { label: 'Placa base',        value: 'B760M · Socket LGA1700 · WiFi integrado' },
      { label: 'Fuente de poder',   value: '650W 80+ Bronze Certificada' },
      { label: 'Refrigeración',     value: 'Antec A400i ARGB' },
      { label: 'Chasis',            value: 'Cougar FV150 · Vidrio templado · 4 ventiladores ARGB' },
      { label: 'Sistema operativo', value: 'Windows 11 (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',            fps: '200–300',  resolution: '1080p', quality: 'Ultra'      },
      { game: 'Fortnite',            fps: '80–120',   resolution: '1080p', quality: 'Alto'       },
      { game: 'League of Legends',   fps: '200–300+', resolution: '1080p', quality: 'Ultra'      },
      { game: 'CS2',                 fps: '120–180',  resolution: '1080p', quality: 'Alto'       },
      { game: 'Cyberpunk 2077',      fps: '35–55',    resolution: '1080p', quality: 'Medio'      },
      { game: 'GTA V',               fps: '90–130',   resolution: '1080p', quality: 'Alto'       },
      { game: 'Apex Legends',        fps: '90–130',   resolution: '1080p', quality: 'Alto'       },
      { game: 'Call of Duty Warzone',fps: '80–110',   resolution: '1080p', quality: 'Medio–Alto' },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Muy bueno',  detail: 'Archivos grandes y filtros complejos fluidos' },
      { software: 'Illustrator',     performance: 'Muy bueno',  detail: 'Proyectos complejos sin problema' },
      { software: 'Premiere Pro',    performance: 'Bueno',      detail: 'Edición 1080p muy fluida, 4K básico aceptable' },
      { software: 'DaVinci Resolve', performance: 'Bueno',      detail: 'Edición 1080p fluida con corrección de color' },
      { software: 'After Effects',   performance: 'Aceptable',  detail: 'Composiciones medianas con renders moderados' },
      { software: 'Blender',         performance: 'Básico',     detail: 'Renders simples viables, escenas complejas lentas' },
      { software: 'Canva / CapCut',  performance: 'Fluido',     detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming 1080p' },
      { icon: '💡', label: 'ARGB · Cougar FV150' },
      { icon: '🌐', label: 'WiFi integrado' },
      { icon: '⚡', label: 'DDR5 5200MHz' },
      { icon: '🎬', label: 'Edición de video' },
      { icon: '🔵', label: 'Plataforma Intel' },
    ],
    images: ['/Imagenes/productos/torre-wevo-cosido.jpeg'],
    price: '$ 6.199.990',
    numericPrice: 6199990,
    url: '#',
  },
  {
    id: 'torre-wevo-con-jamon',
    badge: null,
    category: 'Productividad',
    name: 'Torre Wevo Con Jamón',
    specs: 'Ryzen 5 8500G · Radeon 740M · 16GB DDR5 · 1TB SSD',
    shortDescription: 'Computador de escritorio con procesador AMD Ryzen 5 8500G (gráficos integrados Radeon 740M), 16GB RAM DDR5 y SSD 1TB M.2 PCIe. Ideal para productividad, multitarea y entretenimiento casual. Incluye Windows 11 Pro.',
    description: 'La Torre Wevo con Jamón es un computador de escritorio de alto rendimiento impulsado por el potente procesador AMD Ryzen 5 8500G a 3.5GHz, una de las últimas generaciones de AMD con gráficos integrados Radeon avanzados. Este equipo está diseñado para quienes buscan productividad, multitarea fluida y entretenimiento sin comprometer el rendimiento.\n\nEquipada con 16GB de memoria RAM DDR5, la Torre Wevo con Jamón ofrece una velocidad de procesamiento superior, ideal para aplicaciones modernas, navegación con múltiples pestañas y software profesional. Su almacenamiento SSD de 1TB M.2 PCIe garantiza arranques ultrarrápidos, cargas inmediatas de programas y amplio espacio para tus archivos, proyectos y multimedia.\n\nLa placa base B840M-B brinda estabilidad, compatibilidad con la plataforma AM5 y opciones de expansión futuras. La fuente de poder Power Group de 600W con certificación 80 Plus Bronce asegura un suministro eléctrico eficiente y confiable para todos los componentes.\n\nCon un chasis ATX Lander 500 Power Group – XPG de diseño moderno con excelente flujo de aire y Windows 11 Pro preinstalado, este computador está listo para trabajar, estudiar y disfrutar desde el primer momento. Ideal para: oficina, productividad, diseño gráfico básico, estudio y entretenimiento.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 5 8500G (6C/12T, hasta 5.0 GHz)' },
      { label: 'Gráficos',          value: 'AMD Radeon 740M (integrada)' },
      { label: 'Placa base',        value: 'MSI PRO B840M-B / ASUS PRIME B650M-F' },
      { label: 'Memoria RAM',       value: '16GB DDR5 3200MHz' },
      { label: 'Almacenamiento',    value: '1TB SSD M.2 NVMe PCIe' },
      { label: 'Fuente de poder',   value: 'Power Group 600W 80 Plus Bronze' },
      { label: 'Chasis',            value: 'Lander 500 Power Group – XPG (ATX)' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '100–150',        resolution: '1080p', quality: 'Medio'      },
      { game: 'Fortnite',             fps: '40–60',          resolution: '1080p', quality: 'Bajo–Medio' },
      { game: 'League of Legends',    fps: '100–150+',       resolution: '1080p', quality: 'Medio'      },
      { game: 'CS2',                  fps: '60–90',          resolution: '1080p', quality: 'Bajo–Medio' },
      { game: 'Cyberpunk 2077',       fps: 'No recomendado', resolution: '—',     quality: '—'          },
      { game: 'GTA V',                fps: '45–70',          resolution: '1080p', quality: 'Bajo'       },
      { game: 'Apex Legends',         fps: '50–80',          resolution: '1080p', quality: 'Bajo'       },
      { game: 'Call of Duty Warzone', fps: 'No recomendado', resolution: '—',     quality: '—'          },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Fluido',          detail: 'Archivos medianos sin problema' },
      { software: 'Illustrator',     performance: 'Fluido',          detail: 'Proyectos vectoriales estándar' },
      { software: 'Premiere Pro',    performance: 'Aceptable',       detail: 'Edición 1080p fluida, 4K muy lento' },
      { software: 'DaVinci Resolve', performance: 'Aceptable',       detail: 'Edición 1080p, corrección básica' },
      { software: 'After Effects',   performance: 'Limitado',        detail: 'Composiciones simples, renders lentos' },
      { software: 'Blender',         performance: 'No recomendado',  detail: 'Renders muy lentos' },
      { software: 'Canva / CapCut',  performance: 'Fluido',          detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '💼', label: 'Productividad' },
      { icon: '🔴', label: 'AMD Ryzen 5 8500G' },
      { icon: '🖥️', label: 'Radeon 740M integrada' },
      { icon: '💾', label: '1TB NVMe SSD' },
      { icon: '⚡', label: 'DDR5' },
      { icon: '🏆', label: 'Windows 11 Pro' },
    ],
    images: ['/Imagenes/productos/torre-wevo-con-jamon.jpeg'],
    price: '$ 3.499.990',
    numericPrice: 3499990,
    url: '#',
  },
  {
    id: 'torre-wevo-de-codorniz',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo de Codorniz',
    specs: 'Ryzen 7 5700X · RTX 5060 8GB · 16GB DDR4 · 500GB SSD',
    shortDescription: 'Computador gaming con procesador AMD Ryzen 7 5700X de 8 núcleos, tarjeta gráfica RTX 5060 8GB, 16GB RAM DDR4 y SSD NVMe 500GB. Rendimiento gaming sólido en 1080p y 1440p con la nueva generación RTX 5060. Incluye Windows 11.',
    description: 'La Torre Wevo de Codorniz es un computador de escritorio gaming de gama media-alta que combina el rendimiento probado del procesador AMD Ryzen 7 5700X de 8 núcleos con la potencia gráfica de la nueva GeForce RTX 5060 de 8GB. Esta combinación ofrece una experiencia excepcional para gaming en 1080p y 1440p, edición de video, renderizado 3D y cualquier flujo de trabajo creativo.\n\nCon 16GB de memoria RAM DDR4 a 3200MHz y un SSD NVMe de 500GB, la Torre Wevo de Codorniz proporciona multitarea ágil y tiempos de carga ultrarrápidos para juegos y aplicaciones profesionales. La placa base B550M con WiFi integrado ofrece conectividad moderna y compatibilidad completa con la plataforma AM4.\n\nLa fuente de poder de 650W con certificación 80 Plus Bronce garantiza eficiencia y estabilidad, mientras que el disipador Maestro Plus 42SA mantiene el procesador a temperaturas óptimas.\n\nPresentada en el impactante chasis Cougar FV150 con vidrio templado y 4 ventiladores ARGB, la Torre Wevo de Codorniz combina estética gamer premium con un flujo de aire excepcional. Con Windows 11 incluido, es la opción ideal para gamers y creadores que buscan rendimiento RTX 5060 con el confiable Ryzen 7 5700X.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 7 5700X (8C/16T, hasta 4.6 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 5060 8GB' },
      { label: 'Placa base',        value: 'B550M-A WiFi · Socket AM4' },
      { label: 'Memoria RAM',       value: '16GB DDR4 3200MHz' },
      { label: 'Almacenamiento',    value: '500GB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '650W 80 Plus Bronze' },
      { label: 'Disipador',         value: 'Maestro Plus 42SA' },
      { label: 'Chasis',            value: 'Cougar FV150 · Vidrio templado · 4 ventiladores ARGB' },
      { label: 'Sistema operativo', value: 'Windows 11 (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '280–420',  resolution: '1080p / 1440p', quality: 'Ultra'          },
      { game: 'Fortnite',             fps: '140–200',  resolution: '1080p',         quality: 'Épica'          },
      { game: 'League of Legends',    fps: '340–500+', resolution: '1080p / 1440p', quality: 'Ultra'          },
      { game: 'CS2',                  fps: '200–300',  resolution: '1080p / 1440p', quality: 'Ultra'          },
      { game: 'Cyberpunk 2077',       fps: '65–95',    resolution: '1080p',         quality: 'Ultra + RT básico' },
      { game: 'GTA V',                fps: '150–220',  resolution: '1080p',         quality: 'Ultra'          },
      { game: 'Apex Legends',         fps: '150–210',  resolution: '1080p',         quality: 'Ultra'          },
      { game: 'Call of Duty Warzone', fps: '130–180',  resolution: '1080p',         quality: 'Ultra'          },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Excelente', detail: 'Archivos muy grandes, filtros complejos y 3D fluidos' },
      { software: 'Illustrator',     performance: 'Excelente', detail: 'Proyectos complejos sin ninguna limitación' },
      { software: 'Premiere Pro',    performance: 'Muy bueno', detail: 'Edición 4K fluida, multicámara sin problema' },
      { software: 'DaVinci Resolve', performance: 'Muy bueno', detail: 'Edición 4K y corrección de color profesional fluida' },
      { software: 'After Effects',   performance: 'Bueno',     detail: 'Composiciones complejas con renders razonables' },
      { software: 'Blender',         performance: 'Bueno',     detail: 'Renders 3D medianos fluidos, escenas complejas aceptables' },
      { software: 'Canva / CapCut',  performance: 'Fluido',    detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming 1080p / 1440p' },
      { icon: '🟢', label: 'RTX 5060 8GB' },
      { icon: '🔴', label: 'Ryzen 7 5700X 8 núcleos' },
      { icon: '🌐', label: 'WiFi integrado' },
      { icon: '💡', label: 'Cougar FV150 · 4 fans ARGB' },
      { icon: '🎬', label: 'Edición 4K fluida' },
    ],
    images: ['/Imagenes/productos/torre-wevo-de-codorniz.jpeg'],
    price: '$ 5.699.990',
    numericPrice: 5699990,
    url: '#',
  },
  {
    id: 'torre-wevo-extra',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Extra',
    specs: 'Ryzen 5 5600XT · RTX 3050 6GB · 16GB DDR4 · 1TB SSD',
    shortDescription: 'Computador gaming con procesador AMD Ryzen 5 5600XT, tarjeta gráfica RTX 3050 6GB, 16GB RAM DDR4 y SSD 1TB. Ideal para gaming en 1080p, diseño gráfico y edición de video. Incluye Windows 11 Pro.',
    description: 'La Torre Wevo Extra es un computador de escritorio con tarjeta gráfica dedicada, diseñado para quienes necesitan un paso más allá en rendimiento gráfico. Equipado con el procesador AMD Ryzen 5 5600XT a 3.6GHz y una tarjeta de video MSI RTX 3050 de 6GB, este equipo ofrece una experiencia fluida tanto en gaming en 1080p como en edición de video y diseño gráfico.\n\nCon 16GB de memoria RAM DDR4 RGB a 3200MHz (HIKSEMI Future), la Torre Wevo Extra garantiza multitarea eficiente y un rendimiento sólido en aplicaciones exigentes. Su almacenamiento SSD de 1TB proporciona amplio espacio para juegos, proyectos y archivos multimedia, con tiempos de carga ultrarrápidos.\n\nLa placa base ASUS PRIME A520M-K ofrece la estabilidad y confiabilidad que necesitas, mientras que la fuente de poder de 600W con certificación 80 Plus Bronce asegura eficiencia energética y protección para todos los componentes.\n\nPresentada en un elegante chasis ATX Lander 500 Power Group – XPG con excelente ventilación y diseño gamer, e incluyendo Windows 11 Pro, la Torre Wevo Extra es la opción perfecta para quienes buscan gaming, creación de contenido y productividad avanzada en un solo equipo.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 5 5600XT (6C/12T, hasta 4.5 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'MSI GeForce RTX 3050 6GB' },
      { label: 'Placa base',        value: 'ASUS PRIME A520M-K · Socket AM4' },
      { label: 'Memoria RAM',       value: '16GB DDR4 3200MHz RGB (HIKSEMI Future)' },
      { label: 'Almacenamiento',    value: '1TB SSD' },
      { label: 'Fuente de poder',   value: '600W 80 Plus Bronze' },
      { label: 'Chasis',            value: 'Lander 500 Power Group – XPG (ATX)' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '200–300',  resolution: '1080p', quality: 'Ultra'      },
      { game: 'Fortnite',             fps: '80–120',   resolution: '1080p', quality: 'Alto'       },
      { game: 'League of Legends',    fps: '200–300+', resolution: '1080p', quality: 'Ultra'      },
      { game: 'CS2',                  fps: '120–180',  resolution: '1080p', quality: 'Alto'       },
      { game: 'Cyberpunk 2077',       fps: '35–55',    resolution: '1080p', quality: 'Medio'      },
      { game: 'GTA V',                fps: '90–130',   resolution: '1080p', quality: 'Alto'       },
      { game: 'Apex Legends',         fps: '90–130',   resolution: '1080p', quality: 'Alto'       },
      { game: 'Call of Duty Warzone', fps: '80–110',   resolution: '1080p', quality: 'Medio–Alto' },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Muy bueno', detail: 'Archivos grandes y filtros complejos fluidos' },
      { software: 'Illustrator',     performance: 'Muy bueno', detail: 'Proyectos complejos sin problema' },
      { software: 'Premiere Pro',    performance: 'Bueno',     detail: 'Edición 1080p muy fluida, 4K básico aceptable' },
      { software: 'DaVinci Resolve', performance: 'Bueno',     detail: 'Edición 1080p fluida con corrección de color' },
      { software: 'After Effects',   performance: 'Aceptable', detail: 'Composiciones medianas, renders moderados' },
      { software: 'Blender',         performance: 'Básico',    detail: 'Renders simples viables, escenas complejas lentas' },
      { software: 'Canva / CapCut',  performance: 'Fluido',    detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming 1080p' },
      { icon: '🟢', label: 'RTX 3050 6GB' },
      { icon: '🔴', label: 'Ryzen 5 5600XT' },
      { icon: '💾', label: '1TB SSD' },
      { icon: '🎨', label: 'Diseño y edición' },
      { icon: '🏆', label: 'Windows 11 Pro' },
    ],
    images: ['/Imagenes/productos/torre-wevo-extra.jpeg'],
    price: '$ 4.099.990',
    numericPrice: 4099990,
    url: '#',
  },
  {
    id: 'torre-wevo-perico',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Perico',
    specs: 'Ryzen 9 9900X · RTX 5070 12GB · 32GB DDR5 · 500GB SSD',
    shortDescription: 'Computador gaming con procesador AMD Ryzen 9 9900X de última generación, tarjeta gráfica RTX 5070 12GB, 32GB RAM DDR5 y refrigeración líquida 360mm. Diseñada para gaming en ultra, streaming profesional y edición de video. Incluye Windows 11 Pro.',
    description: 'La Torre Wevo Perico es el computador de escritorio gaming de gama alta definitivo, construido alrededor del impresionante procesador AMD Ryzen 9 9900X de 12 núcleos y la potente tarjeta gráfica GeForce RTX 5070 de 12GB VRAM. Esta combinación representa lo mejor de la tecnología actual, ofreciendo rendimiento de workstation profesional tanto para gaming en ultra como para producción audiovisual de alto nivel.\n\nCon 32GB de memoria RAM DDR5 a 5200MHz en configuración dual channel (2×16GB) y una placa base B850M con WiFi DDR5, la Torre Wevo Perico garantiza ancho de banda máximo para el procesador y la GPU, resultando en una experiencia completamente sin cuellos de botella. Su almacenamiento SSD NVMe de 500GB asegura tiempos de carga ultrarrápidos para sistemas operativos, juegos y proyectos.\n\nLa refrigeración líquida Cougar Poseidon Elite ARGB 360mm mantiene el Ryzen 9 9900X a temperaturas óptimas bajo carga máxima, permitiendo rendimiento sostenido sin throttling. La fuente de poder de 850W con certificación 80 Plus Gold garantiza eficiencia superior y energía estable para cada componente del sistema.\n\nPresentada en el espectacular chasis Corsair 3500X con vidrio templado y 3 ventiladores LX120-R RGB, la Torre Wevo Perico combina una estética premium con organización interna impecable y flujo de aire de nivel entusiasta. Con Windows 11 Pro incluido, este equipo está listo para streaming, gaming competitivo en 1440p y creación de contenido profesional al nivel más alto.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 9 9900X (12C/24T, hasta 5.6 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 5070 12GB VRAM' },
      { label: 'Placa base',        value: 'B850M WiFi DDR5 · Socket AM5' },
      { label: 'Memoria RAM',       value: '32GB DDR5 5200MHz (2×16GB Dual Channel)' },
      { label: 'Almacenamiento',    value: '500GB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '850W 80 Plus Gold' },
      { label: 'Refrigeración',     value: 'Cougar Poseidon Elite ARGB 360mm (líquida)' },
      { label: 'Chasis',            value: 'Corsair 3500X · Vidrio templado · 3× LX120-R RGB' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '350–500',  resolution: '1080p / 1440p', quality: 'Ultra'           },
      { game: 'Fortnite',             fps: '180–260',  resolution: '1080p',         quality: 'Épica'           },
      { game: 'League of Legends',    fps: '400–600+', resolution: '1080p / 1440p', quality: 'Ultra'           },
      { game: 'CS2',                  fps: '280–420',  resolution: '1080p / 1440p', quality: 'Ultra'           },
      { game: 'Cyberpunk 2077',       fps: '110–160',  resolution: '1440p',         quality: 'Ultra + Ray Tracing' },
      { game: 'GTA V',                fps: '230–320',  resolution: '1080p / 1440p', quality: 'Ultra'           },
      { game: 'Apex Legends',         fps: '180–280',  resolution: '1080p',         quality: 'Ultra'           },
      { game: 'Call of Duty Warzone', fps: '160–230',  resolution: '1080p',         quality: 'Ultra'           },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Excepcional', detail: 'Archivos enormes, Neural Filters y 3D sin limitaciones' },
      { software: 'Illustrator',     performance: 'Excepcional', detail: 'Sin ninguna limitación' },
      { software: 'Premiere Pro',    performance: 'Excepcional', detail: 'Edición 6K/8K fluida, múltiples pistas y efectos simultáneos' },
      { software: 'DaVinci Resolve', performance: 'Excepcional', detail: 'Edición 8K, Fusion y color grading profesional fluidos' },
      { software: 'After Effects',   performance: 'Excelente',   detail: 'Composiciones muy complejas y renders rápidos' },
      { software: 'Blender',         performance: 'Excelente',   detail: 'Renders 3D complejos en tiempos cortos, VRAM 12GB clave' },
      { software: 'Cinema 4D',       performance: 'Excelente',   detail: 'Flujo de trabajo 3D/VFX profesional sin limitaciones' },
      { software: 'Canva / CapCut',  performance: 'Fluido',      detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🚀', label: 'Gaming Ultra 1440p' },
      { icon: '🟣', label: 'RTX 5070 12GB VRAM' },
      { icon: '🔴', label: 'Ryzen 9 9900X 12 núcleos' },
      { icon: '❄️', label: 'Refrigeración líquida 360mm' },
      { icon: '⚡', label: '32GB DDR5 Dual Channel' },
      { icon: '🎬', label: 'Edición 8K profesional' },
    ],
    images: ['/Imagenes/productos/torre-wevo-perico.jpeg'],
    price: '$ 11.149.990',
    numericPrice: 11149990,
    url: '#',
  },
  {
    id: 'torre-wevo-ranchero',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Ranchero',
    specs: 'Core i7-14700KF · RTX 5060 8GB · 32GB DDR5 · 1TB SSD',
    shortDescription: 'Computador gaming de escritorio con procesador Intel Core i7-14700KF de 20 núcleos, tarjeta gráfica RTX 5060 8GB, 32GB RAM DDR5 y refrigeración líquida. Perfecto para gaming en 1080p/1440p, streaming y edición de video. Incluye Windows 11 Pro.',
    description: 'La Torre Wevo Ranchero es un computador de escritorio gaming de alto rendimiento que combina la potencia del procesador Intel Core i7-14700KF de 20 núcleos (8P + 12E) con la tarjeta gráfica GeForce RTX 5060 de 8GB. Esta plataforma Intel de última generación ofrece un rendimiento excepcional tanto en gaming intensivo en 1080p y 1440p como en flujos de trabajo creativos exigentes de nivel profesional.\n\nCon 32GB de memoria RAM DDR5 a 5200MHz en configuración dual channel (2×16GB) y una placa base B760 con WiFi integrado, la Torre Wevo Ranchero garantiza velocidad máxima en multitarea, streaming y aplicaciones creativas modernas. Su almacenamiento SSD NVMe de 1TB asegura espacio generoso y tiempos de carga ultrarrápidos para todos tus proyectos y juegos.\n\nLa refrigeración líquida Cougar Poseidon Elite ARGB 360mm controla las temperaturas del i7-14700KF incluso bajo carga máxima sostenida, asegurando frecuencias estables y rendimiento constante. La fuente de poder de 850W con certificación 80 Plus Gold proporciona energía estable, eficiente y segura para todos los componentes de alto rendimiento.\n\nPresentada en el impresionante chasis XPG Starker Air BTF con vidrio templado y 4 ventiladores ARGB, la Torre Wevo Ranchero luce espectacular mientras mantiene temperaturas óptimas. Con Windows 11 Pro preinstalado, este equipo está listo para gaming competitivo, streaming, edición de video 4K y cualquier tarea creativa al más alto nivel.',
    fullSpecs: [
      { label: 'Procesador',        value: 'Intel Core i7-14700KF (20C/28T, hasta 5.6 GHz)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 5060 8GB' },
      { label: 'Placa base',        value: 'B760 WiFi · Socket LGA1700' },
      { label: 'Memoria RAM',       value: '32GB DDR5 5200MHz (2×16GB Dual Channel)' },
      { label: 'Almacenamiento',    value: '1TB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '850W 80 Plus Gold' },
      { label: 'Refrigeración',     value: 'Cougar Poseidon Elite ARGB 360mm (líquida)' },
      { label: 'Chasis',            value: 'XPG Starker Air BTF · Vidrio templado · 4 ventiladores ARGB' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '300–450',  resolution: '1080p / 1440p', quality: 'Ultra'  },
      { game: 'Fortnite',             fps: '140–200',  resolution: '1080p',         quality: 'Épica'  },
      { game: 'League of Legends',    fps: '350–500+', resolution: '1080p / 1440p', quality: 'Ultra'  },
      { game: 'CS2',                  fps: '200–320',  resolution: '1080p / 1440p', quality: 'Ultra'  },
      { game: 'Cyberpunk 2077',       fps: '65–95',    resolution: '1080p',         quality: 'Ultra'  },
      { game: 'GTA V',                fps: '160–240',  resolution: '1080p',         quality: 'Ultra'  },
      { game: 'Apex Legends',         fps: '150–220',  resolution: '1080p',         quality: 'Ultra'  },
      { game: 'Call of Duty Warzone', fps: '130–190',  resolution: '1080p',         quality: 'Ultra'  },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Excelente', detail: 'Sin limitaciones, archivos enormes fluidos' },
      { software: 'Illustrator',     performance: 'Excelente', detail: 'Sin limitaciones' },
      { software: 'Premiere Pro',    performance: 'Excelente', detail: 'Edición 4K/6K fluida, multicámara, efectos pesados' },
      { software: 'DaVinci Resolve', performance: 'Excelente', detail: 'Edición 4K profesional y corrección de color avanzada' },
      { software: 'After Effects',   performance: 'Muy bueno', detail: 'Composiciones complejas y renders rápidos' },
      { software: 'Blender',         performance: 'Muy bueno', detail: 'Renders 3D complejos en tiempos razonables' },
      { software: 'Cinema 4D',       performance: 'Muy bueno', detail: 'Flujo de trabajo 3D profesional sin problema' },
      { software: 'Canva / CapCut',  performance: 'Fluido',    detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '🎮', label: 'Gaming Ultra 1080p / 1440p' },
      { icon: '🔵', label: 'Core i7-14700KF 20 núcleos' },
      { icon: '🟢', label: 'RTX 5060 8GB' },
      { icon: '❄️', label: 'Refrigeración líquida 360mm' },
      { icon: '⚡', label: '32GB DDR5 Dual Channel' },
      { icon: '🏆', label: 'Windows 11 Pro' },
    ],
    images: ['/Imagenes/productos/torre-wevo-ranchero.jpeg'],
    price: '$ 9.299.990',
    numericPrice: 9299990,
    url: '#',
  },
  {
    id: 'torre-wevo-tibio',
    badge: null,
    category: 'Productividad',
    name: 'Torre Wevo Tibio',
    specs: 'Ryzen 5 8600G · Radeon 760M · 16GB DDR5 · 500GB SSD',
    shortDescription: 'Computador de escritorio con AMD Ryzen 5 8600G (gráficos integrados Radeon 760M), 16GB RAM DDR5 5600MHz, SSD NVMe 500GB y chasis gamer Cougar FV150 con 4 ventiladores ARGB. Sin tarjeta gráfica dedicada. Incluye Windows 11.',
    description: 'La Torre Wevo Tibio es un computador de escritorio potente y eficiente impulsado por el procesador AMD Ryzen 5 8600G, una de las APU más avanzadas del mercado con gráficos integrados Radeon de alto nivel. Este equipo es perfecto para quienes buscan rendimiento excepcional sin necesidad de tarjeta gráfica dedicada, ideal para productividad, multimedia y gaming casual.\n\nEquipado con 16GB de memoria RAM DDR5 a 5600MHz, la Torre Wevo Tibio aprovecha la velocidad de la última generación de memoria para ofrecer multitarea fluida y procesamiento ultrarrápido. Su SSD NVMe de 500GB garantiza arranques instantáneos y carga veloz de todas tus aplicaciones.\n\nLa placa base B840 DDR5 proporciona una plataforma moderna y estable compatible con la arquitectura AM5, mientras que la fuente de poder de 650W con certificación 80 Plus Bronce asegura eficiencia energética y protección confiable para todos los componentes del sistema.\n\nPresentada en el espectacular chasis Cougar FV150 con vidrio templado y 4 ventiladores ARGB que ofrecen una estética gamer impresionante con excelente flujo de aire. Con Windows 11 preinstalado, la Torre Wevo Tibio es la elección inteligente para quienes desean tecnología DDR5 de última generación a un precio accesible.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 5 8600G (6C/12T, hasta 5.0 GHz)' },
      { label: 'Gráficos',          value: 'AMD Radeon 760M (integrada)' },
      { label: 'Placa base',        value: 'MSI PRO B840M-B / ASUS PRIME B650M-F · AM5' },
      { label: 'Memoria RAM',       value: '16GB DDR5 5600MHz' },
      { label: 'Almacenamiento',    value: '500GB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '650W 80 Plus Bronze' },
      { label: 'Chasis',            value: 'Cougar FV150 · Vidrio templado · 4 ventiladores ARGB' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '120–180',        resolution: '1080p', quality: 'Medio–Alto' },
      { game: 'Fortnite',             fps: '50–80',          resolution: '1080p', quality: 'Bajo–Medio' },
      { game: 'League of Legends',    fps: '120–180+',       resolution: '1080p', quality: 'Alto'       },
      { game: 'CS2',                  fps: '70–110',         resolution: '1080p', quality: 'Medio'      },
      { game: 'Cyberpunk 2077',       fps: 'No recomendado', resolution: '—',     quality: '—'          },
      { game: 'GTA V',                fps: '50–75',          resolution: '1080p', quality: 'Bajo'       },
      { game: 'Apex Legends',         fps: '60–90',          resolution: '1080p', quality: 'Bajo–Medio' },
      { game: 'Call of Duty Warzone', fps: 'No recomendado', resolution: '—',     quality: '—'          },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Fluido',         detail: 'Archivos medianos y grandes con comodidad' },
      { software: 'Illustrator',     performance: 'Fluido',         detail: 'Proyectos vectoriales estándar' },
      { software: 'Premiere Pro',    performance: 'Aceptable',      detail: 'Edición 1080p fluida, 4K muy lento' },
      { software: 'DaVinci Resolve', performance: 'Aceptable',      detail: 'Edición 1080p con corrección básica' },
      { software: 'After Effects',   performance: 'Limitado',       detail: 'Composiciones simples únicamente' },
      { software: 'Blender',         performance: 'No recomendado', detail: 'Renders muy lentos sin GPU dedicada' },
      { software: 'Canva / CapCut',  performance: 'Fluido',         detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '💼', label: 'Productividad' },
      { icon: '🔴', label: 'Ryzen 5 8600G AM5' },
      { icon: '🖥️', label: 'Radeon 760M integrada' },
      { icon: '⚡', label: 'DDR5 5600MHz' },
      { icon: '💡', label: 'Cougar FV150 · 4 fans ARGB' },
      { icon: '🏆', label: 'Windows 11 Pro' },
    ],
    images: ['/Imagenes/productos/torre-wevo-tibio.jpeg'],
    price: '$ 4.149.990',
    numericPrice: 4149990,
    url: '#',
  },
  {
    id: 'torre-wevo-tortilla',
    badge: null,
    category: 'Gaming',
    name: 'Torre Wevo Tortilla',
    specs: 'Ryzen 9 9950X3D · RTX 5070 12GB · 32GB DDR5 · 500GB SSD',
    shortDescription: 'Computador de escritorio de alto rendimiento con el procesador más potente de AMD para gaming, tarjeta gráfica RTX 5070 de última generación, 32GB RAM DDR5 y refrigeración líquida 360mm. Ideal para gaming en 4K, streaming profesional y creación de contenido. Incluye Windows 11 Pro.',
    description: 'La Torre Wevo Tortilla representa la cúspide del rendimiento en computadores de escritorio gaming, construida alrededor del legendario procesador AMD Ryzen 9 9950X3D — el procesador para gaming más rápido del mundo gracias a su revolucionaria tecnología 3D V-Cache de 128MB. Combinado con la tarjeta gráfica GeForce RTX 5070 de 12GB VRAM, este equipo establece un nuevo estándar para gaming en 4K, producción audiovisual y trabajo de workstation de nivel profesional extremo.\n\nCon 32GB de memoria RAM DDR5 a 5200MHz en configuración dual channel (2×16GB) y una placa base B850M con WiFi DDR5, la Torre Wevo Tortilla maximiza el potencial del Ryzen 9 9950X3D eliminando cualquier cuello de botella y garantizando el máximo rendimiento en todo escenario. Su almacenamiento SSD NVMe de 500GB asegura tiempos de carga instantáneos en sistemas operativos, juegos y software profesional.\n\nLa refrigeración líquida Cougar Poseidon Elite ARGB 360mm es la única solución adecuada para controlar las temperaturas del Ryzen 9 9950X3D bajo carga máxima, manteniendo frecuencias turbo sostenidas durante las sesiones más intensas de gaming y renderizado. La fuente de poder de 850W con certificación 80 Plus Bronze garantiza energía suficiente y estable para cada componente de alto rendimiento.\n\nAlojada en el icónico chasis Corsair 3500X con vidrio templado y 3 ventiladores LX120-R RGB, la Torre Wevo Tortilla es tan espectacular visualmente como poderosa internamente. Con Windows 11 Pro preinstalado, esta máquina está lista para gaming en 4K, streaming profesional, edición de video en 8K y cualquier tarea creativa sin absolutamente ninguna limitación.',
    fullSpecs: [
      { label: 'Procesador',        value: 'AMD Ryzen 9 9950X3D (16C/32T · 3D V-Cache 128MB)' },
      { label: 'Tarjeta gráfica',   value: 'NVIDIA GeForce RTX 5070 12GB VRAM' },
      { label: 'Placa base',        value: 'B850M WiFi DDR5 · Socket AM5' },
      { label: 'Memoria RAM',       value: '32GB DDR5 5200MHz (2×16GB Dual Channel)' },
      { label: 'Almacenamiento',    value: '500GB SSD M.2 NVMe' },
      { label: 'Fuente de poder',   value: '850W 80 Plus Bronze' },
      { label: 'Refrigeración',     value: 'Cougar Poseidon Elite ARGB 360mm (líquida)' },
      { label: 'Chasis',            value: 'Corsair 3500X · Vidrio templado · 3× LX120-R RGB' },
      { label: 'Sistema operativo', value: 'Windows 11 Pro (original)' },
    ],
    gamingPerformance: [
      { game: 'Valorant',             fps: '400–600',  resolution: '1080p / 1440p', quality: 'Ultra'              },
      { game: 'Fortnite',             fps: '200–300',  resolution: '1080p',         quality: 'Épica'              },
      { game: 'League of Legends',    fps: '400–600+', resolution: '1080p / 1440p', quality: 'Ultra'              },
      { game: 'CS2',                  fps: '300–500',  resolution: '1080p / 1440p', quality: 'Ultra'              },
      { game: 'Cyberpunk 2077',       fps: '120–180',  resolution: '1440p',         quality: 'Ultra + Ray Tracing'},
      { game: 'GTA V',                fps: '250–350',  resolution: '1080p / 1440p', quality: 'Ultra'              },
      { game: 'Apex Legends',         fps: '200–300',  resolution: '1080p',         quality: 'Ultra'              },
      { game: 'Call of Duty Warzone', fps: '180–250',  resolution: '1080p',         quality: 'Ultra'              },
    ],
    creativePerformance: [
      { software: 'Photoshop',       performance: 'Excepcional', detail: 'Sin absolutamente ninguna limitación' },
      { software: 'Illustrator',     performance: 'Excepcional', detail: 'Sin ninguna limitación' },
      { software: 'Premiere Pro',    performance: 'Excepcional', detail: 'Edición 8K fluida, decenas de pistas, efectos sin caídas' },
      { software: 'DaVinci Resolve', performance: 'Excepcional', detail: 'Edición 8K, Fusion VFX y color grading en tiempo real' },
      { software: 'After Effects',   performance: 'Excepcional', detail: 'Composiciones muy complejas con renders muy rápidos' },
      { software: 'Blender',         performance: 'Excepcional', detail: 'Renders 3D/VFX complejos en tiempos muy cortos' },
      { software: 'Cinema 4D',       performance: 'Excepcional', detail: 'El flujo de trabajo 3D más exigente sin problemas' },
      { software: 'Canva / CapCut',  performance: 'Fluido',      detail: 'Sin ningún problema' },
    ],
    features: [
      { icon: '👑', label: 'Gaming 4K · Tope de línea' },
      { icon: '🔴', label: 'Ryzen 9 9950X3D 3D V-Cache' },
      { icon: '🟣', label: 'RTX 5070 12GB VRAM' },
      { icon: '❄️', label: 'Refrigeración líquida 360mm' },
      { icon: '⚡', label: '32GB DDR5 Dual Channel' },
      { icon: '🎬', label: 'Edición 8K sin limitaciones' },
    ],
    images: ['/Imagenes/productos/torre-wevo-tortilla.jpeg'],
    price: '$ 12.699.990',
    numericPrice: 12699990,
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
  'torre-wevo-tortilla',
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) =>
  FEATURED_IDS.includes(p.id),
);

// Periféricos recomendados
export const PERIPHERALS: Peripheral[] = [
  { icon: '🖱️', name: 'Mouse gaming',      desc: 'Precisión avanzada y máximo control.',           slug: 'mouse'      },
  { icon: '⌨️', name: 'Teclados mecánicos', desc: 'Switches táctiles y diseño sobrio.',             slug: 'teclados'   },
  { icon: '🎧', name: 'Audífonos',          desc: 'Sonido envolvente para juego y stream.',          slug: 'audifonos'  },
  { icon: '🎤', name: 'Micrófonos',         desc: 'Voz clara y profesional para todo uso.',          slug: 'microfonos' },
  { icon: '🖥️', name: 'Monitores',          desc: 'Alta tasa de refresco y colores nítidos.',        slug: 'monitores'  },
  { icon: '📷', name: 'Cámaras',            desc: 'Imagen limpia para videollamadas y streams.',     slug: 'camaras'    },
];

export const PERIPHERAL_PRODUCTS: PeripheralProduct[] = [
  {
    id: 'monitor-acer-ed270',
    badge: 'Nuevo',
    category: 'Monitores',
    categorySlug: 'monitores',
    name: 'Monitor Acer ED270',
    specs: 'Curvo 27" · FHD 1080p · VA · 240 Hz · 1ms GTG · HDMI / DP',
    shortDescription:
      'Monitor Acer ED270 – Curvo 27″ FHD VA 240Hz | Setup Gamer Inmersivo\n\nMonitor gaming curvo de 27 pulgadas con panel VA Full HD, 240Hz de frecuencia y ángulos de visión de 178°. La curvatura envolvente mejora la inmersión en shooters, carreras y juegos de mundo abierto.',
    description:
      'El Monitor Acer ED270 redefine la experiencia gaming con su panel VA curvo de 27 pulgadas y curvatura 1800R, diseñado para envolverte en cada partida. Su frecuencia de refresco de 240 Hz elimina el desenfoque en movimiento, mientras que su tiempo de respuesta GTG de 1 ms garantiza reacciones instantáneas: exactamente lo que necesitas en CS2, Valorant y los shooters más exigentes.\n\nLa resolución Full HD 1920 × 1080 aprovecha al máximo la tasa de refresco sin sacrificar rendimiento en la GPU, y la compatibilidad con AMD FreeSync elimina el tearing para una imagen siempre estable. Con un contraste nativo de 3000:1, los negros son profundos y los colores vibrantes, ofreciendo una imagen impactante en cualquier género.\n\nSu conectividad incluye dos puertos HDMI 1.4 y un DisplayPort 1.2, permitiéndote conectar consola y PC simultáneamente. Los ángulos de visión de 178° en ambos ejes hacen que la imagen sea consistente desde cualquier ángulo, y su diseño sin bordes en tres lados lo hace ideal para setups multi-monitor. La curvatura 1800R no solo mejora la inmersión, sino que también reduce la fatiga visual en sesiones prolongadas de juego o trabajo.',
    fullSpecs: [
      { label: 'Tamaño',                value: '27 pulgadas' },
      { label: 'Tipo de panel',         value: 'VA (Vertical Alignment)' },
      { label: 'Curvatura',             value: '1800R' },
      { label: 'Resolución',            value: '1920 × 1080 (Full HD)' },
      { label: 'Frecuencia de refresco',value: '240 Hz' },
      { label: 'Tiempo de respuesta',   value: '1ms GTG' },
      { label: 'Brillo',                value: '250 cd/m²' },
      { label: 'Contraste',             value: '3000:1 (nativo)' },
      { label: 'Cobertura de color',    value: 'sRGB 72%' },
      { label: 'Ángulos de visión',     value: '178° / 178°' },
      { label: 'Conectividad',          value: '2× HDMI 1.4 · 1× DisplayPort 1.2' },
      { label: 'Sync adaptativo',       value: 'AMD FreeSync' },
      { label: 'Dimensiones (sin pie)', value: '612 × 368 × 62 mm' },
      { label: 'Peso (con pie)',        value: '5.5 kg aprox.' },
    ],
    gamingPerformance: [
      { game: 'CS2 / Valorant',         fps: '240 Hz',  resolution: '1080p Full HD', quality: 'Competitivo máximo'   },
      { game: 'Warzone / Fortnite',     fps: '240 Hz',  resolution: '1080p Full HD', quality: 'Fluidez total'         },
      { game: 'Simuladores y carreras', fps: '240 Hz',  resolution: '1080p Full HD', quality: 'Inmersión 1800R'       },
      { game: 'RPG y aventura AAA',     fps: '240 Hz',  resolution: '1080p Full HD', quality: 'Impacto visual alto'   },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop / Lightroom', performance: 'Bueno',     detail: 'sRGB 72% adecuado para retoque y diseño web; no apto para imprenta profesional.' },
      { software: 'Adobe Premiere Pro',          performance: 'Aceptable', detail: 'Edición de video posible; corrección de color limitada por cobertura sRGB 72%.' },
      { software: 'Illustrator / Diseño gráfico',performance: 'Bueno',     detail: 'Contraste VA 3000:1 facilita la composición visual y el diseño de interfaces.' },
      { software: 'OBS Studio / Streaming',      performance: 'Excelente', detail: 'Alta fluidez y baja latencia ideales para monitoreo en tiempo real de transmisiones.' },
    ],
    features: [
      { icon: '🖥️', label: 'Panel VA Curvo 1800R 27"' },
      { icon: '⚡', label: '240 Hz · 1ms GTG' },
      { icon: '🎮', label: 'AMD FreeSync compatible' },
      { icon: '🔌', label: '2× HDMI · 1× DisplayPort' },
      { icon: '👁️', label: '178° ángulos de visión' },
      { icon: '🌑', label: 'Contraste nativo 3000:1' },
    ],
    images: ['/Imagenes/productos/monitor-acer-ed270.jpeg'],
    price: '$ 999.990',
    numericPrice: 999990,
  },
  {
    id: 'monitor-acer-nitro-kg270',
    badge: 'Nuevo',
    category: 'Monitores',
    categorySlug: 'monitores',
    name: 'Monitor Acer Nitro KG270',
    specs: '27" FHD · IPS · 180 Hz · 1ms VRB · FreeSync Premium · Zero Frame',
    shortDescription:
      'Monitor Acer Nitro KG270 – 27″ FHD IPS 180Hz | 1ms VRB | Gaming Colombia\n\nMonitor gaming de 27 pulgadas Full HD con panel IPS, 180Hz de actualización y 1ms VRB. Colores precisos y ángulos amplios para gaming inmersivo y trabajo multimedia. Gran formato para tu setup.',
    description:
      'El Monitor Acer Nitro KG270 combina la precisión de color de un panel IPS con la velocidad de una tasa de refresco de 180 Hz, ofreciendo la combinación perfecta para gamers exigentes y creadores de contenido. A diferencia de los paneles VA, el IPS garantiza colores uniformes y precisos desde cualquier ángulo, con ángulos de visión de 178° en ambos ejes y una cobertura de color sRGB del 99% que hace que cada escena se vea exactamente como fue diseñada.\n\nCon sus 27 pulgadas en Full HD y un diseño Zero Frame en tres lados, este monitor maximiza el área visible y es ideal para setups multi-monitor o espacios donde el diseño importa. La tecnología VRB (Visual Response Boost) reduce el blur en movimiento hasta 1ms percibido, mientras que la compatibilidad con AMD FreeSync Premium elimina el tearing y garantiza una experiencia fluida en todo el rango de frecuencias.\n\nSu conectividad incluye dos puertos HDMI 2.0 y un DisplayPort 1.2, permitiéndote conectar múltiples dispositivos sin perder calidad de señal. El soporte ajustable con inclinación de -5° a 20° se adapta a cualquier postura ergonómica. Un monitor versátil que rinde igual en gaming, diseño gráfico, edición de video y trabajo diario.',
    fullSpecs: [
      { label: 'Tamaño',                value: '27 pulgadas' },
      { label: 'Tipo de panel',         value: 'IPS (In-Plane Switching)' },
      { label: 'Diseño',                value: 'Zero Frame (3 lados sin bordes)' },
      { label: 'Resolución',            value: '1920 × 1080 (Full HD)' },
      { label: 'Frecuencia de refresco',value: '180 Hz' },
      { label: 'Tiempo de respuesta',   value: '1ms VRB (Visual Response Boost)' },
      { label: 'Brillo',                value: '250 cd/m²' },
      { label: 'Contraste',             value: '1000:1 (nativo)' },
      { label: 'Cobertura de color',    value: 'sRGB 99%' },
      { label: 'Ángulos de visión',     value: '178° / 178°' },
      { label: 'Conectividad',          value: '2× HDMI 2.0 · 1× DisplayPort 1.2' },
      { label: 'Sync adaptativo',       value: 'AMD FreeSync Premium' },
      { label: 'Ajuste de inclinación', value: '-5° a 20°' },
      { label: 'Peso (con pie)',        value: '5.4 kg aprox.' },
    ],
    gamingPerformance: [
      { game: 'CS2 / Valorant',         fps: '180 Hz',  resolution: '1080p Full HD', quality: 'Competitivo alto'        },
      { game: 'Warzone / Fortnite',     fps: '180 Hz',  resolution: '1080p Full HD', quality: 'Fluidez excelente'       },
      { game: 'RPG y aventura AAA',     fps: '180 Hz',  resolution: '1080p Full HD', quality: 'Colores IPS fieles'      },
      { game: 'Simuladores / Racing',   fps: '180 Hz',  resolution: '1080p Full HD', quality: 'Campo visual Zero Frame' },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop / Lightroom', performance: 'Excelente', detail: 'sRGB 99% con panel IPS — colores uniformes ideales para retoque y edición fotográfica.' },
      { software: 'Adobe Premiere Pro',          performance: 'Muy bueno', detail: 'Cobertura de color IPS amplia y 180Hz permiten revisar secuencias con fluidez y precisión.' },
      { software: 'Illustrator / Diseño gráfico',performance: 'Excelente', detail: 'Ángulos de visión de 178° y sRGB 99% garantizan colores consistentes en diseño de interfaces y composición.' },
      { software: 'OBS Studio / Streaming',      performance: 'Muy bueno', detail: '180Hz y 1ms VRB para monitoreo en tiempo real sin blur, ideal para streamers y productores de contenido.' },
    ],
    features: [
      { icon: '🖥️', label: 'Panel IPS Zero Frame 27"' },
      { icon: '⚡', label: '180 Hz · 1ms VRB' },
      { icon: '🎮', label: 'AMD FreeSync Premium' },
      { icon: '🎨', label: 'sRGB 99% colores precisos' },
      { icon: '🔌', label: '2× HDMI 2.0 · 1× DisplayPort' },
      { icon: '👁️', label: '178° ángulos de visión IPS' },
    ],
    images: ['/Imagenes/productos/monitor-acer-nitro-kg270.jpeg'],
    price: '$ 889.990',
    numericPrice: 889990,
  },
  {
    id: 'monitor-acer-nitro-xv240y',
    badge: 'Nuevo',
    category: 'Monitores',
    categorySlug: 'monitores',
    name: 'Monitor Acer Nitro XV240Y',
    specs: '23.8" FHD · IPS · 200 Hz · 0.5ms GTG · PIVOT · FreeSync Premium',
    shortDescription:
      'Monitor Acer Nitro XV240Y – 23.8″ FHD IPS 200Hz | 0.5ms | PIVOT | AMD FreeSync Premium\n\nMonitor gaming de 23.8 pulgadas IPS Full HD con 200Hz, 0.5ms de respuesta, función PIVOT para rotación 90°, AMD FreeSync Premium y doble HDMI 2.0 + DisplayPort. El más rápido de la línea Nitro 24″.',
    description:
      'El Monitor Acer Nitro XV240Y es el monitor gaming más rápido de la línea Nitro de 24 pulgadas, combinando un panel IPS de 23.8" con una frecuencia de refresco de 200 Hz y un tiempo de respuesta de 0.5ms GTG, el más bajo de su categoría. Esta combinación lo convierte en la elección ideal para gamers competitivos que buscan cada milisegundo de ventaja sin sacrificar la precisión de color característica de los paneles IPS.\n\nLa función PIVOT permite rotar el monitor 90° para trabajar en modo vertical, perfecta para programadores, editores de código, lectores de documentos extensos o setups creativos que requieren más altura que anchura. Junto con el ajuste de altura y la inclinación ergonómica de -5° a 25°, este monitor se adapta completamente a tu postura y flujo de trabajo.\n\nCon AMD FreeSync Premium, el XV240Y elimina el tearing y el stuttering en todo el rango de frecuencias, garantizando una imagen siempre fluida. Su cobertura de color sRGB 99% y los ángulos de visión IPS de 178° aseguran colores uniformes y precisos, convirtiéndolo en un monitor dual capaz de rendir tanto en gaming de alto rendimiento como en diseño gráfico y edición multimedia.',
    fullSpecs: [
      { label: 'Tamaño',                value: '23.8 pulgadas' },
      { label: 'Tipo de panel',         value: 'IPS (In-Plane Switching)' },
      { label: 'Resolución',            value: '1920 × 1080 (Full HD)' },
      { label: 'Frecuencia de refresco',value: '200 Hz' },
      { label: 'Tiempo de respuesta',   value: '0.5ms GTG' },
      { label: 'Brillo',                value: '250 cd/m²' },
      { label: 'Contraste',             value: '1000:1 (nativo)' },
      { label: 'Cobertura de color',    value: 'sRGB 99%' },
      { label: 'Ángulos de visión',     value: '178° / 178°' },
      { label: 'Conectividad',          value: '2× HDMI 2.0 · 1× DisplayPort 1.4' },
      { label: 'Sync adaptativo',       value: 'AMD FreeSync Premium' },
      { label: 'Función PIVOT',         value: 'Sí — rotación 90°' },
      { label: 'Ajuste ergonómico',     value: 'Altura · Inclinación -5° a 25° · PIVOT' },
      { label: 'Peso (con pie)',        value: '5.8 kg aprox.' },
    ],
    gamingPerformance: [
      { game: 'CS2 / Valorant',       fps: '200 Hz', resolution: '1080p Full HD', quality: 'Elite competitivo'         },
      { game: 'Warzone / Fortnite',   fps: '200 Hz', resolution: '1080p Full HD', quality: 'Sin tearing absoluto'      },
      { game: 'RPG y aventura AAA',   fps: '200 Hz', resolution: '1080p Full HD', quality: 'Visual IPS fiel y fluido'  },
      { game: 'Simuladores / Racing', fps: '200 Hz', resolution: '1080p Full HD', quality: 'Máxima precisión 0.5ms'   },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop / Lightroom', performance: 'Excelente', detail: 'sRGB 99% IPS garantiza colores uniformes en toda la pantalla, ideal para retoque y edición fotográfica precisa.' },
      { software: 'Adobe Premiere Pro',          performance: 'Muy bueno', detail: 'Reproducción fluida a 200Hz y cobertura IPS amplia para revisión de secuencias con precisión de color.' },
      { software: 'Illustrator / Diseño gráfico',performance: 'Excelente', detail: 'IPS 99% sRGB + función PIVOT para diseño en modo vertical: ideal para composición web, UI y documentos largos.' },
      { software: 'OBS Studio / Streaming',      performance: 'Excelente', detail: '200Hz y 0.5ms permiten monitoreo ultra fluido en tiempo real, sin artefactos ni blur en escenas en movimiento.' },
    ],
    features: [
      { icon: '🖥️', label: 'Panel IPS 23.8" Full HD' },
      { icon: '⚡', label: '200 Hz · 0.5ms GTG' },
      { icon: '🔄', label: 'PIVOT — rotación 90°' },
      { icon: '🎮', label: 'AMD FreeSync Premium' },
      { icon: '🎨', label: 'sRGB 99% colores precisos' },
      { icon: '🔌', label: '2× HDMI 2.0 · 1× DisplayPort' },
    ],
    images: ['/Imagenes/productos/monitor-acer-nitro-xv240y.jpeg'],
    price: '$ 759.990',
    numericPrice: 759990,
  },
  {
    id: 'monitor-acer-nitro-xz322qu',
    badge: 'Nuevo',
    category: 'Monitores',
    categorySlug: 'monitores',
    name: 'Monitor Acer Nitro XZ322QU',
    specs: 'Curvo 31.5" · 2K QHD 2560×1440 · VA · 180 Hz · 1ms VRB · FreeSync Premium',
    shortDescription:
      'Monitor Acer Nitro XZ322QU – Curvo 31.5″ 2K 2560×1440 180Hz | 1ms VRB | VA\n\nMonitor gaming curvo de 31.5 pulgadas con resolución 2K QHD 2560×1440, panel VA, 180Hz y 1ms VRB. Conectividad dual HDMI + DisplayPort. El monitor ideal para gaming en alta resolución y trabajo creativo.',
    description:
      'El Monitor Acer Nitro XZ322QU representa un salto cualitativo en la experiencia visual gaming: 31.5 pulgadas de panel VA curvo con resolución 2K QHD 2560 × 1440 que ofrece el doble de píxeles que el Full HD, traduciendo esa diferencia en una nitidez sorprendente en texturas, interfaces y detalles de escena. La curvatura 1500R envuelve tu campo visual de forma natural, reduciendo la fatiga ocular en sesiones prolongadas y maximizando la inmersión en cada género.\n\nEl panel VA entrega un contraste nativo excepcional de 4000:1, con negros profundos y blancos brillantes que hacen destacar la imagen especialmente en juegos oscuros, películas y contenido de alto rango dinámico. Con 180 Hz de tasa de refresco y 1ms VRB, la fluidez y la respuesta son comparables a monitores competitivos de menor tamaño, sin sacrificar el impacto visual de la alta resolución.\n\nSu conectividad con dos HDMI 2.0 y DisplayPort permite conectar PC y consola simultáneamente sin perder calidad de señal. La compatibilidad con AMD FreeSync Premium elimina el tearing en toda la gama de frecuencias. Con 31.5 pulgadas 2K, este monitor no es solo un periférico — es el centro de un setup gaming y creativo de alto nivel que transforma cómo percibes cada píxel.',
    fullSpecs: [
      { label: 'Tamaño',                value: '31.5 pulgadas' },
      { label: 'Tipo de panel',         value: 'VA (Vertical Alignment) Curvo' },
      { label: 'Curvatura',             value: '1500R' },
      { label: 'Resolución',            value: '2560 × 1440 (QHD / 2K)' },
      { label: 'Frecuencia de refresco',value: '180 Hz' },
      { label: 'Tiempo de respuesta',   value: '1ms VRB' },
      { label: 'Brillo',                value: '250 cd/m²' },
      { label: 'Contraste',             value: '4000:1 (nativo)' },
      { label: 'Cobertura de color',    value: 'DCI-P3 90% · sRGB 125%' },
      { label: 'Ángulos de visión',     value: '178° / 178°' },
      { label: 'Conectividad',          value: '2× HDMI 2.0 · 1× DisplayPort 1.2' },
      { label: 'Sync adaptativo',       value: 'AMD FreeSync Premium' },
      { label: 'Dimensiones (sin pie)', value: '714 × 421 × 87 mm' },
      { label: 'Peso (con pie)',        value: '9.5 kg aprox.' },
    ],
    gamingPerformance: [
      { game: 'CS2 / Valorant',         fps: '180 Hz', resolution: '2K QHD',      quality: 'Competitivo alta resolución' },
      { game: 'Warzone / Fortnite',     fps: '180 Hz', resolution: '2K QHD',      quality: 'Inmersión curva total'       },
      { game: 'Cyberpunk / Elden Ring', fps: '180 Hz', resolution: '2K QHD',      quality: 'Experiencia visual élite'    },
      { game: 'Simuladores / Racing',   fps: '180 Hz', resolution: '2K QHD 31.5"',quality: 'Campo visual máximo 1500R'   },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop / Lightroom', performance: 'Muy bueno', detail: 'DCI-P3 90% y gran superficie 2K 31.5" ofrecen espacio y precisión de color para edición fotográfica profesional.' },
      { software: 'Adobe Premiere Pro',          performance: 'Muy bueno', detail: 'Resolución 2K QHD permite ver el timeline con mayor detalle y precisión de color VA para corrección básica.' },
      { software: 'Illustrator / Diseño gráfico',performance: 'Muy bueno', detail: 'La superficie 2K de 31.5" brinda un espacio de trabajo amplio para composición visual, UI y diseño de marca.' },
      { software: 'OBS Studio / Streaming',      performance: 'Bueno',     detail: '180Hz y resolución 2K permiten monitorear transmisiones con alta nitidez; el formato 31.5" facilita el multitarea.' },
    ],
    features: [
      { icon: '🖥️', label: 'VA Curvo 1500R 31.5" 2K' },
      { icon: '⚡', label: '180 Hz · 1ms VRB' },
      { icon: '🎮', label: 'AMD FreeSync Premium' },
      { icon: '🌈', label: 'DCI-P3 90% · contraste 4000:1' },
      { icon: '📐', label: '2K QHD 2560×1440' },
      { icon: '🔌', label: '2× HDMI 2.0 · 1× DisplayPort' },
    ],
    images: ['/Imagenes/productos/monitor-acer-nitro-xz322qu.jpeg'],
    price: '$ 1.399.990',
    numericPrice: 1399990,
  },

  // ── MOUSE ────────────────────────────────────────────────────────────────
  {
    id: 'mouse-logitech-g203',
    badge: 'Ejemplo',
    category: 'Mouse gaming',
    categorySlug: 'mouse',
    name: 'Logitech G203 LIGHTSYNC',
    specs: 'Sensor óptico 8000 DPI · 1000Hz · 6 botones · 85g · RGB LIGHTSYNC',
    shortDescription:
      'Logitech G203 LIGHTSYNC – Mouse gaming ligero | 8000 DPI | RGB | Colombia\n\nMouse gaming con sensor óptico de hasta 8000 DPI, polling rate de 1000Hz, 6 botones programables y peso de solo 85g. Diseño ambidiestro con iluminación RGB LIGHTSYNC. Ideal para FPS competitivo y uso diario.',
    description:
      'El Logitech G203 LIGHTSYNC es la puerta de entrada al gaming de rendimiento real: sensor óptico capaz de hasta 8000 DPI con seguimiento preciso a cualquier velocidad, sin aceleración ni predicción de movimiento. Con un polling rate de 1000Hz, el cursor responde 8 veces más rápido que un mouse estándar, garantizando una latencia mínima crítica en FPS competitivos.\n\nCon tan solo 85g, el G203 elimina la fatiga en sesiones prolongadas sin sacrificar solidez en la construcción. Su forma simétrica lo hace cómodo para usuarios con agarre palm, claw o fingertip. Los 6 botones son totalmente programables mediante Logitech G HUB, permitiéndote asignar macros, DPI on-the-fly y accesos directos personalizados.\n\nLa iluminación RGB LIGHTSYNC ofrece 16.8 millones de colores sincronizables con otros dispositivos Logitech G y con el contenido en pantalla. El cable trenzado de 2.1m reduce el enredo y garantiza durabilidad a largo plazo. Un mouse que cumple en gaming, trabajo y diseño por igual.',
    fullSpecs: [
      { label: 'Sensor',              value: 'Óptico — hasta 8000 DPI' },
      { label: 'Polling rate',        value: '1000Hz (1ms de latencia)' },
      { label: 'Botones',             value: '6 programables' },
      { label: 'Peso',                value: '85g (sin cable)' },
      { label: 'Cable',               value: 'Trenzado 2.1m · USB-A' },
      { label: 'Iluminación',         value: 'RGB LIGHTSYNC 16.8M colores' },
      { label: 'Agarre',              value: 'Ambidiestro — palm / claw / fingertip' },
      { label: 'Durabilidad clics',   value: '10 millones de clics' },
      { label: 'Software',            value: 'Logitech G HUB' },
      { label: 'Compatibilidad',      value: 'Windows / macOS / Linux' },
    ],
    gamingPerformance: [
      { game: 'FPS Competitivo (CS2, Valorant)', fps: '800 DPI',  resolution: 'Sensor óptico 8K', quality: 'Preciso y ágil'      },
      { game: 'MOBA / RTS (LoL, DOTA 2)',        fps: '1600 DPI', resolution: 'Sensor óptico 8K', quality: 'Control fluido'      },
      { game: 'Battle Royale (Warzone)',          fps: '3200 DPI', resolution: 'Sensor óptico 8K', quality: 'Respuesta exacta'   },
      { game: 'RPG / Uso general',               fps: '8000 DPI', resolution: 'Sensor óptico 8K', quality: 'Versatilidad total' },
    ],
    creativePerformance: [
      { software: 'Adobe Photoshop / Illustrator', performance: 'Bueno',     detail: 'Sensor óptico preciso para selecciones y trazados; peso ligero de 85g reduce fatiga en sesiones largas.' },
      { software: 'Diseño UI/UX (Figma)',          performance: 'Bueno',     detail: 'DPI ajustable on-the-fly para cambiar entre trabajo detallado y navegación rápida sin levantar la mano.' },
      { software: 'Edición de video (Premiere)',   performance: 'Bueno',     detail: 'Movimiento fluido en línea de tiempo; polling 1000Hz garantiza precisión al cortar y ajustar clips.' },
      { software: 'Trabajo diario / Oficina',      performance: 'Muy bueno', detail: 'Liviano, diseño ambidiestro y cable largo; cómodo para uso todo el día en oficina o home office.' },
    ],
    features: [
      { icon: '🖱️', label: 'Sensor óptico 8000 DPI' },
      { icon: '⚡', label: '1000Hz polling rate' },
      { icon: '🌈', label: 'RGB LIGHTSYNC 16.8M colores' },
      { icon: '🪶', label: '85g ultral igero' },
      { icon: '🎮', label: '6 botones programables' },
      { icon: '🔌', label: 'Cable trenzado 2.1m' },
    ],
    images: [],
    price: '$ 139.990',
    numericPrice: 139990,
  },

  // ── TECLADO MECÁNICO ─────────────────────────────────────────────────────
  {
    id: 'teclado-redragon-k552',
    badge: 'Ejemplo',
    category: 'Teclados mecánicos',
    categorySlug: 'teclados',
    name: 'Redragon K552 KUMARA',
    specs: 'TKL 87 teclas · Switches Outemu Red · RGB · Anti-ghosting · USB',
    shortDescription:
      'Redragon K552 KUMARA – Teclado mecánico TKL | Outemu Red | RGB | Gaming Colombia\n\nTeclado mecánico TKL de 87 teclas con switches Outemu Red (lineales), retroiluminación RGB, anti-ghosting completo y construcción compacta sin teclado numérico. Ideal para gaming competitivo y escritura prolongada.',
    description:
      'El Redragon K552 KUMARA es uno de los teclados mecánicos más populares en el segmento de entrada al gaming profesional: switches Outemu Red lineales con accionamiento suave a 45g de fuerza y sin punto táctil, perfectos para pulsaciones rápidas en FPS y para escritura prolongada sin fatiga.\n\nEl formato TKL de 87 teclas elimina el teclado numérico para ganar espacio en el escritorio y permitir una posición del mouse más cercana al cuerpo, reduciendo la tensión en el hombro. Sin sacrificar ninguna función esencial, mantiene todas las teclas de función, flechas y navegación en su lugar.\n\nLa retroiluminación RGB individual por tecla ofrece múltiples modos preconfigurados sin necesidad de software adicional, con hasta 19 efectos seleccionables directamente desde el teclado. El anti-ghosting completo garantiza que todas las pulsaciones simultáneas sean registradas sin errores, crucial en situaciones de alta acción. Construcción resistente con base metálica y cable USB trenzado de 1.8m.',
    fullSpecs: [
      { label: 'Tipo de switches',    value: 'Outemu Red (lineales, 45g)' },
      { label: 'Distribución',        value: 'TKL — 87 teclas' },
      { label: 'Retroiluminación',    value: 'RGB individual por tecla · 19 efectos' },
      { label: 'Anti-ghosting',       value: 'Completo (N-Key Rollover)' },
      { label: 'Durabilidad switches',value: '50 millones de pulsaciones' },
      { label: 'Construcción',        value: 'Base metálica + cubierta ABS' },
      { label: 'Cable',               value: 'USB trenzado 1.8m' },
      { label: 'Fuerza de accionamiento', value: '45g' },
      { label: 'Pre-travel',          value: '2mm · Total: 4mm' },
      { label: 'Software',            value: 'Sin necesidad de software (configuración onboard)' },
    ],
    gamingPerformance: [
      { game: 'FPS Competitivo (CS2, Valorant)', fps: 'Outemu Red', resolution: 'TKL 87 teclas', quality: 'Respuesta lineal rápida'  },
      { game: 'MOBA / RTS (LoL, StarCraft)',      fps: 'Outemu Red', resolution: 'TKL 87 teclas', quality: 'Accionamiento preciso'   },
      { game: 'RPG / Aventura',                   fps: 'Outemu Red', resolution: 'TKL 87 teclas', quality: 'Pulsaciones suaves'      },
      { game: 'Uso mixto gaming + trabajo',       fps: 'Outemu Red', resolution: 'TKL 87 teclas', quality: 'Versátil y compacto'    },
    ],
    creativePerformance: [
      { software: 'Escritura / Documentos',          performance: 'Muy bueno', detail: 'Switches Red lineales cómodos para escritura prolongada; 50M pulsaciones garantizan años de durabilidad.' },
      { software: 'Programación (VS Code)',           performance: 'Muy bueno', detail: 'Formato TKL compacto con teclas de función completas; ideal para shortcuts de desarrollo y navegación.' },
      { software: 'Edición de video / Shortcuts',    performance: 'Bueno',     detail: 'Cubre todos los atajos de Premiere y DaVinci; sin teclas macro nativas pero con buen registro simultáneo.' },
      { software: 'Diseño gráfico (Photoshop/Figma)',performance: 'Bueno',     detail: 'Anti-ghosting completo activa todos los atajos de herramientas sin pérdida de pulsaciones.' },
    ],
    features: [
      { icon: '⌨️', label: 'Switches Outemu Red lineales' },
      { icon: '📐', label: 'Formato TKL 87 teclas' },
      { icon: '🌈', label: 'RGB individual · 19 efectos' },
      { icon: '🛡️', label: 'Anti-ghosting N-Key Rollover' },
      { icon: '🏗️', label: 'Base metálica resistente' },
      { icon: '🔌', label: 'Cable USB trenzado 1.8m' },
    ],
    images: [],
    price: '$ 159.990',
    numericPrice: 159990,
  },

  // ── MICRÓFONO ────────────────────────────────────────────────────────────
  {
    id: 'microfono-hyperx-solocast',
    badge: 'Ejemplo',
    category: 'Micrófonos',
    categorySlug: 'microfonos',
    name: 'HyperX SoloCast',
    specs: 'USB · Cardioide · 16-bit / 48kHz · Tap-to-mute · Soporte flexible',
    shortDescription:
      'HyperX SoloCast – Micrófono USB cardioide | 16-bit / 48kHz | Streaming Colombia\n\nMicrófono USB de condensador con patrón cardioide, resolución 16-bit / 48kHz, función tap-to-mute y soporte articulado incluido. Plug-and-play sin drivers. Ideal para streaming, podcast y gaming.',
    description:
      'El HyperX SoloCast es el micrófono USB diseñado específicamente para streamers y gamers que buscan calidad de audio profesional sin la complejidad de una interfaz de audio. Plug-and-play total: conecta y habla — Windows y macOS lo reconocen automáticamente sin instalar ningún driver.\n\nSu patrón polar cardioide captura la voz directamente al frente mientras rechaza los sonidos laterales y traseros, minimizando el ruido del teclado mecánico, el ventilador del PC y el ambiente de la habitación. La resolución de 16-bit / 48kHz garantiza una voz nítida, cálida y sin artefactos digitales en cualquier plataforma.\n\nLa función tap-to-mute con LED indicador permite silenciar el micrófono con un solo toque, sin interrumpir el flujo de una partida o transmisión. El soporte articulado incluido ofrece ajuste de ángulo y rotación de 180°, adaptándose a cualquier posición del escritorio. Compatible con Discord, OBS, Streamlabs, Zoom y cualquier software de audio estándar.',
    fullSpecs: [
      { label: 'Tipo',                value: 'Condensador USB' },
      { label: 'Patrón polar',        value: 'Cardioide' },
      { label: 'Resolución',          value: '16-bit / 48kHz' },
      { label: 'Respuesta en frecuencia', value: '20Hz – 20kHz' },
      { label: 'Sensibilidad',        value: '-42dBFS (1 Pa a 1kHz)' },
      { label: 'Mute',                value: 'Tap-to-mute con LED indicador' },
      { label: 'Conexión',            value: 'USB-C (cable USB-C a USB-A incluido)' },
      { label: 'Soporte',             value: 'Articulado ajustable incluido · 180°' },
      { label: 'Compatibilidad',      value: 'Windows / macOS — sin drivers' },
      { label: 'Peso',                value: '238g (con soporte)' },
    ],
    gamingPerformance: [
      { game: 'Streaming en vivo (Twitch, YouTube)', fps: 'Cardioide', resolution: '16-bit / 48kHz', quality: 'Voz clara y definida'    },
      { game: 'Gaming con equipo (Discord)',          fps: 'Cardioide', resolution: '16-bit / 48kHz', quality: 'Captura vocal directa'  },
      { game: 'Podcast y entrevistas',               fps: 'Cardioide', resolution: '16-bit / 48kHz', quality: 'Sonido cálido y natural' },
      { game: 'Videollamadas (Zoom, Meet)',           fps: 'Cardioide', resolution: '16-bit / 48kHz', quality: 'Voz inteligible y limpia'},
    ],
    creativePerformance: [
      { software: 'OBS Studio / Streamlabs',     performance: 'Excelente', detail: 'Plug-and-play, patrón cardioide y tap-to-mute integrado — la combinación perfecta para streaming profesional.' },
      { software: 'Discord / TeamSpeak',         performance: 'Excelente', detail: 'Voz nítida en tiempo real; el cardioide rechaza ruido de teclado y ambiente en comunicación gaming.' },
      { software: 'Adobe Audition / Audacity',   performance: 'Bueno',     detail: 'Captura 16-bit / 48kHz limpia para voz en off, podcasts y locución; sin control de ganancia físico.' },
      { software: 'Grabación musical básica',    performance: 'Aceptable', detail: 'Funciona para demos y voz; no reemplaza un micrófono XLR de condensador para producción profesional.' },
    ],
    features: [
      { icon: '🎤', label: 'Patrón cardioide USB-C' },
      { icon: '🔇', label: 'Tap-to-mute con LED' },
      { icon: '🎵', label: '16-bit / 48kHz estudio' },
      { icon: '🔌', label: 'Plug-and-play sin drivers' },
      { icon: '🔄', label: 'Soporte articulado 180°' },
      { icon: '💻', label: 'Windows y macOS compatible' },
    ],
    images: [],
    price: '$ 229.990',
    numericPrice: 229990,
  },

  // ── AUDÍFONOS ────────────────────────────────────────────────────────────
  {
    id: 'audifonos-hyperx-cloud-stinger',
    badge: 'Ejemplo',
    category: 'Audífonos',
    categorySlug: 'audifonos',
    name: 'HyperX Cloud Stinger',
    specs: 'Drivers 50mm · 7.1 Virtual · Micrófono abatible · USB / 3.5mm · 275g',
    shortDescription:
      'HyperX Cloud Stinger – Audífonos gaming | Drivers 50mm | 7.1 Virtual | Colombia\n\nAudífonos gaming con drivers de 50mm orientados hacia el oído para mayor inmersión, audio 7.1 virtual, micrófono abatible con mute automático y almohadillas de cuero suave. Livianos (275g) para sesiones largas.',
    description:
      'Los HyperX Cloud Stinger son los audífonos gaming diseñados para el jugador que valora la comodidad en sesiones largas sin sacrificar la calidad de audio. Los drivers de 50mm orientados hacia el oído crean un sonido más envolvente y detallado, especialmente en la localización de pasos y disparos en juegos FPS donde el audio es una ventaja competitiva real.\n\nCon un peso de solo 275g y almohadillas de cuero suave con memoria de forma, el Cloud Stinger minimiza la fatiga incluso en partidas de varias horas. El arco de metal ajustable garantiza durabilidad y se adapta a cualquier tamaño de cabeza. El control de volumen en la copa derecha permite ajustes rápidos sin interrumpir el juego.\n\nEl micrófono abatible con cancelación de ruido activa el mute automáticamente al subirlo, evitando que el equipo te escuche involuntariamente. Compatible con PC vía USB para 7.1 virtual, y con consolas, móvil y cualquier dispositivo vía jack 3.5mm. Software HyperX NGENUITY disponible para personalización de ecualizador y efectos de audio.',
    fullSpecs: [
      { label: 'Drivers',              value: '50mm orientados al oído' },
      { label: 'Respuesta en frecuencia', value: '10Hz – 28kHz' },
      { label: 'Impedancia',           value: '30 Ω' },
      { label: 'Audio',                value: '7.1 Virtual (USB) · Stereo (3.5mm)' },
      { label: 'Micrófono',            value: 'Abatible · Mute automático al subir' },
      { label: 'Frecuencia del mic',   value: '100Hz – 6.8kHz' },
      { label: 'Conexión',             value: 'USB + 3.5mm (ambos incluidos)' },
      { label: 'Peso',                 value: '275g' },
      { label: 'Almohadillas',         value: 'Cuero suave con memoria de forma' },
      { label: 'Software',             value: 'HyperX NGENUITY (opcional)' },
    ],
    gamingPerformance: [
      { game: 'FPS Competitivo (CS2, Valorant)', fps: 'Drivers 50mm', resolution: '7.1 Virtual', quality: 'Posicionamiento preciso' },
      { game: 'Battle Royale (Warzone, PUBG)',   fps: 'Drivers 50mm', resolution: '7.1 Virtual', quality: 'Sonido envolvente'       },
      { game: 'RPG / Aventura AAA',              fps: 'Drivers 50mm', resolution: 'Stereo',      quality: 'Audio inmersivo'         },
      { game: 'Streaming y multimedia',          fps: 'Drivers 50mm', resolution: 'Stereo',      quality: 'Voz y música equilibradas'},
    ],
    creativePerformance: [
      { software: 'OBS Studio / Streaming',     performance: 'Muy bueno', detail: 'Micrófono con cancelación de ruido y mute automático al levantar; cómodo para sesiones largas de transmisión.' },
      { software: 'Discord / Comunicación',     performance: 'Excelente', detail: 'Voz clara con el micrófono abatible; mute intuitivo sin tocar software y respuesta de frecuencia vocal precisa.' },
      { software: 'Adobe Premiere / Edición',   performance: 'Bueno',     detail: 'Drivers 50mm con buena representación de bajos y medios; adecuado para revisión de audio en edición básica.' },
      { software: 'Música / Entretenimiento',   performance: 'Bueno',     detail: 'Sonido balanceado y agradable para consumo multimedia; no está orientado a mezcla ni masterización.' },
    ],
    features: [
      { icon: '🎧', label: 'Drivers 50mm orientados al oído' },
      { icon: '🔊', label: 'Audio 7.1 Virtual USB' },
      { icon: '🎤', label: 'Micrófono abatible mute auto' },
      { icon: '🪶', label: '275g ultraligero' },
      { icon: '🔌', label: 'USB + jack 3.5mm incluidos' },
      { icon: '🛋️', label: 'Almohadillas cuero memoria' },
    ],
    images: [],
    price: '$ 249.990',
    numericPrice: 249990,
  },

  // ── CÁMARA ───────────────────────────────────────────────────────────────
  {
    id: 'camara-logitech-c920',
    badge: 'Ejemplo',
    category: 'Cámaras',
    categorySlug: 'camaras',
    name: 'Logitech C920 HD Pro',
    specs: 'Full HD 1080p / 30fps · Óptica Carl Zeiss · Autofocus · Micrófono estéreo · USB',
    shortDescription:
      'Logitech C920 HD Pro – Webcam Full HD | 1080p | Autofocus | Streaming Colombia\n\nWebcam Full HD 1080p con óptica Carl Zeiss, autofocus automático, micrófono estéreo dual con cancelación de ruido y corrección de luz automática. La cámara de referencia para streaming, videollamadas y creación de contenido.',
    description:
      'La Logitech C920 HD Pro es la webcam más reconocida del mercado para streaming y videollamadas profesionales: décadas de confianza en la industria respaldada por la óptica Carl Zeiss de vidrio, que garantiza imágenes nítidas, colores naturales y una reproducción fiel de la realidad que las lentes plásticas simplemente no logran.\n\nEl autofocus automático mantiene tu imagen siempre en foco, incluso si te mueves o acercas a la cámara, mientras que la corrección de luz automática adapta la exposición en tiempo real sin necesidad de ajustes manuales. Todo esto hace que la C920 se vea bien en cualquier condición de iluminación, desde escritorios oscuros hasta habitaciones bien iluminadas.\n\nEl micrófono estéreo dual con cancelación de ruido captura audio claro y natural desde dos ángulos, creando una sensación de presencia más amplia que los micrófonos mono. Compatible con Zoom, Teams, Google Meet, OBS, Streamlabs y cualquier software de videoconferencia o streaming. Plug-and-play sin drivers en Windows, macOS y Chrome OS.',
    fullSpecs: [
      { label: 'Resolución máxima',   value: '1080p Full HD / 30fps' },
      { label: 'Resolución alternativa', value: '720p / 30fps' },
      { label: 'Óptica',              value: 'Carl Zeiss (vidrio) con autofocus' },
      { label: 'Campo visual (FOV)',   value: '78°' },
      { label: 'Micrófono',           value: 'Estéreo dual con cancelación de ruido' },
      { label: 'Corrección de luz',   value: 'Automática (RightLight 2)' },
      { label: 'Conexión',            value: 'USB-A · Clip universal incluido' },
      { label: 'Compatibilidad',      value: 'Windows / macOS / Chrome OS — sin drivers' },
      { label: 'Longitud del cable',  value: '1.5m' },
      { label: 'Software',            value: 'Logi Tune (opcional)' },
    ],
    gamingPerformance: [
      { game: 'Streaming en vivo (Twitch, YouTube)', fps: '1080p / 30fps', resolution: 'Full HD',  quality: 'Imagen nítida y estable'   },
      { game: 'Videollamadas (Zoom, Teams)',          fps: '1080p / 30fps', resolution: 'Full HD',  quality: 'Autofocus automático'      },
      { game: 'Grabación de tutoriales / Vlogs',     fps: '1080p / 30fps', resolution: 'Full HD',  quality: 'Color natural Carl Zeiss'  },
      { game: 'Facecam gaming / Overlay',            fps: '720p / 30fps',  resolution: 'HD Ready', quality: 'Movimiento fluido y limpio' },
    ],
    creativePerformance: [
      { software: 'OBS Studio / Streamlabs',       performance: 'Excelente', detail: 'Imagen 1080p estable con autofocus y corrección de luz automática RightLight 2; plug-and-play sin drivers.' },
      { software: 'Zoom / Google Meet / Teams',    performance: 'Excelente', detail: 'Micrófono estéreo dual con cancelación de ruido y video Full HD nítido — la referencia para videollamadas.' },
      { software: 'Adobe Premiere (grabación B-roll)', performance: 'Bueno', detail: 'Captura 1080p con óptica Carl Zeiss; ideal para grabación de tutoriales, unboxings y contenido casual.' },
      { software: 'Fotografía / Referencia visual', performance: 'Aceptable', detail: 'No sustituye una cámara dedicada; sin control manual de apertura, ISO ni obturador para trabajo profesional.' },
    ],
    features: [
      { icon: '📷', label: 'Full HD 1080p / 30fps' },
      { icon: '🔍', label: 'Óptica Carl Zeiss + autofocus' },
      { icon: '🎤', label: 'Micrófono estéreo dual' },
      { icon: '💡', label: 'Corrección de luz automática' },
      { icon: '🔌', label: 'Plug-and-play sin drivers' },
      { icon: '🖥️', label: 'Clip universal incluido' },
    ],
    images: [],
    price: '$ 349.990',
    numericPrice: 349990,
  },
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
