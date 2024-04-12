<script setup lang="ts">
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineLoader from '@/modules/gists/components/PublicHeadline/Loader.vue'
import PublicHeadlineEmpty from '@/modules/gists/components/PublicHeadline/Empty.vue'
import GistCodeSnippet from '@/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useSession } from '~/modules/auth/composables/useSession/useSession'
import { useGistContent } from '@/modules/gists/composables/useGistContent/useGistContent'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(myselfKey) as MyselfContextProvider

const session = useSession()
const route = useRoute()
const router = useRouter()
const isPaymentSuccessfully = ref<boolean>(false)
const isPaymentFailed = ref<boolean>(false)

const services = useServices()

const gistId = route.params.id as string

const { data: gist, pending: loading } = await useAsyncData('gist-details', () => {
  return services.gists.readOne(gistId)
})

const { gistContent, loading: loadingContent } = useGistContent({
  gist,
})

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment) {
    isPaymentSuccessfully.value = true
  }

  if (fail_payment) {
    isPaymentFailed.value = true
  }
})

function navigateToGistEdit() {
  router.push(`/app/gist/${route.params.id}/edit`)
}
</script>

<template>
  <PublicHeadlineLoader :loading="loading">
    <PublicHeadline
      v-if="gist"
      :title="gist.title"
      :description="gist.description"
      :author="gist?.profiles.username"
      :lang="gist.lang"
    />
    <PublicHeadlineEmpty v-else />
  </PublicHeadlineLoader>

  <GistCodeSnippet v-if="gist" :loading="loadingContent" :lang="gist.lang" :code="gistContent" :isPaid="gist.isPaid" />

  <div class="flex flex-col gap-2 md:flex-row" v-if="gist">
    <Button
      v-if="user?.username !== route.params.username"
      :label="`Comprar por ${gist.price}`"
      class="mt-5 w-full md:w-auto"
      icon="pi pi-shopping-bag"
      icon-pos="right"
    />
    <Button
      v-if="session.isLogged() && user?.username === route.params.username"
      label="Editar este gist"
      class="mt-5 w-full md:w-auto"
      icon="pi pi-pencil"
      icon-pos="right"
      @click="navigateToGistEdit"
    />
  </div>

  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFailed" />
</template>
