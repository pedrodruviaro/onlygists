import type { GistVirtual } from '~/modules/gists/entities/Gist/Gist'

interface UseGistContentOptions {
  gist: Ref<GistVirtual | undefined | null>
}

export function useGistContent({ gist }: UseGistContentOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()

  const loading = ref(false)
  const gistId = ref('')
  const gistContent = ref('')
  const isPaid = ref<boolean>()

  const fetchGistById = async () => {
    if (!gistId.value) return
    if (isPaid.value) return

    try {
      loading.value = true

      const response = await services.gists.readOneContent(gistId.value)

      if (response) {
        gistContent.value = response.content
      }
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value) return
    gistId.value = gist.value.id
    isPaid.value = gist.value.isPaid
  })

  onMounted(() => fetchGistById())

  return {
    loading,
    gistContent,
  }
}
