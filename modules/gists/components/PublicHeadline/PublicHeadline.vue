<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    lang: string
    description: string
    author: string
  }>(),
  {
    title: 'currency.format.py',
    lang: 'python',
    description: 'função emm *python* para formatar moedas ',
    author: 'pedrodruviaro',
  },
)

const { render } = useMarkdown()

const description = computed(() => {
  return render(props.description)
})
</script>

<template>
  <div class="w-full flex flex-col justify-center gap-2 py-5">
    <div class="flex flex-wrap items-center gap-2">
      <h1 class="font-[Inter] text-gray-700 font-bold text-2xl md:text-3xl">{{ props.title }}</h1>
      <Chip class="text-sm" :label="props.lang" icon="pi pi-bolt" />
    </div>

    <div v-html="description" class="font-[Inter] text-gray-700 font-regular md:text-lg" />

    <p class="font-[Inter] font-regular text-gray-500 text-sm md:text-base">
      <i class="pi pi-star"></i>
      by
      <NuxtLink :to="`/${props.author}`" class="text-primary-500">@{{ props.author }}</NuxtLink>
    </p>
  </div>
</template>
