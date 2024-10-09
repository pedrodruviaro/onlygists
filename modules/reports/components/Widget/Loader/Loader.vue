<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean
    amount?: number
  }>(),
  {
    amount: 3,
  },
)
</script>

<template>
  <template v-if="props.loading">
    <div class="flex flex-col md:flex-row justify-between gap-5 py-10 w-full">
      <div
        class="flex flex-1 flex-col bg-white p-5 gap-2 rounded"
        v-for="loader in props.amount"
        :key="`loader-${loader}`"
      >
        <Skeleton width="5rem" height="3rem" />
        <Skeleton width="100%" height="2rem" />
      </div>
    </div>
  </template>

  <slot v-else />
</template>
