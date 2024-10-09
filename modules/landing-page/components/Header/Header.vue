<script setup lang="ts">
const emits = defineEmits<{
  (e: 'wants-be-creator'): void
}>()
</script>

<template>
  <header class="w-full shadow relative">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-center md:justify-between items-center mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <NuxtLink to="/">
            <Logo />
          </NuxtLink>
        </div>
        <div class="hidden md:flex">
          <Button
            label="Continuar como creator"
            icon="pi pi-arrow-right"
            icon-pos="right"
            @click="emits('wants-be-creator')"
          />
        </div>
      </div>
    </nav>
  </header>
</template>
