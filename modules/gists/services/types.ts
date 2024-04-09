import type { Code, HeadLine } from '@/modules/gists/entities/Gist/Gist'

export type CreateOptions = HeadLine &
  Code & {
    profileId: string
  }
