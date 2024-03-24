// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['nuxt-typed-router', '@hypernym/nuxt-anime', 'vuetify-nuxt-module', 'nuxt-vuefire'],

	//------------------------------------------------------------------------------------------------
	//   Module configurations
	//------------------------------------------------------------------------------------------------

	anime: { composables: true },

	vuetify: { vuetifyOptions: './vuetify.config.ts' },

	vuefire: {
		auth: { enabled: true },

		config: {
			apiKey: process.env.VUEFIRE_API_KEY,
			authDomain: process.env.VUEFIRE_AUTH_DOMAIN,
			projectId: process.env.VUEFIRE_PROJECT_ID,
			appId: process.env.VUEFIRE_APP_ID,
			measurementId: process.env.VUEFIRE_MEASUREMENT_ID,
			storageBucket: process.env.VUEFIRE_STORAGE_BUCKET,
			messagingSenderId: process.env.VUEFIRE_MESSAGING_SENDER_ID
		}
	},

	//------------------------------------------------------------------------------------------------

	ssr: false,

	devtools: { enabled: true },

	devServer: { port: 3000 },

	imports: { dirs: ['utils'] },

	vite: {
		// prevent vite from obscuring rust errors
		clearScreen: true,
		// Tauri expects a fixed port, fail if that port is not available
		server: { strictPort: true },

		envPrefix: [
			'VITE_',
			'TAURI_PLATFORM',
			'TAURI_ARCH',
			'TAURI_FAMILY',
			'TAURI_PLATFORM_VERSION',
			'TAURI_PLATFORM_TYPE',
			'TAURI_DEBUG'
		],

		build: {
			// Tauri uses Chromium on Windows and WebKit on macOS and Linux
			target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
			// don't minify for debug builds
			minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
			// produce sourcemaps for debug builds
			sourcemap: !!process.env.TAURI_DEBUG
		}
	}
})
