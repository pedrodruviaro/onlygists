<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '@/modules/users/components/PublicHeadline/Empty.vue'
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import { useGistsReport } from '@/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistList } from '@/modules/gists/composables/useGistList/useGistList'
import { useScroll } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const services = useServices()

const usernameFromRoute = route.params.username as string

const { data: user } = await useAsyncData('user-public-profile', () => {
  const username = usernameFromRoute
  return services.users.readOneByUsername(username)
})

const {
  loading: reportsLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
} = useGistsReport({ user, isMyself: false })

const {
  loading: loadingGists,
  loadingMore: loadingMoreGists,
  gists,
  fetchMoreGistsByUsername,
} = useGistList({ username: usernameFromRoute })

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
  <PublicHeadline
    v-if="user"
    :avatar-url="user.avatarUrl"
    :name="user.name"
    :bio="user.bio"
    :city="user.address?.city"
    :state="user.address?.state"
    class="my-10"
  />

  <PublicHeadlineEmpty v-else class="my-10" />

  <WidgetGroup v-if="user">
    <WidgetGroupLoader :loading="reportsLoading" :amount="3">
      <WidgetCondensed label="Gists no total" :value="totalGists" />
      <WidgetCondensed label="Gists gratuitos" :value="totalFreeGists" />
      <WidgetCondensed label="Gists pagos" :value="totalPaidGists" />
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
