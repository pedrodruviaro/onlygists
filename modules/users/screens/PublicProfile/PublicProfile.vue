<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'

const route = useRoute()
const router = useRouter()

function handleNavigateToDetail(id: string) {
  const { username } = route.params

  router.push(`/${username}/gist/${id}`)
}
</script>

<template>
  <PublicHeadline />

  <WidgetGroup>
    <WidgetGroupLoader :loading="false" :amount="3">
      <WidgetCondensed label="Gists no total" :value="10" />
      <WidgetCondensed label="Gists gratuitos" :value="2" />
      <WidgetCondensed label="Gists pagos" :value="8" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os Gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="false">
        <GistCardItem
          @tap="handleNavigateToDetail"
          id="123"
          title="useCurrentUser.ts"
          description="Pega o **usuário** atual logado na aplicação"
          :price="10"
          lang="typescript"
          v-for="n in 10"
          :key="n"
        />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
