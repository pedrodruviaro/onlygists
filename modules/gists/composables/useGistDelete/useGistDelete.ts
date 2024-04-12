import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist'

interface UseGistDeleteOptions {
  gist: Ref<GistVirtual | undefined>
}

export function useGistDelete({ gist }: UseGistDeleteOptions) {
  const { logAndTrack } = useLogger()
  const toast = useToast()
  const services = useServices()

  const loading = ref(false)
  const gistId = ref<string>()

  async function remove() {
    if (!gistId.value) return

    await services.gists.delete(gistId.value)

    toast.add({
      severity: 'info',
      summary: 'Sucesso!',
      detail: 'Gist apagado',
      life: 2000,
    })

    try {
      loading.value = true
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!gist.value) return

    gistId.value = gist.value.id
  })

  return {
    loading,
    remove,
  }
}
