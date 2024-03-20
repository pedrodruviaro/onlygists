import { useSession } from '~/modules/auth/composables/useSession/useSession'
import type { User } from '@/modules/users/entities/User/User'
import type { MyselfContextProvider } from './types'
import type { InjectionKey } from 'vue'

export const myselfKey = Symbol('myself') as InjectionKey<MyselfContextProvider>

export function useMyself() {
  const loading = ref(true)
  const user = ref<User>()

  const session = useSession()
  const services = useServices()

  const { logAndTrack } = useLogger()

  async function fetchUser() {
    try {
      loading.value = true

      const response = await services.users.getMyself(session.user.value?.id!)

      if (!response) {
        return
      }

      user.value = response
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  provide<MyselfContextProvider>(myselfKey, { user, loading })

  onMounted(() => {
    fetchUser()
  })

  return {
    loading,
    user,
  }
}
