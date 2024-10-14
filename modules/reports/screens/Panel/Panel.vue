<script setup lang="ts">
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetLoader from '~/modules/reports/components/Widget/Loader/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'
import { useGistsReport } from '~/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistList } from '~/modules/gists/composables/useGistList/useGistList'
import { mySelfKey } from '~/modules/users/composables/useMyself/useMyself'
import type { MySelfContextProvider } from '~/modules/users/composables/useMyself/types'

const { user } = inject(mySelfKey) as MySelfContextProvider

const {
  loading: reportsLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
  totalSoldGists,
} = useGistsReport({ user, isMyself: true })

const router = useRouter()

const handleNavigateToGistDetail = (id: string) => {
  router.push(`/${user.value?.username}/gist/${id}`)
}

const {
  loading: loadingGists,
  loadingMore,
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
</script>

<template>
  <div class="min-h-[110vh]">
    <WidgetGroup v-if="user">
      <WidgetLoader :loading="reportsLoading" :amount="3">
        <WidgetCondensed :value="totalGists" label="Gists no total" />
        <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
        <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
        <WidgetCondensed :value="totalSoldGists" label="Gists vendidos" />
      </WidgetLoader>
    </WidgetGroup>

    <WidgetDefault title="Todos os gists" v-if="gists.length !== 0">
      <GistCardGroup>
        <GistCardGroupLoader :loading="loadingGists">
          <GistCardItem
            v-for="gist in gists"
            :id="gist.id"
            :title="gist.title"
            :description="gist.description"
            :lang="gist.lang"
            :price="gist.price"
            @tap="handleNavigateToGistDetail"
          />
        </GistCardGroupLoader>
      </GistCardGroup>
    </WidgetDefault>
  </div>
</template>
