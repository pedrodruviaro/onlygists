<script setup lang="ts">
const props = defineProps<{
  author: string
  avatarUrl: string
  bio: string
}>()
</script>

<template>
  <template>
    <div class="w-full h-full flex flex-col justify-center items-center bg-[#f97316]">
      <div>
        <img :src="props.avatarUrl" alt="avatar" width="170" height="170" class="rounded-full" />
      </div>
      <h1 class="font-[Inter] font-bold text-6xl text-white text-center">{{ props.author }}</h1>
      <p class="font-[Inter] text-4xl text-white text-center">{{ props.bio }}</p>
    </div>
  </template>
</template>
