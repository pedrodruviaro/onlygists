<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  (e: 'wants-login-with-github'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center bg-gray-50 rounded p-6">
    <h2 class="text-gray-700 font-regular">Entre com sua conta</h2>
    <Button
      label="Continuar com o Github"
      icon="pi pi-github"
      :loading="props.loading"
      @click="emits('wants-login-with-github')"
    />
  </div>
</template>
