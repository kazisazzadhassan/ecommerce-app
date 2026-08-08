<template>
  <v-list-group
    v-if="hasChildren && depth < (maxDepth ?? 3)"
    :value="node.id"
    density="compact"
  >
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :to="`/?category=${node.id}`"
        :title="node.name.en"
        :active="isActive"
        density="compact"
      />
    </template>

    <!-- Recursively render children with increased depth -->
    <CategoryNavItem
      v-for="child in node.categories"
      :key="child.id"
      :node="child"
      :depth="depth + 1"
      :max-depth="maxDepth"
    />
  </v-list-group>

  <!-- Leaf node (no children) -->
  <v-list-item
    v-else
    :to="`/?category=${node.id}`"
    :title="node.name.en"
    :active="isActive"
    density="compact"
  />
</template>

<script setup lang="ts">
import type { CategoryNode } from '~/stores/dataStore'

const props = defineProps<{
  node: CategoryNode
  depth?: number
  maxDepth?: number
}>()

const route = useRoute()
const isActive = computed(() => route.query.category === props.node.id)
const hasChildren = computed(() => !!props.node.categories?.length)
</script>

<style scoped>
.v-list-group {
  padding-left: 0 !important;
}
.v-list-group .v-list-group__activator > .v-list-item {
  padding-left: 0 !important;
}
.v-list-group .v-list-group {
  border-left: 2px solid rgba(0, 0, 0, 0.06);
}
</style>