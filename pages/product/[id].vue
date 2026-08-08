<template>
  <v-container v-if="product">
    <Breadcrumb :product="product" />

    <v-row>
      <v-col cols="12" md="6">
        <v-img
          v-if="images.length"
          :src="selectedImage"
          height="400"
          contain
        />
        <div v-else class="text-center text-grey pa-10" style="height: 400px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;">
          <span>No image available for this color</span>
        </div>

        <v-row v-if="images.length" class="mt-2">
          <v-col v-for="img in images" :key="img" cols="3">
            <v-img :src="img" @click="selectedImage = img" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <h1>{{ product.name.en || product.name.dk }}</h1>
        <p class="text-h5">{{ product.price }} DKK</p>
        <p>Brand: {{ product.brand }}</p>
        <p>Stock: {{ currentStock }}</p>

        <VariantSelector
          v-if="product.variant && product.variant.length"
          :variants="product.variant"
          @select="onVariantSelect"
        />

        <v-select
          v-else-if="product.size && product.size.length"
          :items="product.size"
          label="Size"
        />
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else>
    <v-progress-circular indeterminate />
  </v-container>
</template>

<script setup lang="ts">
import { useDataStore } from '~/stores/dataStore'
import type { Variant } from '~/stores/dataStore'

const route = useRoute()
const dataStore = useDataStore()
await dataStore.loadData()

const productId = parseInt(route.params.id as string)
const product = computed(() => dataStore.getProductById(productId))

// SEO
useHead(() => ({
  title: product.value?.name.en || product.value?.name.dk || 'Product',
  meta: [
    { name: 'description', content: `${product.value?.brand} - ${product.value?.price} DKK` }
  ]
}))

// Selected variant state
const currentVariant = ref<Variant | null>(null)

// Computed stock: variant stock if available, else product stock
const currentStock = computed(() => {
  if (currentVariant.value) {
    return currentVariant.value.stock
  }
  return product.value?.stock ?? 0
})

// Images: use variant images ONLY if available; else empty array
// For initial load (no variant selected), use product images if they exist.
const images = computed(() => {
  if (currentVariant.value) {
    return currentVariant.value.images?.length ? currentVariant.value.images : []
  }

  if (product.value?.images?.length) {
    return product.value.images
  }

  // Fallback: check if there's a first variant with images (optional)
  const firstVariant = product.value?.variant?.find(v => v.images?.length)
  return firstVariant?.images || []
})

const selectedImage = ref(images.value[0] || '')

// When variant is selected, update current variant and main image
const onVariantSelect = (variant: Variant) => {
  currentVariant.value = variant
  if (variant.images?.length) {
    selectedImage.value = variant.images[0]
  } else {
    selectedImage.value = ''
  }
}
</script>