<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number | string
}>()
</script>

<template>
  <div class="flex flex-1 flex-col bg-white p-5 rounded-xl">
    <span class="font-[Inter] text-4xl text-primary-500 font-bold">{{ props.value }}</span>
    <p class="font-[Inter] text-lg text-gray-700 leading-6">{{ props.label }}</p>
  </div>
</template>
