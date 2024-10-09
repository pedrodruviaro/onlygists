<script setup lang="ts">
const props = defineProps<{
  value: number | string
  label: string
}>()
</script>

<template>
  <div class="flex flex-1 flex-col bg-white p-5 rounded-xl">
    <span class="font-bold text-4xl text-primary-500">{{ props.value }}</span>
    <span class="text-xl text-gray-700">{{ props.label }}</span>
  </div>
</template>
