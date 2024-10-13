import { getMyselfAdapter, readOneByUsernameAdapter, searchAddressByZicCodeAdapter } from './adapters'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { AxiosInstance } from 'axios'
import type { Database } from '~/libs/supabase/schema'
import type { SearchAddressByZicCodeResponse } from './types'
import type { User } from '~/modules/users/entities/User/User'

export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async getMyself(id: string) {
    const response = await client.from('profiles').select('*').eq('id', id).limit(1).single()
    const user = getMyselfAdapter(response.data)
    return user
  },

  async searchAddressByZicCode(zipCode: string) {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`
    const response = await httpClient.get<SearchAddressByZicCodeResponse>(url)
    const address = searchAddressByZicCodeAdapter(response.data)
    return {
      data: address,
    }
  },

  async update(id: string, { name, site, bio, phone, address }: User) {
    const response = await client
      .from('profiles')
      .update({
        name,
        site,
        bio,
        phone,
        address: {
          zipCode: address?.zipCode,
          number: address?.number,
          street: address?.street,
          city: address?.city,
          state: address?.state,
          neighborhood: address?.neighborhood,
          comlement: address?.complement,
        },
      })
      .eq('id', id)
    return response
  },

  async readOneByUsername(username: string) {
    const response = await client.from('profiles').select('*').eq('username', username).limit(1).single()
    const user = readOneByUsernameAdapter(response.data)
    return user
  },
})
