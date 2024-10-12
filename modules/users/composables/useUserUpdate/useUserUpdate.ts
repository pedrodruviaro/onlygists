import { z } from 'zod'
import type { ZodFormattedError } from 'zod'
import type { User } from '~/modules/users/entities/User/User'

const schema = z.object({
  username: z.string(),
  name: z.string().min(2, 'Nome é obrigatório'),
  site: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
})

interface UseUserUpdateOptions {
  user: Ref<User | undefined>
}

export function useUserUpdate({ user: userRef }: UseUserUpdateOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const toast = useToast()

  const user = ref<User>()
  const loading = ref(false)
  const errors = ref<ZodFormattedError<User>>()

  const safeParse = () => {
    const result = schema.safeParse(user.value)
    if (!result.success) {
      errors.value = result.error.format()
    }
    return result
  }

  const update = async () => {
    if (!user.value) return

    try {
      loading.value = true
      await services.users.update(user.value.id, {
        ...user.value,
      })

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Dados atualizados!',
      })
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!userRef.value) return
    user.value = userRef.value
  })

  return {
    user,
    loading,
    errors,
    safeParse,
    update,
  }
}
