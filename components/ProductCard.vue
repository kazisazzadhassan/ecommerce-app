<template>
  <v-card
    :to="`/product/${product.id}`"
    link
    class="product-card"
    height="100%"
    elevation="2"
  >
    <v-img
      v-if="product.images && product.images.length"
      :src="product.images[0]"
      height="250"
      width="100%"
      cover
    />
    <v-card-title>{{ product.name.en || product.name.dk }}</v-card-title>
    <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
    <v-card-text>
      <span class="text-h6">{{ product.price }} DKK</span>
      <span v-if="product.stock === 0" class="text-red ml-2">Out of stock</span>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Product } from '~/stores/dataStore'
defineProps<{ product: Product }>()
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-4px);
}
.v-img {
  flex-shrink: 0;
}
</style>