<script setup lang="ts">
const router = useRouter()

async function navigateToPanel() {
  await new Promise((resolve) => setTimeout(resolve, 2_000))
  router.push('/app/panel')
}

onMounted(() => {
  navigateToPanel()
})
</script>

<template>
  <MainContent #content>
    <p class="text-gray-800 font-[Inter]">Redirectionando...</p>
  </MainContent>
</template>
