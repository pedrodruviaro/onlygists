<script setup lang="ts">
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import SalesTableLoader from '@/modules/payments/components/Table/Sales/Loader'
import SalesTable from '@/modules/payments/components/Table/Sales/Sales'
import { useSalesReport } from '~/modules/reports/composables/useSalesReport/useSalesReport'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useSalesList } from '~/modules/payments/composables/useSalesList/useSalesList'
import { currencyFormatBRL } from '~/libs/currency/format'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(myselfKey) as MyselfContextProvider

const { loading: reportsLoading, grossValue, netValue } = useSalesReport({ userId: user.value?.id! })

const { loading: loadingSales, sales } = useSalesList({ userId: user.value?.id! })

const localeGrossRevenue = computed(() => {
  if (!grossValue.value) {
    return 'R$ 0'
  }

  return currencyFormatBRL(grossValue.value)
})

const localeNetRevenue = computed(() => {
  if (!netValue.value) {
    return 'R$ 0'
  }

  return currencyFormatBRL(netValue.value)
})
</script>

<template>
  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="reportsLoading" :amount="4">
      <WidgetCondensed label="Valor bruto" :value="localeGrossRevenue" />
      <WidgetCondensed label="Valor para saque" :value="localeNetRevenue" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Listagem de vendas" v-if="sales.length > 0">
    <SalesTableLoader :loading="loadingSales">
      <SalesTable :sales="sales" />
    </SalesTableLoader>
  </WidgetDefault>
</template>
