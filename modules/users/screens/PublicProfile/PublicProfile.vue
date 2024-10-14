<script setup lang="ts">
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetLoader from '~/modules/reports/components/Widget/Loader/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import PublicHeadline from '~/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '~/modules/users/components/PublicHeadline/Empty.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'
import { useGistsReport } from '~/modules/reports/composables/useGistsReport/useGistsReport'
import { useGistList } from '~/modules/gists/composables/useGistList/useGistList'

const router = useRouter()
const route = useRoute()
const username = computed(() => route.params.username as string)

const handleNavigateToGistDetail = (id: string) => {
  router.push(`/${username.value}/gist/${id}`)
}

const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => {
  return services.users.readOneByUsername(username.value)
})

const {
  loading: reportsLoading,
  totalGists,
  totalFreeGists,
  totalPaidGists,
} = useGistsReport({ user, isMyself: false })

const {
  loading: loadingGists,
  loadingMore,
  gists,
  fetchMoreGistsByUsername,
} = useGistList({ username: username.value })

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
  <div class="my-10">
    <PublicHeadline
      v-if="user"
      :name="user?.name"
      :avatarUrl="user?.avatarUrl"
      :bio="user?.bio"
      :city="user?.address?.city"
      :state="user?.address?.state"
    />
    <PublicHeadlineEmpty v-else />
  </div>

  <WidgetGroup v-if="user">
    <WidgetLoader :loading="reportsLoading" :amount="3">
      <WidgetCondensed :value="totalGists" label="Gists no total" />
      <WidgetCondensed :value="totalFreeGists" label="Gists gratuitos" />
      <WidgetCondensed :value="totalPaidGists" label="Gists pagos" />
    </WidgetLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists" v-if="gists.length !== 0" class="pb-20">
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
</template>
