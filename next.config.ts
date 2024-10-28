import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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
  serverExternalPackages: ["oslo"],
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  }
};

export default nextConfig;
