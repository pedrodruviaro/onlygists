<script setup lang="ts">
const props = defineProps<{
  username: string
  avatarUrl: string
}>()

const emits = defineEmits<{
  (e: 'share', username: string): void
  (e: 'navigate-to-profile', username: string): void
}>()
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img :src="props.avatarUrl" alt="foto de perfil do usuário" />
    </div>
    <h1 class="text-gray-700 font-bold text-2xl md:text-3xl">@{{ props.username }}</h1>

    <div class="flex gap-2 justify-center mt-2">
      <Button label="Ver pefil" size="small" icon="pi pi-star" @click="emits('navigate-to-profile', props.username)" />
      <Button label="Compartilhar" size="small" icon="pi pi-share-alt" @click="emits('share', props.username)" />
    </div>
  </div>
</template>
