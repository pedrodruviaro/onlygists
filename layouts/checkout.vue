<script setup lang="ts">
import Header from '~/modules/auth/components/Header/Header.vue'
import HeaderLoader from '~/modules/auth/components/Header/Loader.vue'
import HeaderNotAuthenticated from '~/modules/landing-page/components/Header/Header.vue'

import { useSession } from '~/modules/auth/composables/useSession/useSession'
import { useMyself } from '~/modules/users/composables/useMyself/useMyself'

const session = useSession()
const { user, loading } = useMyself()

const nickname = computed(() => {
  if (!user.value?.name) {
    return 'Usuário'
  }

  const [nick] = user.value.name.split(' ')
  return nick
})

const profilePic = computed(() => {
  return user.value?.avatarUrl || ''
})

const router = useRouter()
const handleLogout = async () => {
  const { error } = await session.logout()

  if (!error) router.push('/')
}

const handleWantsBeCreator = () => {
  router.push('/auth/login')
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <MainContent>
      <template #header>
        <HeaderLoader :loading="loading">
          <Header
            :profile-pic="profilePic"
            :nickname="nickname"
            @navigate-to-new-gist="router.push('/app/gist/create')"
            @navigate-to-profile-edit="router.push('/app/profile/edit')"
            @navigate-to-sales="router.push('/app/sales/all')"
            @navigate-to-reports="router.push('/app/panel')"
            @logout="handleLogout"
            v-if="session.isLogged()"
          />

          <HeaderNotAuthenticated @wants-be-creator="handleWantsBeCreator" v-else />
        </HeaderLoader>
      </template>
      <template #content>
        <Splash :loading="loading">
          <slot />
        </Splash>
      </template>
    </MainContent>
  </div>
</template>
