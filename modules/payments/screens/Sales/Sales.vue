<script setup lang="ts">
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetLoader from '~/modules/reports/components/Widget/Loader/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import SalesTable from '~/modules/payments/components/Table/Sales/Sales.vue'
import SalesTableLoader from '~/modules/payments/components/Table/Sales/Loader.vue'
import { useSalesReport } from '~/modules/reports/composables/useSalesReport/useSalesReport'
import { useSalesList } from '~/modules/payments/composables/useSalesList/useSalesList'
import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import { currencyFormatBRL } from '~/libs/currency/format'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(mySelfKey) as MySelfContextProvider

const { loading: loadingReports, grossRevenue, netRevenue } = useSalesReport({ userId: user.value?.id! })

const localeGrossRevenue = computed(() => {
  if (!grossRevenue.value) return 'R$ 0'
  return currencyFormatBRL(grossRevenue.value)
})

const localeNetRevenue = computed(() => {
  if (!netRevenue.value) return 'R$ 0'
  return currencyFormatBRL(netRevenue.value)
})

const { loading: loadingSales, sales } = useSalesList({ userId: user.value?.id! })
</script>

<template>
  <WidgetGroup>
    <WidgetLoader :loading="loadingReports" :amount="2">
      <WidgetCondensed :value="localeGrossRevenue" label="Valor bruto" />
      <WidgetCondensed :value="localeNetRevenue" label="Valor para saque" />
    </WidgetLoader>
  </WidgetGroup>

  <WidgetDefault title="Listagem de vendas" v-if="sales.length !== 0">
    <SalesTableLoader :loading="loadingSales">
      <SalesTable :sales="sales" />
    </SalesTableLoader>
  </WidgetDefault>
</template>
