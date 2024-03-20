<script setup lang="ts">
const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

const emits = defineEmits<{
  (e: 'navigate-to-new-gist'): void
  (e: 'navigate-to-profile-edit'): void
  (e: 'navigate-to-reports'): void
  (e: 'navigate-to-sales'): void
  (e: 'logout'): void
}>()

const items = [
  {
    label: 'Painel',
    icon: 'pi pi-chart-line',
    command: () => emits('navigate-to-reports'),
  },
  {
    label: 'Novo gist',
    icon: 'pi pi-plus',
    command: () => emits('navigate-to-new-gist'),
  },
  {
    label: 'Editar perfil',
    icon: 'pi pi-user',
    command: () => emits('navigate-to-profile-edit'),
  },
  {
    label: 'Vendas',
    icon: 'pi pi-money-bill',
    command: () => emits('navigate-to-sales'),
  },
  {
    separator: true,
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => emits('logout'),
  },
]

const menu = ref()

function toggle(event: Event) {
  menu.value?.toggle(event)
}
</script>

<template>
  <div class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <NuxtLink to="/app/panel">
          <Logo />
        </NuxtLink>

        <div class="items-center">
          <button class="flex gap-2 items-center" aria-haspopup="true" aria-controls="header-auth-menu" @click="toggle">
            <span class="font-[Inter] text-lg text-gray-700">Olá, {{ props.nickname }}</span>

            <div class="w-9 h-9 rounded-full overflow-hidden" v-if="props.profilePic">
              <img :src="props.profilePic" alt="Foto de perfil do usuário" />
            </div>
          </button>
        </div>

        <Menu ref="menu" :model="items" :popup="true"> </Menu>
      </div>
    </nav>
  </div>
</template>
