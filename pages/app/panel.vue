<script setup lang="ts">
import Panel from '~/modules/reports/screens/Panel/Panel.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Meu Painel',
})
</script>

<template>
  <Panel />
</template>
