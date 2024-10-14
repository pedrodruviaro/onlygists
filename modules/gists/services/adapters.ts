import type { GistVirtual } from '~/modules/gists/entities/Gist/Gist'
import type { Database } from '~/libs/supabase/schema'

type GistTable = Database['public']['Tables']['gists']
type GistRow = GistTable['Row']

type ProfileTable = Database['public']['Tables']['profiles']
type ProfileRow = ProfileTable['Row']

export type ReadOneRow = GistRow & {
  profiles: ProfileRow | null
}

export function readOneAdapter(data: ReadOneRow | null): GistVirtual | null {
  if (!data) {
    return null
  }

  return {
    id: data.id,
    title: data.title,
    profileId: data.profile_id ?? '',
    description: data.description,
    isPaid: data.is_paid,
    price: data.price,
    profiles: {
      id: data.profiles?.id,
      name: data.profiles?.name,
      username: data.profiles?.username,
    },
    lang: data.lang,
    content: data.content,
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
  }
}

export type ReadAllRow = GistRow & {
  profiles: ProfileRow | null
}

export function readAllAdapter(values: ReadAllRow[] | null): GistVirtual[] {
  if (!values) return []

  const newValues = values.map((data) => {
    return {
      id: data.id,
      title: data.title,
      profileId: data.profile_id ?? '',
      description: data.description,
      isPaid: data.is_paid,
      price: data.price,
      profiles: {
        id: data.profiles?.id,
        name: data.profiles?.name,
        username: data.profiles?.username,
      },
      lang: data.lang,
      content: data.content,
      createdAt: data.created_at ? new Date(data.created_at) : new Date(),
    }
  })

  return newValues
}
