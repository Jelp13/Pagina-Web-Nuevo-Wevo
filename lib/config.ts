/**
 * Configuración global de la aplicación
 * Centraliza URLs, constantes y settings del proyecto
 */

// URLs base y contacto
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nuevowevo.com';
export const WHATSAPP_LINK = 'https://wa.me/573163713928';
export const CONTACT_EMAIL = 'contact@nuevowevo.com';

// Metadata y SEO
export const SITE_NAME = 'Nuevo Wevo';
export const SITE_DESCRIPTION =
  'Tienda online de PCs gaming minimalistas en Colombia. Encuentra torres personalizadas, periféricos y asesoría profesional. Envío rápido y soporte incluido.';
export const SITE_KEYWORDS = [
  'PCgaming',
  'torres gaming',
  'computadores gaming',
  'tienda gamer',
  'PC minimalista',
  'accesorios gaming',
  'Colombia',
];

// Redes sociales
export const SOCIAL_MEDIA = {
  whatsapp: WHATSAPP_LINK,
  instagram: 'https://instagram.com/nuevowevo',
  twitter: 'https://twitter.com/nuevowevo',
};

// Información de la empresa
export const COMPANY_INFO = {
  name: SITE_NAME,
  description: 'Tienda de PCs gaming minimalista con experiencia 100% local.',
  country: 'Colombia',
  phone: '+57 316 3713928',
};

// Rutas internas
export const ROUTES = {
  home: '/',
  quiz: '/quiz',
  torres: '/torres',
  products: '#products-anchor',
  peripherals: '#perifericos',
  brands: '#brands',
  cart: '/carrito',
  checkout: '/checkout',
  confirmation: '/checkout/confirmacion',
};

// Configuración de IVA (productos de tecnología en Colombia)
export const IVA_RATE = 0.19;

