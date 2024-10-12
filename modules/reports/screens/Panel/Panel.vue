<script setup lang="ts">
import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(mySelfKey) as MySelfContextProvider
</script>

<template>
  {{ user?.name ?? 'Carregando' }}
</template>
