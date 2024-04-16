<script setup lang="ts">
useHead({
  title: '🤩 onlygists',
})

useSeoMeta({
  title: '🤩 onlygists - Compartilhe e monetize trechos de código.',
  ogTitle: '🤩 onlygists - Compartilhe e monetize trechos de código.',
  description:
    'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia.',
  ogDescription:
    'Compartilhe e monetize trechos de código. Ganhe uma renda extra com os códigos que você faz no dia-a-dia.',
})

const colorMode = useColorMode()
colorMode.preference = 'light'
</script>

<template>
  <NuxtLayout>
    <Toast />
    <NuxtPage />
  </NuxtLayout>
</template>
