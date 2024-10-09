<script setup lang="ts">
const props = defineProps<{
  name: string
  avatarUrl: string
  bio?: string
  city?: string
  state?: string
}>()
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img :src="props.avatarUrl" alt="Foto do usuário" />
    </div>
    <h1 class="text-gray-700 text-center font-bold text-2xl md:text-3xl">{{ props.name }}</h1>
    <p class="text-center text-gray-700 font-regular md:text-lg" v-if="props.bio">{{ props.bio }}</p>
    <p class="font-regular text-gray-500 text-sm md:text-base" v-if="props.city && props.state">
      <i class="pi pi-map-marker"></i>
      {{ props.city }}, {{ props.state }}
    </p>
  </div>
</template>
