<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

// we don't need this watcher on server
onMounted(() => {
	watch(user, (user, prevUser) => {
		if (prevUser && !user) {
			// user logged out
			router.push('/auth/login')
		} else if (user && typeof route.query.redirect === 'string') {
			// user logged in
			router.push(route.query.redirect)
		}
	})
})
</script>

<template>
	<v-app>
		<NuxtLayout data-tauri-drag-region>
			<NuxtPage />
		</NuxtLayout>
	</v-app>
</template>

<style lang="scss">
body,
html {
	overflow: hidden;
	border-radius: 10px;
}

.bg-image {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

* {
	user-select: none;
}
</style>
