import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ]
  },
  serverExternalPackages: ["mongoose", "eslint", "oslo", "typescript"],
  experimental: {
    // ppr: 'incremental',
    typedEnv: true,
    optimizeCss: true
  }
};

export default nextConfig;
