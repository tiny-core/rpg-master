import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
	// theme: { defaultTheme: 'dark' },
	icons: {
		defaultSet: 'fa-svg',
		svg: {
			fa: {
				libraries: [
					[false, 'fas', '@fortawesome/free-solid-svg-icons'],
					[false, 'fab', '@fortawesome/free-brands-svg-icons'],
					[false, 'far', '@fortawesome/free-regular-svg-icons']
				]
			}
		}
	}
})
