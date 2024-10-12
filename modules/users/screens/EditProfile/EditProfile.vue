<script setup lang="ts">
import HeadlineEdit from '~/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '~/modules/users/components/HeadlineEdit/Loader.vue'
import BasecInfoForm from '~/modules/users/components/BasecInfoForm/BasecInfoForm.vue'
import AddressForm from '~/modules/users/components/AddressForm/AddressForm.vue'
import { useUserProfileActions } from '~/modules/users/composables/useUserProfileActions/useUserProfileActions'
import { useAddressUpdate } from '~/modules/users/composables/useAddressUpdate/useAddressUpdate'
import { useUserUpdate } from '~/modules/users/composables/useUserUpdate/useUserUpdate'

import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user, loading } = inject(mySelfKey) as MySelfContextProvider

const router = useRouter()
const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}

const { share } = useUserProfileActions()
const handleShare = async (username: string) => {
  await share(username)
}

const { address, loading: loadingZipCodeSearch, searchZipCode } = useAddressUpdate({ user })
const handleAddressSearch = async () => {
  searchZipCode()
}

const { loading: updateUserLoading, errors, safeParse, update } = useUserUpdate({ user })
const handleUpdateUserProfile = () => {
  const isValid = safeParse().success
  if (!isValid || !user.value) return

  user.value.address = address.value

  update()
}
</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      v-if="user"
      :username="user?.username"
      :avatar-url="user?.avatarUrl"
      @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
      class="py-10"
    />
  </HeadlineEditLoader>

  <WidgetDefault title="Informações básicas">
    <BasecInfoForm v-model="user" :errors="errors" />
  </WidgetDefault>

  <WidgetDefault title="Informações básicas">
    <AddressForm @trigger-address-search="handleAddressSearch" :loading="loadingZipCodeSearch" v-model="address" />
  </WidgetDefault>

  <Button
    label="Atualizar"
    :loading="updateUserLoading"
    class="mt-5 w-full md:w-auto"
    icon="pi pi-pencil"
    icon-pos="right"
    @click="handleUpdateUserProfile"
  />
</template>
