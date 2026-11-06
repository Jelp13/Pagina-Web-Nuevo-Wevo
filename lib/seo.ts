import { SITE_URL } from './config';

// Recorta una descripción larga a un tamaño razonable para la meta
// description (Google la corta de todas formas alrededor de los 155-160
// caracteres; mejor cortarla nosotros en un espacio limpio que dejar que
// la corte a la mitad de una palabra).
export function truncateForMeta(text: string, maxLength = 155): string {
  const clean = text.trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export interface ProductSpecLite {
  label: string;
  value: string;
}

// "AMD Ryzen 5 7600X (6C/12T, hasta 5.3 GHz)" -> "Ryzen 5 7600X"
function shortenCpu(raw: string): string {
  return raw
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^AMD\s+/i, '')
    .replace(/^Intel\s+/i, '')
    .trim();
}

// "NVIDIA GeForce RTX 5060 Ti 8GB" -> "RTX 5060 Ti"
function shortenGpu(raw: string): string {
  return raw
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^NVIDIA\s+GeForce\s+/i, '')
    .replace(/^NVIDIA\s+/i, '')
    .replace(/^AMD\s+/i, '')
    .replace(/\s+\d+\s*GB$/i, '')
    .trim();
}

// Arma el título final a partir de las partes encontradas. Si no se
// identificó ninguna spec útil, o el resultado queda demasiado largo
// para un title tag, cae de vuelta al título simple — nunca rompe nada,
// en el peor caso se ve igual que antes de este cambio.
function composeEnrichedTitle(name: string, kind: string, parts: string[]): string {
  if (parts.length === 0) return `${name} | Nuevo Wevo`;
  const core = `${name} – ${kind} ${parts.join(' ')}`;
  if (core.length > 75) return `${name} | Nuevo Wevo`;
  return `${core} | Nuevo Wevo`;
}

function findSpec(fullSpecs: ProductSpecLite[], pattern: RegExp): string | undefined {
  return fullSpecs.find((s) => pattern.test(s.label))?.value;
}

// Título de producto enriquecido con CPU/GPU para búsqueda ("Torre Wevo
// Pochado – PC Gamer Ryzen 5 7600X RTX 5060 Ti | Nuevo Wevo") en vez del
// genérico "{nombre} | Nuevo Wevo". Las specs son texto libre cargado
// desde el panel admin (sin una etiqueta fija), así que se busca por
// coincidencia de palabra clave en el label, no por un nombre exacto.
export function buildProductTitle(input: { name: string; fullSpecs: ProductSpecLite[]; kind: string }): string {
  const cpuSpec = findSpec(input.fullSpecs, /procesador|\bcpu\b/i);
  const gpuSpec = findSpec(input.fullSpecs, /gr[aá]fic|\bgpu\b/i);

  const parts: string[] = [];
  if (cpuSpec) parts.push(shortenCpu(cpuSpec));
  if (gpuSpec) parts.push(shortenGpu(gpuSpec));

  return composeEnrichedTitle(input.name, input.kind, parts);
}

// --- Extractores cortos para specs de periféricos (texto libre) ---

function shortResolution(raw: string): string | null {
  if (/2160|4k|uhd/i.test(raw)) return '4K';
  if (/1440|qhd|\b2k\b/i.test(raw)) return '1440p';
  if (/1080|full ?hd|\bfhd\b/i.test(raw)) return '1080p';
  if (/720|\bhd\b/i.test(raw)) return '720p';
  return null;
}

function shortHz(raw: string): string | null {
  const m = raw.match(/(\d+)\s*hz/i);
  return m ? `${m[1]}Hz` : null;
}

function shortMs(raw: string): string | null {
  const m = raw.match(/(\d+)\s*ms/i);
  return m ? `${m[1]}ms` : null;
}

function shortFps(raw: string): string | null {
  const m = raw.match(/(\d+)\s*fps/i);
  return m ? `${m[1]}fps` : null;
}

function shortDpi(raw: string): string | null {
  const m = raw.match(/([\d][\d.,]*)\s*dpi/i);
  return m ? `${m[1]} DPI` : null;
}

function shortHours(raw: string): string | null {
  const m = raw.match(/(\d+)\s*horas?/i);
  return m ? `${m[1]}h` : null;
}

function shortConnection(raw: string): string | null {
  if (/bluetooth/i.test(raw)) return 'Bluetooth';
  if (/inal[aá]mbric|wireless/i.test(raw)) return 'Inalámbrico';
  if (/usb-c/i.test(raw)) return 'USB-C';
  if (/\busb\b/i.test(raw)) return 'USB';
  if (/3\.5\s*mm/i.test(raw)) return '3.5mm';
  return null;
}

export interface PeripheralTitleInput {
  name: string;
  categorySlug: string;
  fullSpecs: ProductSpecLite[];
}

// Igual que buildProductTitle, pero para periféricos: cada categoría
// (monitores, teclados, mouse, etc.) tiene specs distintas y relevantes
// para búsqueda, así que se extraen con reglas propias por categoría en
// vez de buscar siempre CPU/GPU. Ej.: un monitor da "FHD 1080p 240Hz
// 1ms", un teclado da "Mecánico RGB USB" — solo cuando el dato
// realmente está en la ficha, nunca se inventa nada.
export function buildPeripheralTitle({ name, categorySlug, fullSpecs }: PeripheralTitleInput): string {
  const parts: string[] = [];
  let kind = 'Periférico Gamer';

  switch (categorySlug) {
    case 'monitores': {
      kind = 'Monitor Gamer';
      const res = findSpec(fullSpecs, /resoluci[oó]n/i);
      const hz = findSpec(fullSpecs, /frecuencia de refresco|refresh/i);
      const ms = findSpec(fullSpecs, /tiempo de respuesta|response/i);
      if (res) {
        const resShort = shortResolution(res);
        if (resShort) parts.push(resShort);
      }
      if (hz) {
        const hzShort = shortHz(hz);
        if (hzShort) parts.push(hzShort);
      }
      if (ms) {
        const msShort = shortMs(ms);
        if (msShort) parts.push(msShort);
      }
      break;
    }
    case 'teclados': {
      kind = 'Teclado Gamer';
      const switches = findSpec(fullSpecs, /switch/i);
      const backlight = findSpec(fullSpecs, /retroiluminaci|iluminaci/i);
      const connection = findSpec(fullSpecs, /conexi[oó]n|conectividad/i);
      if (switches && /mec[aá]n/i.test(switches)) parts.push('Mecánico');
      if (backlight && /rgb/i.test(backlight)) parts.push('RGB');
      if (connection) {
        const connShort = shortConnection(connection);
        if (connShort) parts.push(connShort);
      }
      break;
    }
    case 'mouse': {
      kind = 'Mouse Gamer';
      const sensor = findSpec(fullSpecs, /sensor|\bdpi\b/i);
      const connection = findSpec(fullSpecs, /conexi[oó]n|conectividad/i);
      if (sensor) {
        const dpi = shortDpi(sensor);
        if (dpi) parts.push(dpi);
      }
      if (connection) {
        const connShort = shortConnection(connection);
        if (connShort) parts.push(connShort);
      }
      break;
    }
    case 'audifonos': {
      kind = 'Audífonos Gamer';
      const drivers = findSpec(fullSpecs, /drivers?/i);
      const surround = findSpec(fullSpecs, /envolvente|surround/i);
      const connection = findSpec(fullSpecs, /conexi[oó]n|conectividad/i);
      if (drivers) {
        const m = drivers.match(/(\d+)\s*mm/i);
        if (m) parts.push(`${m[1]}mm`);
      }
      if (surround) {
        const m = surround.match(/(7\.1|5\.1)/);
        if (m) parts.push(`${m[1]} Surround`);
      }
      if (connection && parts.length < 2) {
        const connShort = shortConnection(connection);
        if (connShort) parts.push(connShort);
      }
      break;
    }
    case 'microfonos': {
      kind = 'Micrófono';
      const tipo = findSpec(fullSpecs, /^tipo$/i);
      const connection = findSpec(fullSpecs, /conexi[oó]n|conectividad/i);
      if (tipo && /condensador|din[aá]mico/i.test(tipo)) {
        parts.push(/condensador/i.test(tipo) ? 'Condensador' : 'Dinámico');
      }
      if (connection) {
        const connShort = shortConnection(connection);
        if (connShort) parts.push(connShort);
      }
      break;
    }
    case 'camaras': {
      kind = 'Cámara Web';
      const res = findSpec(fullSpecs, /resoluci[oó]n m[aá]xima/i) ?? findSpec(fullSpecs, /resoluci[oó]n/i);
      if (res) {
        const resShort = shortResolution(res);
        if (resShort) parts.push(resShort);
        const fps = shortFps(res);
        if (fps) parts.push(fps);
      }
      break;
    }
    default: {
      kind = 'Accesorio Gamer';
      const connection = findSpec(fullSpecs, /conexi[oó]n|conectividad|modos de conexi[oó]n/i);
      const battery = findSpec(fullSpecs, /bater[ií]a/i);
      if (connection) {
        const connShort = shortConnection(connection);
        if (connShort) parts.push(connShort);
      }
      if (battery) {
        const hours = shortHours(battery);
        if (hours) parts.push(hours);
      }
      break;
    }
  }

  return composeEnrichedTitle(name, kind, parts);
}

export interface ProductJsonLdInput {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  images: string[];
  numericPrice: number;
  inStock: boolean;
  path: string; // ej. '/torres/mi-torre'
}

export function absoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url}`;
}

export interface ProductOpenGraphInput {
  name: string;
  description: string;
  shortDescription?: string;
  images: string[];
  path: string;
}

// Open Graph específico del producto — sin esto, compartir la ficha de
// cualquier producto muestra siempre el título/imagen genérico de la
// home, porque Next hereda tal cual el openGraph del layout si la página
// no define el suyo propio.
export function buildProductOpenGraph(product: ProductOpenGraphInput) {
  const description = truncateForMeta(product.shortDescription ?? product.description);
  return {
    title: product.name,
    description,
    url: absoluteUrl(product.path),
    images: product.images.length > 0
      ? [{ url: absoluteUrl(product.images[0]), width: 1200, height: 630, alt: product.name }]
      : undefined,
  };
}

// Datos estructurados (schema.org/Product) para que Google pueda mostrar
// precio y disponibilidad directamente en el resultado de búsqueda.
export function buildProductJsonLd(product: ProductJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription ?? product.description,
    image: product.images.map(absoluteUrl),
    sku: product.id,
    brand: { '@type': 'Brand', name: 'Nuevo Wevo' },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(product.path),
      priceCurrency: 'COP',
      price: product.numericPrice,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}
