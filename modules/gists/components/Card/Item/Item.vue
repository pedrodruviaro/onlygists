<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  description: string
  price: number
  lang: string
}>()

const emits = defineEmits<{
  (e: 'tap', id: string): void
}>()

const handleClick = () => {
  emits('tap', props.id)
}

const isFree = computed(() => props.price === 0)

const amount = computed(() => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.price)
})

const { render } = useMarkdown()
const description = computed(() => render(props.description))
</script>

<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ props.title }}
          <Chip :label="props.lang" icon="pi pi-bolt" class="text-sm" />
        </div>
      </template>

      <template #content>
        <div v-html="description" />
      </template>

      <template #footer>
        <Button
          v-if="isFree"
          label="Baixar gratuitamente"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          class="w-full"
          @click="handleClick"
        />
        <Button
          v-else
          :label="`Comprar por ${amount}`"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          class="w-full"
          @click="handleClick"
        />
      </template>
    </Card>
  </div>
</template>
