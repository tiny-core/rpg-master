<script lang="ts">
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script lang="ts" setup>
import { signInWithPopup } from 'firebase/auth'

const auth = useFirebaseAuth()
const router = useRouter()
const error = ref(null)

function signIn() {
	error.value = null

	if (auth)
		signInWithPopup(auth, googleAuthProvider)
			.then(() => router.push('/'))
			.catch((reason) => {
				console.error('Failed sign', reason)
				error.value = reason
			})
}

onMounted(() => signIn())
</script>

<template>
	<v-container class="fill-height" data-tauri-drag-region>
		<v-row justify="center" align="center">
			<v-col v-if="error" cols="12" class="text-center">
				<div data-tauri-drag-region>{{ error }}</div>
				<v-divider class="my-3" />
				<v-btn prepend-icon="fab fa-google" @click="signIn">Login</v-btn>
			</v-col>
			<v-col v-else class="text-center">
				<v-progress-circular size="60" indeterminate />
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped></style>
