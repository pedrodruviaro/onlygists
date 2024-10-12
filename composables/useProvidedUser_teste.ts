import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

export function useProvidedUser() {
  const { user, loading } = inject(mySelfKey) as MySelfContextProvider

  return {
    user,
    loading,
  }
}
