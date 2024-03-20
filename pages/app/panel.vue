<script setup lang="ts">
import Panel from '@/modules/reports/screens/Panel/Panel.vue'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { user } = inject(myselfKey) as MyselfContextProvider
</script>

<template>
  {{ user.name ?? 'Carregando' }}
  <Panel />
</template>
