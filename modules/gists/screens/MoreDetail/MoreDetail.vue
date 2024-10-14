<script setup lang="ts">
import PublicHeadline from '~/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineLoader from '~/modules/gists/components/PublicHeadline/Loader.vue'
import PublicHeadlineEmpty from '~/modules/gists/components/PublicHeadline/Empty.vue'
import GistCodeSnippet from '~/modules/gists/components/CodeSnippet/CodeSnippet.vue'
import LazyDialogPaymentSuccess from '~/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import LazyDialogPaymentError from '~/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'
import { useSession } from '~/modules/auth/composables/useSession/useSession'
import { useGistContent } from '~/modules/gists/composables/useGistContent/useGistContent'
import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(mySelfKey) as MySelfContextProvider
const session = useSession()
const route = useRoute()
const router = useRouter()
const services = useServices()

const isGistOwner = computed(() => user?.value?.username === String(route.params.username))
const canEditGist = computed(() => session.isLogged() && isGistOwner.value)
const gistId = computed(() => String(route.params.id))

const { data: gist, status } = await useAsyncData('gist-detail', async () => {
  return services.gists.readOne(gistId.value)
})

const { gistContent, loading: loadingContent } = useGistContent({ gist })

const handleNavigateToGistEdit = () => {
  router.push(`/app/gist/${gistId.value}/edit`)
}

const isPaymentSuccessfully = ref(false)
const isPaymentFailed = ref(false)
onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment) isPaymentSuccessfully.value = true
  if (fail_payment) isPaymentFailed.value = true
})

defineOgImage({
  component: 'GistDetail',
  props: {
    title: `${gist.value?.title} by @${gist.value?.profiles.username}`,
    description: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
  },
})

useSeoMeta({
  title: `${gist.value?.title} by @${gist.value?.profiles.name}`,
  ogTitle: `${gist.value?.title} by @${gist.value?.profiles.name}`,
  description: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
  ogDescription: `Veja o gist de ${gist.value?.profiles.name} no onlygists`,
})
</script>

<template>
  <PublicHeadlineLoader :loading="status === 'pending'">
    <PublicHeadline
      v-if="gist"
      :title="gist?.title"
      :description="gist?.description"
      :author="gist.profiles.username || ''"
      :lang="gist.lang"
    />
    <PublicHeadlineEmpty v-else />
  </PublicHeadlineLoader>

  <template v-if="gist">
    <GistCodeSnippet :loading="loadingContent" :isPaid="gist.isPaid" :lang="gist.lang" :code="gistContent" />
    <div class="flex flex-col md:flex-row gap-2 mt-5">
      <Button
        v-if="!isGistOwner"
        :label="`Comprar por 10`"
        class="w-full md:w-auto"
        icon="pi pi-shopping-bag"
        icon-pos="right"
      />
      <Button
        label="Editar este gist"
        class="w-full md:w-auto"
        icon="pi pi-pencil"
        icon-pos="right"
        @click="handleNavigateToGistEdit"
        v-if="canEditGist"
      />
    </div>
  </template>

  <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  <LazyDialogPaymentError v-model:visible="isPaymentFailed" />
</template>
