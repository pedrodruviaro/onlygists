<script setup lang="ts">
import type { Address } from '~/modules/users/entities/Address/Address'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  loading: boolean
}>()

const address = defineModel<Address>({
  required: true,
  default: {
    zipCode: '',
    number: '',
    street: '',
    city: '',
    state: '',
    neighborhood: '',
    complement: '',
  },
})

const emits = defineEmits<{
  (e: 'trigger-address-search'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="zipCode" class="flex items-center gap-2">
            CEP
            <i v-if="props.loading" class="pi pi-spinner text-gray-700 animate-spin"></i>
          </label>
          <InputText
            placeholder="00000-000"
            id="zipCode"
            v-maska="'#####-###'"
            v-model="address.zipCode"
            @blur="emits('trigger-address-search')"
          />
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="number" class="flex items-center gap-2">Número</label>
          <InputText placeholder="1337" id="number" v-model="address.number" />
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="city" class="flex items-center gap-2">Cidade</label>
          <InputText placeholder="São Bernardo do Campo" id="city" v-model="address.city" />
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="state" class="flex items-center gap-2">Estado</label>
          <InputText placeholder="São Paulo" id="state" v-model="address.state" />
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="street" class="flex items-center gap-2">Rua</label>
          <InputText placeholder="Rua A" id="street" v-model="address.street" />
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="neighborhood" class="flex items-center gap-2">Bairro</label>
          <InputText placeholder="Aclimação" id="neighborhood" v-model="address.neighborhood" />
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="complement" class="flex items-center gap-2">Complemento</label>
          <InputText placeholder="Apartamento 201" id="complement" v-model="address.complement" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.validation {
  @apply text-red-500;
}
</style>
