<script setup lang="ts">
const visible = defineModel<boolean>('visible')

const handleClose = () => (visible.value = false)
</script>

<template>
  <Dialog modal header="Sentimos muito por isso!" :style="{ width: '400px' }" v-model:visible="visible">
    <div class="m-0 flex flex-col items-center justify-center w-full">
      <i class="pi pi-times-circle text-primary-500 text-6xl my-5"></i>
      <p class="text-gray-700 text-center">Por favor, tente efetuar a compra novamente</p>
    </div>

    <template #footer>
      <div class="flex justify-center w-full">
        <Button label="Voltar" icon="pi pi-arrow-left" @click="handleClose" />
      </div>
    </template>
  </Dialog>
</template>
