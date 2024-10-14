<script setup lang="ts">
import CreateNew from '~/modules/gists/screens/CreateNew/CreateNew.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Criar novo gist',
})
</script>

<template>
  <CreateNew />
</template>
