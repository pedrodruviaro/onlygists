<script setup lang="ts">
const visible = defineModel<boolean>('visible')

const handleClose = () => (visible.value = false)
</script>

<template>
  <Dialog modal header="Compra efetuada com sucesso!" :style="{ width: '400px' }" v-model:visible="visible">
    <div class="m-0 flex flex-col items-center justify-center w-full">
      <i class="pi pi-check-circle text-primary-500 text-6xl my-5"></i>
      <p class="text-gray-700 text-center">
        Parabéns pela compra! <br />
        Você receberá no email fornecido no checkout o seu gist 🤩
      </p>
    </div>

    <template #footer>
      <div class="flex justify-center w-full">
        <Button label="Voltar" icon="pi pi-arrow-left" @click="handleClose" />
      </div>
    </template>
  </Dialog>
</template>
