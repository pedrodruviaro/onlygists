<script setup lang="ts">
import HeadlineEdit from '@/modules/gists/components/HeadlineEdit/HeadlineEdit.vue'
import CodeEdit from '@/modules/gists/components/CodeEdit/CodeEdit.vue'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useGistUpdate } from '@/modules/gists/composables/useGistUpdate/useGistUpdate'
import { useGistDelete } from '@/modules/gists/composables/useGistDelete/useGistDelete'
import { useGist } from '@/modules/gists/composables/useGist/useGist'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

const router = useRouter()
const route = useRoute()
const id = route.params.id as string
const { user } = inject(myselfKey) as MyselfContextProvider
const { gist } = useGist({ id })

const { loading, headline, code, errors, safeParse, update } = useGistUpdate({ gist })
const { remove, loading: loadingDelete } = useGistDelete({ gist })

function handleLanguageChange(lang: string) {
  code.value.lang = lang
}

async function handleUpdateGist() {
  const isValid = safeParse().success

  if (!isValid) return

  const response = await update()
  if (response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}

const confirm = useConfirm()

async function handleDeleteGist() {
  confirm.require({
    header: 'Apagar gist',
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
  <ConfirmDialog />

  <WidgetDefault title="Qual gist você quer criar?" class="my-5">
    <HeadlineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgetDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgetDefault>

  <div class="flex gap-2">
    <Button
      label="Editar"
      icon-pos="right"
      icon="pi pi-plus"
      class="mt-5 w-full md:w-auto"
      :loading="loading"
      @click="handleUpdateGist"
    />

    <Button
      label="Deletar"
      icon-pos="right"
      icon="pi pi-trash"
      class="mt-5 w-full md:w-auto"
      severity="danger"
      :loading="loadingDelete"
      @click="handleDeleteGist"
    />
  </div>
</template>
