/** @type {import('next').NextConfig} */
const nextConfig = {
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
	experimental: {
		esmExternals: "loose",
		serverComponentsExternalPackages: ["mongoose"]
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
