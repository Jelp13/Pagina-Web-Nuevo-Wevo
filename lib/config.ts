/**
 * Configuración global de la aplicación
 * Centraliza URLs, constantes y settings del proyecto
 */

// URLs base y contacto
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nuevowevo.com';
export const WHATSAPP_LINK = 'https://wa.me/573103050607';
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
  phone: '+57 310 305 0607',
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

// Wompi (pasarela de pagos recomendada para Colombia)
// Documentación: https://docs.wompi.co
export const WOMPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || '';
export const WOMPI_SANDBOX_PUBLIC_KEY = process.env.NEXT_PUBLIC_WOMPI_SANDBOX_KEY || 'pub_test_xxxxx';
