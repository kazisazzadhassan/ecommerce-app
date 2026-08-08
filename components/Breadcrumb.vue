<template>
  <v-breadcrumbs :items="breadcrumbs" />
</template>

<script setup lang="ts">
import type { Product } from '~/stores/dataStore'

const props = defineProps<{ product: Product }>()
const dataStore = useDataStore()
const categoryMap = dataStore.categoryMap

const breadcrumbs = computed(() => {
  const crumbs = [{ title: 'Home', to: '/' }]
  // find the first category in product.categories that exists in map
  const catId = props.product.categories.find(id => !!categoryMap[id])
  if (catId) {
    // climb up the tree (we can collect all ancestors)
    const node = categoryMap[catId]
    const path = []
    let current: CategoryNode | undefined = node
    while (current && current.id !== 'root') {
      path.unshift({ title: current.name.en, to: `/?category=${current.id}` })
      current = categoryMap[current.parent_category_id]
    }
    crumbs.push(...path)
  }
  crumbs.push({ title: props.product.name.en || props.product.name.dk, disabled: true })
  return crumbs
})
</script>