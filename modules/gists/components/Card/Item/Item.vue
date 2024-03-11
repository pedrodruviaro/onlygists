<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  description: string
  price: number
  lang: string
}>()

const emit = defineEmits<{
  (e: 'tap', id: string): void
}>()

const { render } = useMarkdown()

const isFree = computed(() => {
  return props.price === 0
})

const description = computed(() => {
  return render(props.description)
})

const amount = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.price)
})

function handleClick() {
  emit('tap', props.id)
}
</script>

<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ props.title }}
          <Chip :label="props.lang" class="text-sm" icon="pi pi-bolt" />
        </div>
      </template>

      <template #content>
        <div v-html="description"></div>
      </template>

      <template #footer>
        <Button
          @click="handleClick"
          label="Baixar gratuitamente"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          class="w-full"
          v-if="isFree"
        />

        <Button
          @click="handleClick"
          :label="`Comprar por ${amount}`"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          class="w-full"
          v-else
        />
      </template>
    </Card>
  </div>
</template>
