import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore, type Product } from '~/stores/dataStore'

export function useFilterSort() {
  const route = useRoute()
  const router = useRouter()
  const store = useDataStore()

  const category = computed(() => route.query.category as string || '')
  const sort = computed(() => route.query.sort as string || '')
  const brand = computed(() => route.query.brand as string || '')

  const updateQuery = (params: Record<string, string | undefined>) => {
    router.push({ query: { ...route.query, ...params } })
  }

  const products = computed(() => {
    let list = store.products

    // Filter by category
    if (category.value) {
      list = list.filter(p => p.categories.includes(category.value))
    }

    // Filter by brand
    if (brand.value) {
      list = list.filter(p => p.brand === brand.value)
    }

    // Sort
    if (sort.value) {
      const [field, order] = sort.value.split('_')
      list = [...list].sort((a, b) => {
        let valA: string | number
        let valB: string | number

        if (field === 'name') {
          // Use the English name if available, fallback to Danish
          valA = a.name.en || a.name.dk || ''
          valB = b.name.en || b.name.dk || ''
        } else if (field === 'price' || field === 'stock') {
          // For price/stock, ensure numeric comparison
          valA = Number(a[field as keyof Product]) || 0
          valB = Number(b[field as keyof Product]) || 0
        } else {
          valA = a[field as keyof Product] as string | number
          valB = b[field as keyof Product] as string | number
        }

        // String comparison (case‑insensitive)
        if (typeof valA === 'string') valA = valA.toLowerCase()
        if (typeof valB === 'string') valB = valB.toLowerCase()

        if (valA < valB) return order === 'asc' ? -1 : 1
        if (valA > valB) return order === 'asc' ? 1 : -1
        return 0
      })
    }

    return list
  })

  return { category, sort, brand, updateQuery, products }
}