<script setup lang="ts">
import PublicProfile from '~/modules/users/screens/PublicProfile/PublicProfile.vue'

useHead({
  title: 'Perfil do usuário - 🤩 onlygists',
})

definePageMeta({
  layout: 'checkout',
})
</script>

<template>
  <PublicProfile />
</template>
