<template>
  <v-card height="100%" class="promo-card" elevation="2">
    <v-img
      :src="spot.image.imageUrl"
      :alt="spot.image.alt"
      height="250"
      contain
      class="bg-grey-lighten-3"
    />
    <v-card-actions class="d-flex justify-center">
      <v-btn :href="spot.link" color="primary">Shop now</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { PromoSpot } from '~/stores/dataStore'
defineProps<{ spot: PromoSpot }>()
</script>

<style scoped>
.promo-card {
  display: flex;
  flex-direction: column;
}
.promo-card .v-img {
  flex-shrink: 0;
}
</style>