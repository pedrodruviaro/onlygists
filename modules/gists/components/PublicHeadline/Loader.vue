<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-2 py-8 w-full" v-if="props.loading">
    <Skeleton width="18rem" height="2rem" />
    <div class="flex flex-col gap-2">
      <Skeleton width="9rem" height="1rem" />
      <Skeleton width="7rem" height="2rem" />
    </div>

    <div class="flex gap-2 items-center">
      <Skeleton shape="circle" size="1.5rem" />
      <Skeleton width="10rem" height="1.5rem" />
    </div>
  </div>

  <slot v-else />
</template>
