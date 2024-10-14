<script setup lang="ts">
import Sales from '~/modules/payments/screens/Sales/Sales.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Minhas vendas',
})
</script>

<template>
  <Sales />
</template>
