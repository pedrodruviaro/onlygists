<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-2 items-center py-10" v-if="props.loading">
    <Skeleton shape="circle" size="10rem" />
    <Skeleton width="18rem" height="2rem" />
    <div class="flex gap-2 justify-center mt-2">
      <Skeleton width="8rem" height="2rem" />
      <Skeleton width="8rem" height="2rem" />
    </div>
  </div>

  <slot v-else />
</template>
