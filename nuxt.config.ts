// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', '@nuxtjs/google-fonts'],

  css: ['primeicons/primeicons.css'],

  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    overwriting: true,
    families: {
      Inter: [300, 500, 800],
    },
  },

  primevue: {
    options: {
      unstyled: true,
    },
    importPT: {
      as: 'lara',
      from: '@/assets/presets/lara/',
    },
  },
})
