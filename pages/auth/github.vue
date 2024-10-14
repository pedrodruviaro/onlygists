<script setup lang="ts">
import OAuthRedirect from '~/modules/auth/screens/OAuthRedirect/OAuthRedirect.vue'
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Redirecionando...',
})
</script>

<template>
  <OAuthRedirect />
</template>
