import { event, updater, process } from '@tauri-apps/api'
import { filesize as fs } from 'filesize'

// ------------------------------------------------------------------------------------------------
//  Definitions for the Updater
// ------------------------------------------------------------------------------------------------

interface State {
	progress: {
		current: number
		total: number
		status: string
	}

	manifest: {
		version: string
		title: string
		notes: string
	}

	error?: string
}

// ------------------------------------------------------------------------------------------------

export const useUpdater = defineStore('updater', {
	state: (): State => ({
		progress: { current: 0, total: 0, status: '' },
		manifest: { version: '', title: '', notes: '' }
	}),

	getters: {
		loading: (state) => state.progress.current === 0
	},

	actions: {
		setError(message: string) {
			this.error = message
		},

		async check() {
			const config = useRuntimeConfig()
			const { t } = useI18n()

			this.progress.status = t('updater.status.initial')

			if (config.public.isDevelopment) {
				const listeners = [
					await event.listen<{ chunkLength: 0; contentLength: 0 }>(
						'tauri://update-download-progress',
						({ payload }) => [
							(this.progress.current = payload.chunkLength),
							(this.progress.total = payload.contentLength),
							(this.progress.status = t('updater.status.downloading', {
								current: fs(payload.chunkLength),
								total: fs(payload.contentLength)
							}))
						]
					),

					await updater.onUpdaterEvent(({ status }) => {
						if (status === 'UPTODATE' || status === 'DONE')
							listeners.forEach((unListen) => unListen())
					})
				]

				const { shouldUpdate, manifest: mf } = await updater.checkUpdate()

				if (shouldUpdate) {
					this.manifest.version = mf?.version ?? '0.0.0'
					this.manifest.title = t('updater.status.newVersionFound', { version: mf?.version })
					this.manifest.notes = mf?.body ?? ''

					await updater.installUpdate()
					await process.relaunch()
				}
			}

			this.$reset()
		}
	}
})
