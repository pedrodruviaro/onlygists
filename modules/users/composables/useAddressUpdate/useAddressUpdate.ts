import type { User } from '~/modules/users/entities/User/User'
import type { Address } from '~/modules/users/entities/Address/Address'
import type { RefSymbol } from '@vue/reactivity'

interface UseUserAddressUpdateOptions {
  user: Ref<User | undefined>
}

const INITIAL_ADDRESS_INFO = {
  zipCode: '',
  number: '',
  street: '',
  city: '',
  state: '',
  neighborhood: '',
  complement: '',
}

export function useAddressUpdate({ user }: UseUserAddressUpdateOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref(false)
  const address = ref<Address>(INITIAL_ADDRESS_INFO)

  const searchZipCode = async () => {
    if (!address.value.zipCode || address.value.zipCode.trim() === '') return

    try {
      loading.value = true

      const response = await services.users.searchAddressByZicCode(address.value.zipCode)
      address.value = response.data
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) return
    address.value = user.value.address ?? INITIAL_ADDRESS_INFO
  })

  return {
    loading,
    address,
    searchZipCode,
  }
}
