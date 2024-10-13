<script setup lang="ts">
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetLoader from '~/modules/reports/components/Widget/Loader/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import PublicHeadline from '~/modules/users/components/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineEmpty from '~/modules/users/components/PublicHeadline/Empty.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'

const router = useRouter()
const route = useRoute()
const username = computed(() => route.params.username as string)

const handleNavigateToGistDetail = (id: string) => {
  router.push(`/${username.value}/gists/${id}`)
}

const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => {
  return services.users.readOneByUsername(username.value)
})
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

  <WidgetGroup>
    <WidgetLoader :loading="false" :amount="3">
      <WidgetCondensed :value="12" label="Gists no total" />
      <WidgetCondensed :value="5" label="Gists gratuitos" />
      <WidgetCondensed :value="7" label="Gists pagos" />
    </WidgetLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="false">
        <GistCardItem
          v-for="i in 10"
          id="123"
          title="useCurrentUser.ts"
          description="hook para pegar o usuário **logado**"
          lang="typescript"
          :price="10"
          @tap="handleNavigateToGistDetail"
        />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
