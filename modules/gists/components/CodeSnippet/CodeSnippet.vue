<script setup lang="ts">
import Loader from './Loader.vue'
import { common, createStarryNight } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'
import '@wooorm/starry-night/style/light'

const DEFAULT_CODE_SNIPPET = `interface User {
  name: string
}

const user = ref<User>()

const message = "Você precisa pagar para ter acesso à esse gist"
console.log(message)
`

const props = withDefaults(
  defineProps<{
    isPaid: boolean
    loading: boolean
    code?: string
    lang: string
  }>(),
  {
    code: DEFAULT_CODE_SNIPPET,
  },
)

const loading = ref(true)
const htmlCode = ref('')

const registerSyntaxHightlight = async () => {
  loading.value = true

  const starryNight = await createStarryNight(common)
  const scope = starryNight.flagToScope(props.lang)
  const tree = starryNight.highlight(props.code, scope!)

  htmlCode.value = toHtml(tree)
  loading.value = false
}

onMounted(() => registerSyntaxHightlight())
</script>

<template>
  <Loader :loading="props.loading || loading">
    <div class="w-full relative" v-if="props.isPaid">
      <span class="absolute top-[43%] left-[50%] z-[999]">
        <i class="pi pi-lock text-3xl text-gray-700"></i>
      </span>
      <pre
        :class="{ 'blur-sm': props.isPaid }"
        class="w-full select-none rounded bg-gray-200 p-5 overflow-x-hidden"
        v-html="htmlCode"
      ></pre>
    </div>

    <pre v-if="!props.isPaid" class="w-full rounded bg-gray-200 p-5 overflow-x-scroll" v-html="htmlCode"></pre>
  </Loader>
</template>
