export default defineI18nLocale(() => ({
	app: {
		title: 'RPG Master'
	},

	updater: {
		btn: { relaunch: 'Tentar atualizar novamente' },
		status: {
			initial: 'Procurando por atualizações...',
			newVersionFound: 'Atualizando para a versão: {version}',
			downloading: 'Baixando {current} de {total}'
		}
	}
}))
