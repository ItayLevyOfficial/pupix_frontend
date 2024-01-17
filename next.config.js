module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		})
		// This is the circular dependencies plugin code. Can be used to solve circular dependencies import bugs
		// with styled components.
		// const CircularDependencyPlugin = require('circular-dependency-plugin')
		// config.plugins.push(
		// 	new CircularDependencyPlugin({
		// 		exclude: /node_modules/,
		// 		failOnError: false,
		// 		allowAsyncCycles: false,
		// 		cwd: process.cwd(),
		// 	}),
		// )
		return config
	},
	images: {
		domains: [
			'googleapis.com', 'firebasestorage.googleapis.com', 'storage.googleapis.com', 'upload.wikimedia.org',
			'localhost'
		],
	},
}