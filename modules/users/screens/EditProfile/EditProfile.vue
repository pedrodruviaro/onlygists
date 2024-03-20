<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'

import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

function handleShare() {}

function handleNavigateToProfile() {}
</script>

<template>
  <HeadlineEditLoader :loading="loading">
    <HeadlineEdit
      v-if="user"
      :avatar-url="user?.avatarUrl"
      :username="user?.username"
      @share="handleShare"
      @navigate-to-profile="handleNavigateToProfile"
      class="mt-10"
    />
  </HeadlineEditLoader>
</template>
