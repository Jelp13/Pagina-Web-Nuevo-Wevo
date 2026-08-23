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
    return rutasDinamicas.map((source) => ({ source, headers: [noStore] }));
  },
};

export default nextConfig;
