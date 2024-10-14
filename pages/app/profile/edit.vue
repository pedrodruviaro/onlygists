<script setup lang="ts">
import EditProfile from '~/modules/users/screens/EditProfile/EditProfile.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Editar Perfil',
})
</script>

<template>
  <EditProfile />
</template>
