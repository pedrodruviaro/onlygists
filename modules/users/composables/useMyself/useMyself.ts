import { useSession } from '~/modules/auth/composables/useSession/useSession'
import type { User } from '~/modules/users/entities/User/User'
import type { MySelfContextProvider } from './types'
import type { InjectionKey } from 'vue'

export const mySelfKey = Symbol('myself') as InjectionKey<MySelfContextProvider>

export function useMyself() {
  const services = useServices()
  const session = useSession()
  const { logAndTrack } = useLogger()

  const user = ref<User>()
  const loading = ref(true)

  provide<MySelfContextProvider>(mySelfKey, { user, loading })

  const fetchUser = async () => {
    try {
      loading.value = true
      const response = await services.users.getMyself(session.user.value?.id!)
      if (!response) return
      user.value = response
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchUser())

  return {
    loading,
    user,
  }
}
