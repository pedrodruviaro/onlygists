import type { Database } from '~/libs/supabase/schema'
import type { User } from '~/modules/users/entities/User/User'
import type { Address } from '~/modules/users/entities/Address/Address'
import type { SearchAddressByZicCodeResponse } from './types'

type ProfileTable = Database['public']['Tables']['profiles']
type Row = ProfileTable['Row']

export function getMyselfAdapter(data: Row | null): User | null {
  if (!data) return null

  const address = data.address as unknown as Address // unknown -> usador devido ao JSONB

  return {
    id: data.id,
    avatarUrl: data.avatar_url,
    username: data.username,
    name: data.name,
    address,
    site: data.site ?? undefined,
    phone: data.phone ?? undefined,
    bio: data.bio ?? undefined,
    createdAt: new Date(data.created_at),
  }
}

export function searchAddressByZicCodeAdapter(data: SearchAddressByZicCodeResponse): Address {
  return {
    zipCode: data.cep,
    state: data.uf,
    city: data.localidade,
    neighborhood: data.bairro,
    street: data.logradouro,
    number: '',
    complement: data.complemento,
  }
}

export function readOneByUsernameAdapter(data: Row | null): User | null {
  if (!data) return null

  const address = data.address as unknown as Address

  return {
    id: data.id,
    avatarUrl: data.avatar_url,
    username: data.username,
    name: data.name,
    address,
    site: data.site ?? undefined,
    phone: data.phone ?? undefined,
    bio: data.bio ?? undefined,
    createdAt: new Date(data.created_at),
  }
}
