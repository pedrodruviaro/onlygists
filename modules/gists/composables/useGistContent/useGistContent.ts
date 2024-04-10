import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist'

interface UseGistContentOptions {
  gist: Ref<GistVirtual | undefined | null>
}

export function useGistContent({ gist }: UseGistContentOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const loading = ref(false)
  const gistId = ref<string>()
  const gistContent = ref<string>()
  const isPaid = ref<boolean>()

  async function fetchGistById() {
    try {
      if (!gistId.value) return
      if (isPaid.value) return

      const response = await services.gists.readOneContent(gistId.value)
      if (response) {
        gistContent.value = response.content
      }

      loading.value = true
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchGistById()
  })

  watchEffect(() => {
    if (!gist.value) return

    gistId.value = gist.value.id
    isPaid.value = gist.value.isPaid
  })

  return {
    loading,
    gistId,
    gistContent,
  }
}
