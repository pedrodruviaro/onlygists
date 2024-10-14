<script setup lang="ts">
import Edit from '~/modules/gists/screens/Edit/Edit.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Editar Gist',
})
</script>

<template>
  <Edit />
</template>
