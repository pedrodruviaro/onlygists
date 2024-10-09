<script setup lang="ts">
import WidgetGroup from '~/modules/reports/components/Widget/Group/Group.vue'
import WidgetLoader from '~/modules/reports/components/Widget/Loader/Loader.vue'
import WidgetCondensed from '~/modules/reports/components/Widget/Condensed/Condensed.vue'
import PublicHeadline from '~/modules/users/components/PublicHeadline/PublicHeadline.vue'
import GistCardGroup from '~/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '~/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '~/modules/gists/components/Card/Item/Item.vue'

const router = useRouter()
const route = useRoute()
const username = computed(() => route.params.username as string)

const handleNavigateToGistDetail = (id: string) => {
  router.push(`/${username.value}/gists/${id}`)
}
</script>

<template>
  <PublicHeadline
    name="pedrodruviaro"
    avatarUrl="https://avatars.githubusercontent.com/u/82953655?v=4"
    bio="Software engineer"
    city="São Paulo"
    state="SP"
  />

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
