import AuthService from '~/modules/auth/services/services'
import UserServices from '~/modules/users/services/services'
import GistsServices from '~/modules/gists/services/services'
import ReportsServices from '~/modules/reports/services/services'
import PaymentsServices from '~/modules/payments/services/services'
import axios from 'axios'
import type { Database } from '~/libs/supabase/schema'

export function useServices() {
  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()
  const redirectToUrl = `${config.public.siteUrl}/auth/github`
  const httpClient = axios.create()

  return {
    auth: AuthService(supabaseClient, { redirectToUrl }),
    users: UserServices(supabaseClient, httpClient),
    gists: GistsServices(supabaseClient),
    reports: ReportsServices(supabaseClient),
    payments: PaymentsServices(supabaseClient),
  }
}
