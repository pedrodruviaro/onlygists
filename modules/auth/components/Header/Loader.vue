<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <header class="w-full shadow relative" v-if="props.loading">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center max-w-screen-lg mx-auto">
        <div class="flex items-center">
          <Logo />
        </div>

        <div class="flex gap-2 items-center">
          <Skeleton width="7rem" height="1.5rem" />
          <Skeleton shape="circle" size="2rem" />
        </div>
      </div>
    </nav>
  </header>

  <slot v-else />
</template>
