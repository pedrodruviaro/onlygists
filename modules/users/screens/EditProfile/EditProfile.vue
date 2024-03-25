<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import BasicInfoForm from '@/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import AddressForm from '@/modules/users/components/AddressForm/AddressForm.vue'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useAddressUpdate } from '@/modules/users/composables/useAddressUpdate/useAddressUpdate'
import { useUserProfileActions } from '@/modules/users/composables/useUserProfileActions/useUserProfileActions'
import { useUserUpdate } from '@/modules/users/composables/useUserUpdate/useUserUpdate'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

const { share } = useUserProfileActions()
const router = useRouter()

function handleShare(username: string) {
  share(username)
}

function handleNavigateToProfile(username: string) {
  router.push(`/${username}`)
}

const {
  loading: addressLoading,
  address,
  searchZipCode,
} = useAddressUpdate({
  user: user,
})

function handleZipCodeSearch() {
  searchZipCode()
}

const { loading: updateLoading, errors, safeParse, update } = useUserUpdate({ user })

function handleUpdateProfile() {
  const isValid = safeParse().success

  if (!isValid || !user.value) return

  user.value.address = address.value

  update()
}
</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      :avatar-url="user?.avatarUrl!"
      :username="user?.username!"
      @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
      class="my-10"
    />
  </HeadlineEditLoader>

  <WidgetDefault title="Informações básicas">
    <BasicInfoForm :errors="errors" v-model="user" />
  </WidgetDefault>

  <WidgetDefault title="Endereço" class="mt-5">
    <AddressForm :loading="addressLoading" v-model="address" @trigger-address-search="handleZipCodeSearch()" />
  </WidgetDefault>

  <Button
    @click="handleUpdateProfile"
    :loading="updateLoading"
    class="mt-5 w-full md:w-auto"
    label="Atualizar"
    icon="pi pi-pencil"
    icon-pos="right"
  />
</template>
