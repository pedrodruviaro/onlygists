<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <template v-if="props.loading">
    <Skeleton width="100%" height="15rem" v-for="i in 4" :key="i" />
  </template>

  <slot v-else />
</template>
