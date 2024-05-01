<script lang="ts" setup>
import { window } from '@tauri-apps/api'

onBeforeMount(async () => {
	const { t } = useI18n()
	const win = window.getCurrent()

	win.setTitle(t(await win.title()))
})
</script>

<template>
	<v-app>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</v-app>
</template>
