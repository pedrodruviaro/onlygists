import { v4 as uuidv4 } from 'uuid'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/libs/supabase/schema'
import type { CreateOptions } from './types'

export default (client: SupabaseClient<Database>) => ({
  async create({ title, description, price, content, lang, profileId }: CreateOptions) {
    const id = uuidv4()
    const isPaid = price !== 0
    await client.from('gists').insert({
      id,
      title,
      description,
      content,
      is_paid: isPaid,
      lang,
      price,
      profile_id: profileId,
    })

    return { id }
  },
})
