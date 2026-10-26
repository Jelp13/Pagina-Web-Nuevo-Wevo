const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Evita que el build abra demasiadas conexiones simultáneas a MySQL
    // durante la generación de páginas estáticas (el plan de Hostinger
    // limita el usuario de la base de datos a 75 conexiones a la vez).
    cpus: 2,
    workerThreads: false,
  },
  // El CDN de Hostinger cachea respuestas por su cuenta, aparte de Next.js,
  // y NO se purga solo cuando se redespliega. Un HTML viejo cacheado puede
  // quedar apuntando a archivos JS/CSS con hash que el build nuevo ya borró
  // (los hashes cambian en cada build aunque la página en sí no cambie),
  // dejando la página sin estilos o rota. Por eso TODAS las rutas de
  // páginas (estáticas o no) van sin caché de CDN; solo los assets con hash
  // en la URL (/_next/static/*, /api/imagenes/*) son seguros de cachear
  // para siempre, porque su URL cambia si su contenido cambia.
  async headers() {
    const noStore = { key: 'Cache-Control', value: 'no-store, must-revalidate' };
    const rutasDinamicas = [
      '/',
      '/torres',
      '/torres/:path*',
      '/portatiles',
      '/portatiles/:path*',
      '/perifericos',
      '/perifericos/:path*',
      '/quiz',
      '/admin/:path*',
      '/api/admin/:path*',
      '/api/checkout',
      '/api/mercadopago/:path*',
      '/carrito',
      '/checkout',
      '/checkout/confirmacion',
      '/contacto',
      '/mantenimientos',
      '/legal/:path*',
    ];

    // Encabezados de seguridad estándar en todo el sitio. El único recurso
    // externo embebido es el mapa de Google (components/ContactoMantenimientos.tsx),
    // por eso frame-src lo incluye explícitamente. style-src necesita
    // 'unsafe-inline' porque varios componentes usan `style={{...}}` (colores
    // dinámicos del CMS, animaciones). script-src también necesita
    // 'unsafe-inline': Next.js (App Router) inyecta varios <script> en línea
    // en el propio HTML para transmitir el contenido renderizado en el
    // servidor al navegador (self.__next_f.push(...)) — sin esto, el sitio
    // completo se queda en blanco porque esos scripts nunca llegan a
    // ejecutarse. No hay scripts externos ni next/font.
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "frame-src https://maps.google.com",
          "frame-ancestors 'none'",
          "object-src 'none'",
          "base-uri 'self'",
        ].join('; '),
      },
    ];

    return [
      ...rutasDinamicas.map((source) => ({ source, headers: [noStore] })),
      { source: '/:path*', headers: securityHeaders },
    ];
  },
};

export default nextConfig;
