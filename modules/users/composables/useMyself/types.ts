import type { User } from '~/modules/users/entities/User/User'

export interface MySelfContextProvider {
  user: Ref<User | undefined>
  loading: Ref<boolean>
}
