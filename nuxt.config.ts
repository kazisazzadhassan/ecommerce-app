// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module'
  ],
  vuetify: {
    // Vuetify options (optional)
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
    // if you need to load JSON from file, you can place it in public/ or server/
  }
})