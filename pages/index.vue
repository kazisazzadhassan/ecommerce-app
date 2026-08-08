<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="selectedSort"
          :items="sortOptions"
          label="Sort by"
          @update:model-value="updateSort"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="selectedBrand"
          :items="brandOptions"
          label="Brand"
          clearable
          @update:model-value="updateBrand"
        />
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col
        v-for="item in gridItems"
        :key="item.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <PromoSpot v-if="item._type === 'promo'" :spot="item" />
        <ProductCard v-else :product="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useFilterSort } from '~/composables/useFilterSort'

const dataStore = useDataStore()
await dataStore.loadData()

const { category, sort, brand, updateQuery, products } = useFilterSort()

// sort options
const sortOptions = [
  { title: 'Price: Low to High', value: 'price_asc' },
  { title: 'Price: High to Low', value: 'price_desc' },
  { title: 'Name: A-Z', value: 'name_asc' },
  { title: 'Name: Z-A', value: 'name_desc' }
]
const selectedSort = ref(sort.value || null)
const updateSort = (val: string | null) => {
  updateQuery({ sort: val || undefined })
}

// brand filter
const brandOptions = computed(() => {
  const brands = new Set(dataStore.products.map(p => p.brand))
  return Array.from(brands).map(b => ({ title: b, value: b }))
})
const selectedBrand = ref(brand.value || null)
const updateBrand = (val: string | null) => {
  updateQuery({ brand: val || undefined })
}

// Insert promotional spots at their positions
const gridItems = computed(() => {
  const list = products.value.map(p => ({ ...p, _type: 'product' }))
  const spots = dataStore.promoSpots
    .filter(s => s.position > 0 && s.position <= list.length + 1)
    .sort((a, b) => a.position - b.position)

  // Insert spots, shifting positions accordingly
  for (const spot of spots) {
    const insertIndex = spot.position - 1 
    if (insertIndex >= 0 && insertIndex <= list.length) {
      list.splice(insertIndex, 0, { ...spot, _type: 'promo' })
    }
  }
  return list
})
</script>