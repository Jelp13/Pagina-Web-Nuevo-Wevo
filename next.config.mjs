const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Evita que el build abra demasiadas conexiones simultáneas a MySQL
    // durante la generación de páginas estáticas (el plan de Hostinger
    // limita el usuario de la base de datos a 75 conexiones a la vez).
    cpus: 2,
    workerThreads: false,
  },
  // El CDN de Hostinger cachea respuestas por su cuenta, aparte de Next.js.
  // Estas rutas dependen de la base de datos y deben verse siempre en vivo
  // (catálogo público que cambia desde el panel admin, y el panel/API mismos).
  async headers() {
    const noStore = { key: 'Cache-Control', value: 'no-store, must-revalidate' };
    // OJO: /api/imagenes/* queda fuera a propósito — esas sí deben cachearse
    // (una imagen subida nunca cambia de contenido una vez creada).
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
    ];
    return rutasDinamicas.map((source) => ({ source, headers: [noStore] }));
  },
};

export default nextConfig;
