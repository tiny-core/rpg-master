<script setup lang="ts">
import { process, window } from '@tauri-apps/api'

definePageMeta({ layout: 'blank' })

const updater = useUpdater()

onMounted(async () => {
	try {
		await updater.check()

		await window
			.getAll()
			.find((win) => win.label === 'main')
			?.show()

		window.getCurrent().close()
	} catch (err: any) {
		if (err instanceof Error) updater.setError(err.message)
		else updater.setError(err)
	}
})
</script>

<template>
	<v-row justify="center" align="center">
		<v-col class="text-center" cols="12">
			<span class="text-h2" data-tauri-drag-region>{{ $t('app.title') }}</span>
		</v-col>
		<v-col v-if="updater.error" class="text-center" cols="8">
			<div data-tauri-drag-region>Error: {{ updater.error }}</div>
			<v-divider class="my-3" />
			<div data-tauri-drag-region>
				<v-btn
					color="warning"
					variant="plain"
					prepend-icon="fas fa-repeat"
					@click="process.relaunch()"
				>
					{{ $t('updater.btn.relaunch') }}
				</v-btn>
			</div>
		</v-col>
		<v-col v-else-if="updater.manifest.title" class="text-center" cols="8">
			<v-card data-tauri-drag-region>
				<v-card-text>
					<div>{{ updater.manifest.title }}</div>
					<v-divider class="my-3" />
					<div>{{ updater.manifest.notes }}</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>

	<v-footer v-if="!updater.error" class="d-flex flex-column" app>
		<small>{{ updater.progress.status }}</small>

		<v-progress-linear
			v-model="updater.progress.current"
			:max="updater.progress.total"
			:indeterminate="updater.loading"
			color="primary"
			striped
		/>
	</v-footer>
</template>
