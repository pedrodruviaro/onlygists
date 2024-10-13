<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import type { ZodFormattedError } from 'zod'
import type { Code } from '~/modules/gists/entities/Gist/Gist'

const DEFAULT_CODE_SNIPPET = `interface User {
  name: string
  roles: string[]
}

const user = ref<User>()

function main() {
    return toValue(user)
}
`

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  padding: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  fontSize: 15,
}

const props = defineProps<{
  errors?: ZodFormattedError<Code>
}>()

const code = defineModel<Code>({
  required: true,
  default: {
    content: DEFAULT_CODE_SNIPPET,
    lang: 'typescript',
  },
})
</script>

<template>
  <div class="grid gap-2 w-full min-h-[500px]">
    <label for="editor">Escreva o código</label>
    <VueMonacoEditor
      id="editor"
      theme="vs"
      v-model:value="code.content"
      class="border-2 border-solid border-gray-100"
      :options="MONACO_EDITOR_OPTIONS"
      :default-language="code.lang"
      :language="code.lang"
    />
    <small v-if="props.errors?.content">{{ props.errors?.content?._errors[0] }}</small>
  </div>
</template>
