<script setup lang="ts">
import MoreDetail from '~/modules/gists/screens/MoreDetail/MoreDetail.vue'

definePageMeta({
  layout: 'checkout',
})

useSeoMeta({
  title: 'Detalhe do Gist',
})
</script>

<template>
  <MoreDetail />
</template>
