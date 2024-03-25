import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

// #6726B6

export default defineVuetifyConfiguration({
	theme: {
		defaultTheme: 'dark',
		themes: {
			dark: {
				dark: true,
				colors: {
					background: '#181818'
				}
			}
		}
	},

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
