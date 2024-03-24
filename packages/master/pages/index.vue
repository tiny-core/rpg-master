<script setup lang="ts">
import type { Tauri } from '@rpg-master/schemas/types/tauri'
import { updater, event, process } from '@tauri-apps/api'
import { filesize } from 'filesize'

definePageMeta({ layout: 'blank' })

const router = useRouter()

const config = useRuntimeConfig()

const updateManifest = ref<updater.UpdateManifest>()
const updateProgress = ref<Tauri.UpdateDownloadProgress>({ chunkLength: 0, contentLength: 0 })
const updateStatus = ref('Procurando por atualizações')
const updateError = ref<any>(null)

const unListen = await event.listen<Tauri.UpdateDownloadProgress>(
	'tauri://update-download-progress',
	({ payload }) => [
		(updateProgress.value = payload),
		(updateStatus.value = `Baixando ${filesize(payload.chunkLength)} de ${filesize(payload.contentLength)}`)
	]
)

onMounted(async () => {
	try {
		if (config.public.NODE_ENV === 'production') {
			const { shouldUpdate, manifest } = await updater.checkUpdate()

			if (shouldUpdate) {
				updateManifest.value = manifest
				updateStatus.value = 'Atualizando...'

				await updater.installUpdate()
			}
		}

		router.push('/dashboard')
	} catch (error) {
		updateError.value = error
	}
})

onBeforeUnmount(() => unListen())
</script>

<template>
	<v-container class="fill-height" fluid data-tauri-drag-region>
		<v-row justify="center" align="center" data-tauri-drag-region>
			<v-col class="text-center" cols="12">
				<span class="text-h2" data-tauri-drag-region>RPG Master</span>
			</v-col>

			<v-col v-if="updateError" class="text-center" cols="8">
				<div data-tauri-drag-region>Error: {{ updateError }}</div>
				<v-divider class="my-3" />
				<div data-tauri-drag-region>
					<v-btn
						color="warning"
						variant="plain"
						prepend-icon="fas fa-repeat"
						@click="process.relaunch()"
					>
						Tentar atualizar novamente
					</v-btn>
					<v-btn
						color="success"
						variant="plain"
						prepend-icon="fas fa-circle-check"
						@click="router.push('/dashboard')"
					>
						Continuar sem atualizar
					</v-btn>
				</div>
			</v-col>

			<v-col v-else-if="updateManifest" class="text-center" cols="8">
				<v-card data-tauri-drag-region>
					<v-card-text>
						<div>Atualizando para a versão {{ updateManifest.version }}</div>
						<v-divider class="my-3" />
						<div>{{ updateManifest.body }}</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>

	<v-footer v-if="!updateError" class="d-flex flex-column" app>
		<small>{{ updateStatus }}</small>
		<v-progress-linear
			color="primary"
			:model-value="updateProgress.chunkLength"
			:max="updateProgress.contentLength"
			:indeterminate="updateProgress.chunkLength === 0"
			striped
		/>
	</v-footer>
</template>
