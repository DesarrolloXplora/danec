<template>
  <div class="container mx-auto pt-4">
    <div class="flex flex-wrap">
      <!-- Filter Sidebar (desktop) -->
      <div v-if="!isMobile" :class="[onGetSize ? 'left-0' : 'left-120', 'w-full md:w-1/4 p-4']">
        <CatalogFilter
            v-if="initialFilter.end"
            @filter="filterCategory"
            @points="filterPoints"
            :categories="categories"
            :pointsFilter="initialFilter"
        />
      </div>
      <!-- Mobile Filter Button -->
      <div v-if="isMobile" class="w-full md:w-1/4 p-4">
        <button @click="isMobile = !isMobile" class="block w-full bg-primary text-white rounded px-4 py-2">
          Filtros
        </button>
      </div>
      <!-- Main Content -->
      <div class="w-full md:w-3/4 mx-auto">
        <!-- Top Bar: Cart, PDV Selector, and Total Points -->
        <div class="flex flex-wrap justify-around items-center mb-4">
          <div class="text-center cursor-pointer" @click="goto('/carrito')">
            <strong class="uppercase flex items-center">
              <span class="material-icons mr-2 text-2xl text-secondary">shopping_cart</span>
              Carrito
            </strong>
          </div>
          <div class="text-center">
            <select v-model="buying" @change="selectPdv(buying)" class="border rounded p-2">
              <option v-for="pdv in pdvs" :key="pdv.ruc" :value="pdv.ruc">
                {{ pdv.pdv }}
              </option>
            </select>
          </div>
          <div class="text-center">
            <strong>PUNTOS: {{ totalPoints }}</strong>
          </div>
        </div>
        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="offer in offers" :key="offer.id" class="flex flex-col items-center">
            <div class="border rounded shadow-sm w-full">
              <div class="p-2">
                <img :src="offer.product.image" alt="Product Image" class="object-contain h-48 w-full" />
              </div>
              <div class="bg-gray-200 p-4 text-center">
                <h2 class="text-primary font-bold uppercase mb-2">
                  {{ offer.product.name }}<br />
                  <span class="text-secondary">{{ offer.product.price }} Puntos</span>
                </h2>
                <p class="mb-2">{{ truncate(offer.product.detail) }}</p>
                <button
                    @click="addCartItem(offer.product.id, catalog.id, 1, offer.product.price)"
                    class="w-full bg-primary text-white py-2 rounded flex items-center justify-center"
                >
                  <span class="material-icons mr-2">shopping_cart</span>
                  canjear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CatalogFilter from '~/components/CatalogFilter.vue'
import { catalogService } from '~/services/catalogService'
import { userService } from '~/services/userService'
import { cartItemService } from '~/services/cartItemService'
import { useAccountStore } from '~/stores/account'
import { useCartItemStore } from '~/stores/cartItemStore'  // Use your cart item store

const router = useRouter()
const accountStore = useAccountStore()
const cartItemStore = useCartItemStore()

// Local reactive state
const catalog = ref({ offers: [] })
const isMobile = ref(false)
const categories = ref([])
const selected = ref('')
const pointsFilter = ref({ start: 0, end: 0 })
const buying = ref(null)
const initialFilter = ref({ start: 0, end: 0 })
const onGetSize = ref(false)

// Lifecycle: on mount, set responsive flags and load data
onMounted(() => {
  onGetSize.value = window.innerWidth <= 768
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('resize', () => {
    onGetSize.value = window.innerWidth <= 768
  })
  loadProducts()
  loadPoints()
})

// Computed: filter offers based on category and price range
const offers = computed(() => {
  return catalog.value.offers.filter(f => {
    const categoryMatch = selected.value ? f.product.type.name === selected.value : true
    const startMatch = pointsFilter.value.start ? f.product.price >= pointsFilter.value.start : true
    const endMatch = pointsFilter.value.end ? f.product.price <= pointsFilter.value.end : true
    return categoryMatch && startMatch && endMatch
  })
})

// Computed: total points from account store
const totalPoints = computed(() => {
  return accountStore.using && accountStore.points && accountStore.points[accountStore.using]
      ? accountStore.points[accountStore.using].total
      : 0
})

// Computed: list of PDVs from account store's points
const pdvs = computed(() => {
  return accountStore.points ? Object.values(accountStore.points) : []
})

// Navigation helper
function goto(url) {
  if (!url.startsWith('/')) url = '/' + url
  if (router.currentRoute.value.path !== url) router.push(url)
}

// Filter event handlers from CatalogFilter
function filterCategory(data) {
  selected.value = data ? categories.value[data] : ''
}
function filterPoints(obj) {
  pointsFilter.value.start = parseInt(obj.start)
  pointsFilter.value.end = parseInt(obj.end)
}

// Data loading methods
async function loadProducts() {
  const data = await catalogService.getAll()
  if (!data) return
  // Assume the API returns an array; use the first catalog.
  const catalogData = Array.isArray(data) ? data[0] : data
  catalog.value = catalogData
  categories.value.push('Todas')
  catalogData.offers.forEach(offer => {
    if (!categories.value.includes(offer.product.type.name)) {
      categories.value.push(offer.product.type.name)
    }
    if (initialFilter.value.end < offer.product.price) {
      initialFilter.value.end = offer.product.price
    }
  })
}

async function loadPoints() {
  const pointsData = await userService.getMyPoints()
  accountStore.updatePoints(pointsData)
  buying.value = accountStore.using
}

// Cart operations using cartItemService and cartItemStore
async function addCartItem(productId, catalogId, amount, price) {
  if (totalPoints.value < price) {
    alert('¡Hola Campeón! no te alcanza para canjear este item.')
    return
  }
  if (
      accountStore.points &&
      accountStore.points[accountStore.using] &&
      accountStore.points[accountStore.using].won < 600
  ) {
    alert('¡Hola Campeón! Recuerda que debes acumular al menos 600 puntos para empezar a canjear.')
    return
  }
  const item = { product: productId, catalog: catalogId, quantity: amount, ruc: accountStore.using }
  try {
    const response = await cartItemService.post(item)
    if (response) {
      // Update cart item store
      cartItemStore.addItem(item)
      // Deduct the cost from the user's total points
      accountStore.points[accountStore.using].total -= price
      accountStore.updatePoints(accountStore.points)
      alert('Producto añadido')
    }
  } catch (err) {
    console.error('Error adding cart item:', err)
    alert('Error al agregar el producto al carrito.')
  }
}

function selectPdv(selectedValue) {
  accountStore.updateUsing(selectedValue)
  buying.value = selectedValue
}

function truncate(str) {
  return str.substring(0, 100)
}
</script>

<style scoped>
.left-0 {
  left: 0;
}
.left-120 {
  left: 3rem;
  padding-top: 0;
  overflow-y: auto;
  position: relative;
}
</style>

