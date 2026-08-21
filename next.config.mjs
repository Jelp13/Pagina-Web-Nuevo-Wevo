const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Evita que el build abra demasiadas conexiones simultáneas a MySQL
    // durante la generación de páginas estáticas (el plan de Hostinger
    // limita el usuario de la base de datos a 75 conexiones a la vez).
    cpus: 2,
    workerThreads: false,
  },
};

export default nextConfig;
