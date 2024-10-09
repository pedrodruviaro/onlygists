<script setup lang="ts">
const props = defineProps<{
  title?: string
  subTitle?: string
}>()
</script>

<template>
  <div class="rounded-lg p-5 bg-white">
    <div class="flex justify-between items-center" v-if="props.title">
      <div class="flex flex-col gap-1">
        <h3 class="text-lg font-bold text-left text-gray-700">{{ props.title }}</h3>
        <p class="text-sm text-gray-500 text-left" v-if="props.subTitle">{{ props.subTitle }}</p>
      </div>
      <slot name="header-actions" />
    </div>

    <div class="py-2">
      <slot />
    </div>
  </div>
</template>
