<script setup lang="ts">
definePageMeta({ middleware: ['auth'] })

const auth = useFirebaseAuth()

const route = useRoute()
</script>

<template>
	<v-container>
		<v-row>
			<v-col>
				<div>
					<h1>Nuxt Routing set up successfully!</h1>
					<p>Current route: {{ route.path }}</p>
					<a href="https://nuxt.com/docs/getting-started/routing" target="_blank"
						>Learn more about Nuxt Routing</a
					>
				</div>
			</v-col>
			<v-col cols="12">
				<v-btn color="warning" @click="auth?.signOut()">Logout</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
