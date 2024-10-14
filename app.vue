<script lang="ts" setup>
const colorMode = useColorMode()
colorMode.preference = 'light'

useHead({
  titleTemplate: (chunk) => {
    return chunk ? `${chunk} | 🤩 onlygists` : '🤩 onlygists'
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#f97316" :height="4" />
    <NuxtPage />
    <Toast position="bottom-right" />
  </NuxtLayout>
</template>
