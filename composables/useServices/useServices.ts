import AuthService from '~/modules/auth/services/services'
import UserServices from '~/modules/users/services/services'
import type { Database } from '~/libs/supabase/schema'

export function useServices() {
  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()
  const redirectToUrl = `${config.public.siteUrl}/auth/github`

  return {
    auth: AuthService(supabaseClient, { redirectToUrl }),
    users: UserServices(supabaseClient),
  }
}
