<script setup lang="ts">
import HeadlineEdit from '~/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import CodeEdit from '~/modules/gists/components/CodeEdit/CodeEdit.vue'
import { useGistUpdate } from '~/modules/gists/composables/useGistUpdate/useGistUpdate'
import { useGist } from '~/modules/gists/composables/useGist/useGist'
import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(mySelfKey) as MySelfContextProvider

const route = useRoute()
const gistId = computed(() => String(route.params.id))
const { gist } = useGist({
  id: gistId.value,
})

const { code, headline, loading, errors, update, safeParse } = useGistUpdate({ gist })

const router = useRouter()
const handleCreateGist = async () => {
  const isValid = safeParse().success
  if (!isValid) return

  const response = await update()
  if (response) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}
</script>

<template>
  <WidgetDefault title="Qual gist você quer criar?" class="mt-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgetDefault title="Show me the code!" class="mt-5">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgetDefault>

  <Button
    label="Salvar edição"
    class="mt-5 w-full md:w-auto"
    :loading="loading"
    icon="pi pi-save"
    icon-pos="right"
    @click="handleCreateGist"
  />
</template>
