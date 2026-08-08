import { defineStore } from 'pinia'
import data from '~/assets/data.json' // import directly

// ---- Types ----
export interface Variant {
  stock: number | string
  color: string
  size: (string | number)[]
  images?: string[]
}

export interface Product {
  id: number
  brand: string
  price: number
  stock: number | string
  color: string
  size: (string | number)[]
  name: { en: string; dk: string }
  images?: string[]
  variant?: Variant[]
  categories: string[]
}

export interface CategoryNode {
  id: string
  parent_category_id: string
  level: number
  name: { en: string; dk: string }
  categories?: CategoryNode[]
}

export interface PromoSpot {
  link: string
  position: number
  type: '1x1' | '2x1' | '2x2'
  image: {
    aspectRatio: string
    imageUrl: string
    focalPoint: { x: number; y: number }
    maxWidth: string
    alt: string
  }
  imageAltText: string
  _alias: string
}

// Root structure of data.json
interface DataResponse {
  products: Product[]
  categories: CategoryNode
  promotionalSpots: PromoSpot[]
}

// ---- Store ----
export const useDataStore = defineStore('data', {
state: () => ({
    products: [] as Product[],
    categories: null as CategoryNode | null,
    promoSpots: [] as PromoSpot[],
    loaded: false
  }),
  actions: {
    loadData() {  // no async needed
      if (this.loaded) return
      this.products = data.products
      this.categories = data.categories
      this.promoSpots = data.promotionalSpots
      this.loaded = true
    }
  },
  getters: {
    categoryMap: (state) => {
      const map: Record<string, CategoryNode> = {}
      const traverse = (node: CategoryNode) => {
        map[node.id] = node
        if (node.categories) node.categories.forEach(traverse)
      }
      if (state.categories) traverse(state.categories)
      return map
    },
    getProductById: (state) => (id: number) => {
      return state.products.find(p => p.id === id)
    }
  }
})