<script setup lang="ts">
const visible = defineModel<boolean>('visible')
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Algo deu errado..." :style="{ width: '400px' }">
    <div class="m-0 flex flex-col items-center justify-center w-full">
      <i class="pi pi-times-circle text-primary-500 text-6xl my-5"></i>
      <p class="font-[Inter] text-gray-700 text-center">
        <strong>Sentimos muito por isso</strong>
        <br />
        Por favor tente efetuar a compra novamente
      </p>
    </div>

    <template #footer>
      <div class="flex justify-center w-full">
        <Button label="Voltar" icon="pi pi-arrow-left" autofocus @click="visible = false" />
      </div>
    </template>
  </Dialog>
</template>
