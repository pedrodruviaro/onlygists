<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="w-full h-full flex justify-center items-center" v-if="props.loading">
    <Logo class="animate-pulse scale-150" />
  </div>

  <slot v-else />
</template>
