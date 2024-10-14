<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="grid gap-4 w-full bg-white rounded p-5">
    <div class="flex gap-4">
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="4rem" />
    </div>

    <Skeleton width="100%" height="12rem" />
  </div>

  <slot v-else />
</template>
