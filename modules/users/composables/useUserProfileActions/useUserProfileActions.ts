import { useClipboard, useShare } from '@vueuse/core'

export function useUserProfileActions() {
  const { share: nativeShare, isSupported } = useShare()
  const { copy } = useClipboard()

  const toast = useToast()

  async function share(username: string) {
    const url = `${window.location.origin}/${username}`

    if (!isSupported.value) {
      await copy(url)

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Link do perfil copiado!',
        life: 2000,
      })

      return
    }

    nativeShare({
      title: 'Perfil do Onlygists',
      text: `Veja esse perfil do @${username}`,
      url,
    })
  }

  return {
    share,
  }
}
