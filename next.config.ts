import type { NextConfig } from 'next'

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
      },
    ],
  },
  serverExternalPackages: ['mongoose', 'eslint', 'oslo', 'typescript'],
  experimental: {
    //ppr: 'incremental',
    typedEnv: true,
    //optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: '/rules/privacy-policy',
        destination: '/rules/legal/privacy-policy',
        permanent: false,
      },
      {
        source: '/rules/refund-policy',
        destination: '/rules/legal/refund-policy',
        permanent: false,
      },
      {
        source: '/rules/terms-of-use',
        destination: '/rules/legal/terms-of-use',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
