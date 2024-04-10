import type { Code, HeadLine } from '@/modules/gists/entities/Gist/Gist'

export type CreateOptions = HeadLine &
  Code & {
    profileId: string
  }

export type UpdateOptions = Partial<HeadLine> & Partial<Code>
