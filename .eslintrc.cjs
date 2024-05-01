module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended', 'prettier'],
	plugins: [],
	rules: {
		'vue/no-multiple-template-root': 'off'
	}
}
