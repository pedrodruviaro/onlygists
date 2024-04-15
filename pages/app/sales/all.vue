<script setup lang="ts">
import Sales from '@/modules/payments/screens/Sales/Sales'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <Sales />
</template>
