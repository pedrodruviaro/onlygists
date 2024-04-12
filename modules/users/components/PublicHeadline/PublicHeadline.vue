<script setup lang="ts">
const props = defineProps<{
  name?: string
  avatarUrl?: string
  bio?: string
  city?: string
  state?: string
}>()
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img class="w-full" :src="$props.avatarUrl" :alt="props.name" />
    </div>

    <h1 class="font-[Inter] text-gray-700 text-center font-bold text-2xl md:text-3xl">
      {{ props.name }}
    </h1>
    <p class="font-[Inter] text-gray-700 text-center font-regular text-md md:text-lg" v-if="props.bio">
      {{ props.bio }}
    </p>

    <p
      class="font-[Inter] font-regular text-gray-500 text-sm md:text-base1 flex flex-wrap gap-2 items-center"
      v-if="props.state && props.state"
    >
      <i class="pi pi-map-marker"></i>
      <span>{{ props.city }}, {{ props.state }}</span>
    </p>
  </div>
</template>
