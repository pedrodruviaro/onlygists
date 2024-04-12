<script setup lang="ts">
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import { useGistList } from '~/modules/gists/composables/useGistList/useGistList'
import { myselfKey } from '~/modules/users/composables/useMyself/useMyself'
import { useGistsReport } from '@/modules/reports/composables/useGistsReport/useGistsReport'
import { useScroll } from '@vueuse/core'
import type { MyselfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(myselfKey) as MyselfContextProvider

const route = useRoute()
const router = useRouter()

const {
  loading: reportsLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
  totalSoldGists,
} = useGistsReport({ user, isMyself: true })

const {
  loading: loadingGists,
  loadingMore: loadingMoreGists,
  gists,
  fetchMoreGistsByUsername,
} = useGistList({ username: user.value?.username! })

const { arrivedState } = useScroll(window, {
  offset: { bottom: 100 },
})

watch(
  () => arrivedState.bottom,
  () => {
    if (!arrivedState.bottom) return

    fetchMoreGistsByUsername()
  },
)

function handleNavigateToDetail(id: string) {
  const { username } = route.params

  router.push(`/${username}/gist/${id}`)
}
</script>

<template>
  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="reportsLoading" :amount="4">
      <WidgetCondensed label="Gists no total" :value="totalGists" />
      <WidgetCondensed label="Gists gratuitos" :value="totalFreeGists" />
      <WidgetCondensed label="Gists pagos" :value="totalPaidGists" />
      <WidgetCondensed label="Gists vendidos" :value="totalSoldGists" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os Gists" v-if="gists.length !== 0">
    <GistCardGroup>
      <GistCardGroupLoader :loading="loadingGists">
        <GistCardItem
          @tap="handleNavigateToDetail"
          v-for="gist in gists"
          :key="gist.id"
          :id="gist.id"
          :title="gist.title"
          :description="gist.description"
          :price="gist.price"
          :lang="gist.lang"
        />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
