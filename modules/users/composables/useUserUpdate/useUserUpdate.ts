import { z } from 'zod'
import type { ZodFormattedError } from 'zod'
import type { User } from '@/modules/users/entities/User/User'

interface UseUserUpdateOptions {
  user: Ref<User | undefined>
}

const schema = z.object({
  username: z.string(),
  name: z.string().min(2, 'Nome é obrigatório'),
  site: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
})

export function useUserUpdate({ user: userRef }: UseUserUpdateOptions) {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const toast = useToast()

  const loading = ref(false)
  const user = ref<User>()
  const errors = ref<ZodFormattedError<User>>()

  function safeParse() {
    const result = schema.safeParse(user.value)

    if (!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  async function update() {
    if (!user.value) return

    try {
      loading.value = true

      await services.users.update(user.value.id, {
        ...user.value,
      })

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Dados atualizados',
        life: 2000,
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
    loading,
    user,
    errors,
    safeParse,
    update,
  }
}
