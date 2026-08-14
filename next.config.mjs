const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 2592000, // 30 días — las imágenes de producto casi no cambian
  },
};

export default nextConfig;
