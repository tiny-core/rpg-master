import type { WindowOptions } from '@tauri-apps/api/window'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/eslint-module',
		'nuxt-zod-i18n',
		'@nuxtjs/i18n',
		'nuxt-typed-router',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@vee-validate/nuxt',
		'vuetify-nuxt-module',
		'nuxt-meilisearch'
	],

	// ------------------------------------------------------------------------------------------------
	//  Module configurations
	// ------------------------------------------------------------------------------------------------

	i18n: {
		lazy: true,
		defaultLocale: 'pt',
		langDir: './locales',
		strategy: 'no_prefix',
		vueI18n: './i18n.config.ts',
		locales: [{ code: 'pt', iso: 'pt-BR', file: 'pt-BR.ts', dir: 'ltr' }]
	},

	piniaPersistedstate: { storage: 'localStorage' },

	meilisearch: {},

	// ------------------------------------------------------------------------------------------------
	//	Internal Settings
	// ------------------------------------------------------------------------------------------------

	devtools: { enabled: true },

	ssr: false,

	devServer: { port: 3000 },

	imports: { dirs: ['stores', 'schemas'] },

	css: ['~~/assets/scss/main.scss'],

	vuetify: { vuetifyOptions: './vuetify.config.ts' },

	runtimeConfig: {
		public: {
			isDevelopment: process.env.NODE_ENV === 'development',

			ngrok: {
				domain: process.env.NGROK_DOMAIN,
				token: process.env.NGROK_TOKEN
			},

			defaultWebViewWindowOptions: {
				transparent: true,
				decorations: false,
				fullscreen: false,
				minimizable: false,
				maximizable: false,
				resizable: false
			} as WindowOptions
		}
	},

	// ------------------------------------------------------------------------------------------------
	//	Vite Settings
	// ------------------------------------------------------------------------------------------------

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
			target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
			// don't minify for debug builds
			minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
			// produce sourcemaps for debug builds
			sourcemap: !!process.env.TAURI_DEBUG
		}
	}
})
