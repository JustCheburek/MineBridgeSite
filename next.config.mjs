/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
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
