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
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"]
  },
  experimental: {
    ppr: 'incremental',
  }
  /*webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  }*/
};

export default nextConfig;
