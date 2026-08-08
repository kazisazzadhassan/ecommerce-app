export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module'
  ],
  vuetify: {
    vuetifyOptions: {
      // theme: { defaultTheme: 'light' }
    }
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify']
  },
  ssr: true, // enabled by default
  runtimeConfig: {
  }
})