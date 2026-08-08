<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>E‑Commerce</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <CategoryNav :categories="dataStore.categories?.categories || []" :max-depth="4" />
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const dataStore = useDataStore()
await dataStore.loadData()
const drawer = ref(false)
</script>