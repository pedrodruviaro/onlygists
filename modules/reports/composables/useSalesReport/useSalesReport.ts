import { applyPayoutFeesToGrossValue } from '~/modules/payments/entities/Sale/Sale'

interface UseSalesReportOptions {
  userId: string
}

export function useSalesReport({ userId }: UseSalesReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(false)
  const grossRevenue = ref(0)
  const netRevenue = ref(0)

  const fetchRevenue = async () => {
    try {
      loading.value = true

      const total = await services.reports.totalRevenue(userId)
      grossRevenue.value = total ?? 0
      netRevenue.value = total === 0 ? 0 : applyPayoutFeesToGrossValue(total ?? 0)
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchRevenue())

  return {
    loading,
    grossRevenue,
    netRevenue,
  }
}
