import type { GistVirtual } from '~/modules/gists/entities/Gist/Gist'

interface UseGistOptions {
  id: string
}

export function useGist({ id }: UseGistOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()

  const loading = ref(false)
  const gist = ref<GistVirtual>()

  const fetchGistById = async () => {
    if (!id) return

    try {
      loading.value = true

      const [gistReadOne, gistReadOneContent] = await Promise.all([
        services.gists.readOne(id),
        services.gists.readOneContent(id),
      ])

      if (gistReadOne) {
        gist.value = gistReadOne
      }

      if (gist.value && gistReadOneContent) {
        gist.value.content = gistReadOneContent?.content
      }
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchGistById())

  return {
    loading,
    gist,
  }
}
