<script lang="ts" setup>
import SocialForm from '@/modules/auth/components/SocialForm/SocialForm.vue'

const loading = ref(false)

function handleGithubLogin() {
  loading.value = true

  console.log('call api')
}
</script>

<template>
  <section class="w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-50">
    <Logo />
    <SocialForm :loading="loading" @wants-login-with-github="handleGithubLogin" />
  </section>
</template>
