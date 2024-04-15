import { applyPayoutFeesToGrossValue } from '~/modules/payments/entities/Sale/Sale'

interface UseSalesReportOptions {
  userId: string
}

export function useSalesReport({ userId }: UseSalesReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(true)
  const grossValue = ref(0)
  const netValue = ref(0)

  async function fetchRevenue() {
    try {
      loading.value = true

      if (!userId) return

      const total = await services.reports.totalRevenue(userId)
      grossValue.value = total ?? 0
      netValue.value = total === 0 ? 0 : applyPayoutFeesToGrossValue(total ?? 0)
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRevenue()
  })

  return {
    loading,
    grossValue,
    netValue,
  }
}
