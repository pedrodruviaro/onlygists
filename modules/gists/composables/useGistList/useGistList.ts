import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist'

interface UseGistListOptions {
  username: string
}

export function useGistList({ username }: UseGistListOptions) {
  const PAGE_COUNT = 4

  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(true)
  const loadingMore = ref(false)

  const page = ref(0)
  const total = ref(0)
  const gists = ref<GistVirtual[]>([])

  const from = computed(() => {
    return page.value * PAGE_COUNT
  })

  const to = computed(() => {
    return from.value + PAGE_COUNT - 1
  })

  async function fetchGistsByUsername() {
    try {
      loading.value = true

      const response = await services.gists.readAll({ username, from: from.value, to: to.value })

      gists.value = response.results
      total.value = response.total
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  async function fetchMoreGistsByUsername() {
    const canFetchMore = total.value > gists.value.length

    if (!canFetchMore) return

    try {
      loadingMore.value = true

      page.value += 1

      const response = await services.gists.readAll({
        username,
        from: from.value,
        to: to.value,
      })

      gists.value.push(...response.results)
    } catch (error) {
      logAndTrack(error)
    } finally {
      loadingMore.value = false
    }
  }

  onMounted(() => {
    fetchGistsByUsername()
  })

  return {
    gists,
    loading,
    loadingMore,
    fetchMoreGistsByUsername,
  }
}
