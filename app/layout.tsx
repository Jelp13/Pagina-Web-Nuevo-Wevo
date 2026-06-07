/**
 * Root Layout - Configuración global de la aplicación
 * 
 * Este archivo configura:
 * - Metadata y SEO (título, descripción, og:image, etc)
 * - Estructura HTML base
 * - Fuentes y estilos globales
 * - JSON-LD Schema para search engines
 */

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_KEYWORDS, COMPANY_INFO } from '@/lib/config';
import WhatsAppButton from '@/components/WhatsAppBubble';

// Configuración de metadatos para SEO
export const metadata: Metadata = {
  // Títulos y descripciones
  title: `${SITE_NAME} | Tienda Gaming Minimalista en Colombia`,
  description: SITE_DESCRIPTION,

  // Keywords para búsqueda
  keywords: SITE_KEYWORDS,

  // Información general
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,

  // URLs canónicas (evita contenido duplicado)
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },

  // Open Graph (para redes sociales y compartir)
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    title: `${SITE_NAME} | Tienda Gaming Minimalista`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Nuevo Wevo - Tienda de PCs Gaming',
      },
    ],
  },

  // Twitter Card (para compartir en Twitter/X)
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Tienda Gaming Minimalista`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },

  // Robots (instrucciones para search engines)
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  // Verificación del sitio
  verification: {
    google: 'your-google-site-verification',
  },
};

// Configuración del viewport para optimizar en mobile
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#05080f',
};

/**
 * Genera el JSON-LD schema para que Google entienda mejor el sitio
 * Esto mejora significativamente el SEO y las rich snippets
 */
function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: COMPANY_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: COMPANY_INFO.country,
    },
    areaServed: {
      '@type': 'Country',
      name: COMPANY_INFO.country,
    },
    priceRange: '$$$$',
    sameAs: [
      'https://instagram.com/nuevowevo',
      'https://twitter.com/nuevowevo',
    ],
    contactType: 'Sales',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales Support',
      telephone: COMPANY_INFO.phone,
    },
    knowsAbout: [
      'PC Gaming',
      'Computadores',
      'Periféricos Gaming',
      'Torres Gaming',
      'Asesoría Técnica',
    ],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" dir="ltr">
      <head>
        {/* JSON-LD Schema para mejor SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJsonLd()),
          }}
        />

        {/* Preconectar a dominios externos para mejorar velocidad */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Favicon y app icons */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#05080f] text-[#eef4ff] antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
