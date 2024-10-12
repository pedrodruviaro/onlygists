<script setup lang="ts">
const router = useRouter()

const navigateToPannel = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2_000))
  router.push('/app/panel')
}

onMounted(() => navigateToPannel())
</script>

<template>
  <MainContent>
    <template #content>
      <p class="text-gray-800 text-center mt-10">Redirecionando...🤩</p>
    </template>
  </MainContent>
</template>
