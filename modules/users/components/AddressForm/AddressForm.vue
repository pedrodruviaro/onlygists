<script setup lang="ts">
import type { Address } from '@/modules/users/entities/Address/Address'

const props = defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  (e: 'trigger-address-search'): void
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
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 lg:flex-row">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="cep" class="flex items-center gap-2"
            >CEP
            <i v-if="props.loading" class="pi pi-spinner text-gray-500 animate-spin"></i>
          </label>
          <InputText
            id="cep"
            placeholder="00000-000"
            v-maska
            data-maska="#####-###"
            v-model="address.zipCode"
            @blur="() => emits('trigger-address-search')"
          />
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="street">Número</label>
          <InputText placeholder="42" id="street" v-model="address.number" />
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="city">Cidade</label>
        <InputText id="city" placeholder="São Paulo" v-model="address.city" />
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <label for="state">Estado</label>
        <InputText id="state" placeholder="SP" v-model="address.state" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="neighborhood">Bairro</label>
        <InputText id="neighborhood" placeholder="Centro" v-model="address.neighborhood" />
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <label for="complement">Complemento</label>
        <InputText id="complement" placeholder="Apartamento 104" v-model="address.complement" />
      </div>
    </div>
  </div>
</template>
