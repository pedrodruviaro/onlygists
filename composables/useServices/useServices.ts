import AuthService from '@/modules/auth/services/services'
import UserService from '@/modules/users/services/services'
import GistServices from '@/modules/gists/services/services'
import ReportsServices from '@/modules/reports/services/services'

import type { Database } from '~/libs/supabase/schema'
import axios from 'axios'

export function useServices() {
  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()

  const httpClient = axios.create()

  return {
    auth: AuthService(supabaseClient, {
      redirectToUrl: `${config.public.siteUrl}/auth/github`,
    }),

    users: UserService(supabaseClient, httpClient),

    gists: GistServices(supabaseClient),

    reports: ReportsServices(supabaseClient),
  }
}
