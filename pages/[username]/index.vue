<script setup lang="ts">
import PublicProfile from '~/modules/users/screens/PublicProfile/PublicProfile.vue'

definePageMeta({
  layout: 'checkout',
})

useSeoMeta({
  title: 'Perfil do usuário',
})
</script>

<template>
  <PublicProfile />
</template>
