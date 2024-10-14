import type { SaleVirtual } from '~/modules/payments/entities/Sale/Sale'

interface UseSalesListOptions {
  userId: string
}

export function useSalesList({ userId }: UseSalesListOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(false)
  const sales = ref<SaleVirtual[]>([])

  const fetchSales = async () => {
    try {
      loading.value = true
      const response = await services.payments.readAllSales(userId)
      sales.value = response
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchSales())

  return {
    loading,
    sales,
  }
}
