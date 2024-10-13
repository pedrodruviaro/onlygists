import type { User } from '~/modules/users/entities/User/User'

interface UseGistReportOptions {
  user: Ref<User | undefined | null>
  isMyself: boolean
}

export function useGistsReport({ user, isMyself }: UseGistReportOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()

  const loading = ref(false)
  const userId = ref('')

  const totalGists = ref(0)
  const totalFreeGists = ref(0)
  const totalPaidGists = ref(0)
  const totalSoldGists = ref(0)

  const fetchGistsReports = async () => {
    if (!userId.value) return

    try {
      loading.value = true

      const requests = [
        services.reports.totalGistsPublished(userId.value),
        services.reports.totalFreeGistsPublished(userId.value),
        services.reports.totalPaidGistsPublished(userId.value),
      ]

      if (isMyself) requests.push(services.reports.totalSoldGistsPublished(userId.value))

      const [total, free, paid, sold] = await Promise.all(requests)

      totalGists.value = total || 0
      totalFreeGists.value = free || 0
      totalPaidGists.value = paid || 0
      totalSoldGists.value = sold || 0
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchGistsReports())

  watchEffect(() => {
    if (!user.value) return
    userId.value = user.value.id
  })

  return {
    loading,
    totalGists,
    totalFreeGists,
    totalPaidGists,
    totalSoldGists,
  }
}
