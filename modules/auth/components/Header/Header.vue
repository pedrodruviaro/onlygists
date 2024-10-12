<script setup lang="ts">
const props = defineProps<{
  profilePic?: string
  nickname: string
}>()

const emits = defineEmits<{
  (e: 'navigate-to-new-gist'): void
  (e: 'navigate-to-profile-edit'): void
  (e: 'navigate-to-sales'): void
  (e: 'navigate-to-reports'): void
  (e: 'logout'): void
}>()

const menuItems = [
  {
    label: 'Meu Perfil',
    items: [
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
        label: 'Vendas',
        icon: 'pi pi-money-bill',
        command: () => emits('navigate-to-sales'),
      },
      {
        label: 'Editar Perfil',
        icon: 'pi pi-user',
        command: () => emits('navigate-to-profile-edit'),
      },
    ],
  },

  {
    label: 'Ações',
    items: [
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => emits('logout'),
      },
    ],
  },
]

const menu = ref()

const toggle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>

<template>
  <header class="w-full shadow relative">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center max-w-screen-lg mx-auto">
        <div class="flex items-center">
          <NuxtLink to="/app/panel">
            <Logo />
          </NuxtLink>
        </div>

        <div class="flex items-center">
          <button class="flex gap-2 items-center" aria-haspopup="true" aria-controls="header-auth-menu" @click="toggle">
            <span class="font-regular text-lg text-gray-700">Olá, {{ props.nickname }}</span>
            <div v-if="props.profilePic" class="w-9 h-9 rounded-full overflow-hidden">
              <img :src="props.profilePic" alt="Foto de perfil do usuário" />
            </div>
          </button>
        </div>

        <Menu id="header-auth-menu" ref="menu" :model="menuItems" :popup="true"> </Menu>
      </div>
    </nav>
  </header>
</template>
