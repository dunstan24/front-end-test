/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours — Vercel CDN image cache
  },
  // Vercel-friendly: compress responses
  compress: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
};

export default nextConfig;
