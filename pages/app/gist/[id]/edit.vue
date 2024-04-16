<script setup lang="ts">
import Edit from '@/modules/gists/screens/Edit/Edit.vue'

useHead({
  title: 'Editar gist - 🤩 onlygists',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <Edit />
</template>
