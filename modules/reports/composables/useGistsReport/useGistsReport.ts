import type { User } from '@/modules/users/entities/User/User'

interface UseGistsReportOptions {
  user: Ref<User | undefined | null>
  isMyself: boolean // true if admin or false if is public route
}

export function useGistsReport({ user, isMyself }: UseGistsReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(true)
  const userId = ref<string>()
  const totalGists = ref(0)
  const totalFreeGists = ref(0)
  const totalPaidGists = ref(0)
  const totalSoldGists = ref(0)

  async function fetchGistsReport() {
    if (!userId.value) return

    try {
      loading.value = true

      const requests = [
        services.reports.totalGistPublished(userId.value),
        services.reports.totalFreeGistsPublished(userId.value),
        services.reports.totalPaidGistsPublished(userId.value),
      ]

      if (isMyself) {
        requests.push(services.reports.totalSoldGistsPublished(userId.value))
      }

      const [total, free, paid, sold] = await Promise.all(requests)

      totalGists.value = total ?? 0
      totalFreeGists.value = free ?? 0
      totalPaidGists.value = paid ?? 0
      totalSoldGists.value = sold ?? 0
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) return

    userId.value = user.value.id
    fetchGistsReport()
  })

  return {
    loading,
    totalGists,
    totalFreeGists,
    totalPaidGists,
    totalSoldGists,
  }
}
