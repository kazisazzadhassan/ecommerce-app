<template>
  <v-list v-if="categories" density="compact" class="category-nav">
    <CategoryNavItem
      v-for="child in categories"
      :key="child.id"
      :node="child"
      :depth="1"
      :max-depth="maxDepth"
    />
  </v-list>
</template>

<script setup lang="ts">
import type { CategoryNode } from '~/stores/dataStore'

defineProps<{
  categories: CategoryNode[]
  maxDepth?: number
}>()
</script>

<style scoped>
.category-nav {
  padding: 0 !important;
}
</style>