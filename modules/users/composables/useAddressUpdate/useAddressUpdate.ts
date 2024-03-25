import type { User } from '@/modules/users/entities/User/User'
import type { Address } from '@/modules/users/entities/Address/Address'

interface UseAddressUpdateOptions {
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

export function useAddressUpdate({ user }: UseAddressUpdateOptions) {
  const { logAndTrack } = useLogger()
  const loading = ref(false)
  const services = useServices()

  const address = ref<Address>(INITIAL_ADDRESS_INFO)

  async function searchZipCode() {
    if (!address.value.zipCode || address.value.zipCode === '') return

    try {
      loading.value = true

      const response = await services.users.searchAddressByZipCode(address.value.zipCode)
      address.value = response.data
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) {
      return
    }

    address.value = user.value.address ?? INITIAL_ADDRESS_INFO
  })

  return {
    loading,
    address,
    searchZipCode,
  }
}
