<script setup lang="ts">
import HeadlineEdit from '~/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import CodeEdit from '~/modules/gists/components/CodeEdit/CodeEdit.vue'
import { useGistUpdate } from '~/modules/gists/composables/useGistUpdate/useGistUpdate'
import { useGistDelete } from '~/modules/gists/composables/useGistDelete/useGistDelete'
import { useGist } from '~/modules/gists/composables/useGist/useGist'
import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(mySelfKey) as MySelfContextProvider

const router = useRouter()
const route = useRoute()
const gistId = computed(() => String(route.params.id))
const { gist } = useGist({
  id: gistId.value,
})

const { code, headline, loading, errors, update, safeParse } = useGistUpdate({ gist })

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}

const handleUpdateGist = async () => {
  const isValid = safeParse().success
  if (!isValid) return

  const response = await update()
  if (response) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}

const { loading: loadingDelete, remove } = useGistDelete({ gist })

const confirm = useConfirm()

const handleDeleteGist = () => {
  confirm.require({
    header: 'Apagar Gist',
    message: 'Tem certeza que deseja apagar esse gist?',
    rejectLabel: 'Voltar',
    acceptLabel: 'Quero apagar',

    accept: async () => {
      await remove()
      router.push(`/${user.value?.username}`)
    },
  })
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

  <div class="flex gap-2 flex-wrap mt-5">
    <Button
      label="Salvar edição"
      class="w-full md:w-auto"
      :loading="loading"
      icon="pi pi-save"
      icon-pos="right"
      @click="handleUpdateGist"
    />

    <Button
      label="Apagar gist"
      class="w-full md:w-auto"
      severity="danger"
      :loading="loadingDelete"
      @click="handleDeleteGist"
    />
  </div>

  <ConfirmDialog />
</template>
