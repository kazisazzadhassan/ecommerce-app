<template>
  <div v-if="variants.length">
    <p class="text-subtitle-1 mb-2">Color</p>
    <v-chip-group v-model="selectedColor" column>
      <v-chip
        v-for="variant in variants"
        :key="variant.color"
        :value="variant"
        :color="selectedColor?.color === variant.color ? 'primary' : ''"
        @click="selectColor(variant)"
      >
        {{ variant.color }}
      </v-chip>
    </v-chip-group>

    <div v-if="selectedColor" class="mt-4">
      <p class="text-subtitle-1 mb-2">Size</p>
      <v-select
        v-model="selectedSize"
        :items="selectedColor.size"
        label="Select size"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Variant } from '~/stores/dataStore'

const props = defineProps<{ variants: Variant[] }>()
const emit = defineEmits<{ (e: 'select', variant: Variant): void }>()

const selectedColor = ref<Variant | null>(props.variants[0] || null)
const selectedSize = ref<string | number | null>(null)

// When color changes, reset size and emit the variant
const selectColor = (variant: Variant) => {
  selectedColor.value = variant
  selectedSize.value = variant.size.length ? variant.size[0] : null
  emit('select', variant)
}

// Emit initial selection on mount
onMounted(() => {
  if (selectedColor.value) {
    selectedSize.value = selectedColor.value.size[0] || null
    emit('select', selectedColor.value)
  }
})
</script>