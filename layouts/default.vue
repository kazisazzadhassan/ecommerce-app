<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>E‑Commerce</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="300" class="pa-0">
      <CategoryNav
        v-if="categories.length"
        :categories="categories"
        :max-depth="4"
      />
    </v-navigation-drawer>

    <v-main>
      <slot /> 
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useDataStore } from '~/stores/dataStore'
const dataStore = useDataStore()
await dataStore.loadData()
const drawer = ref(false)
const categories = computed(() => dataStore.categories?.categories || [])
</script>