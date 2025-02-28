<template>
  <div class="container mx-auto pt-4">
    <div class="flex">
      <!-- Filter Sidebar (desktop) -->
      <div v-if="!isMobile" class="hidden md:block md:w-1/4 p-4 sticky top-4">
        <CatalogFilter
            v-if="initialFilter.end"
            @filter="filterCategory"
            @points="filterPoints"
            :categories="categories"
            :pointsFilter="initialFilter"
        />
      </div>
      <!-- Main Content -->
      <div class="w-full md:w-3/4 p-4">
        <!-- Top Bar: Cart, PDV Selector, and Total Points -->
        <div class="flex flex-wrap justify-around items-center mb-4">
          <div class="text-center cursor-pointer" @click="goto('/carrito')">
            <strong class="uppercase flex items-center">
              <span class="material-icons mr-2 text-2xl text-secondary">shopping_cart</span>
              Carrito
            </strong>
          </div>
          <div class="text-center">
            <strong>PUNTOS: {{ totalPoints }}</strong>
          </div>
        </div>
        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProductCard
              v-for="offer in offers"
              :key="offer.id"
              :product="offer.product"
              :quantity="offer.quantity"
              :catalogId="catalog.id"
              @redeem="addCartItem"
              @showdetail="openProductDetail"
          />
        </div>
      </div>
    </div>
    <!-- Product Detail Modal -->
    <ProductDetailModal
        v-if="showModal"
        :product="selectedProduct"
        @close="closeProductModal"
    />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CatalogFilter from '~/components/CatalogFilter.vue'
import ProductCard from '~/components/ProductCard.vue'
import ProductDetailModal from '~/components/ProductDetailModal.vue'
import { catalogService } from '~/services/catalogService'
import { userService } from '~/services/userService'
import { cartItemService } from '~/services/cartItemService'
import { useAccountStore } from '~/stores/account'
import { useCartItemStore } from '~/stores/cartItemStore'
import { useNotifications } from '~/composables/useNotifications'

const router = useRouter()
const accountStore = useAccountStore()
const cartItemStore = useCartItemStore()
const { showNotification } = useNotifications()

// Local reactive state
const catalog = ref({ offers: [] })
const isMobile = ref(false)
const categories = ref([])
const selected = ref('')
const pointsFilter = ref({ start: 0, end: 0 })
const initialFilter = ref({ start: 0, end: 0 })
const showModal = ref(false)
const selectedProduct = ref(null)

// Lifecycle: on mount, set responsive flags and load data
onMounted(() => {
  isMobile.value = window.innerWidth <= 768
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768
  })
  loadProducts()
  loadPoints()
})

// Computed: filter offers based on category and price range
const offers = computed(() => {
  return catalog.value.offers?.filter(f => {
    const categoryMatch = selected.value ? f.product.type.name === selected.value : true
    const startMatch = pointsFilter.value.start ? f.product.price >= pointsFilter.value.start : true
    const endMatch = pointsFilter.value.end ? f.product.price <= pointsFilter.value.end : true
    return categoryMatch && startMatch && endMatch
  })
})

// Computed: total points from account store
const totalPoints = computed(() => accountStore.currentPoints)
const won = computed(() => accountStore.pointsWon)

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
}

// Cart operations using cartItemService and cartItemStore
async function addCartItem({ productId, catalogId, quantity, price }) {
  if (totalPoints.value < price) {
    showNotification({ message: '¡Hola! no te alcanza para canjear este item.', type: 'error' })
    return
  }
  if (
      won < 1
  ) {
    showNotification({ message: '¡Hola! Recuerda que debes acumular al menos 1 punto para empezar a canjear.', type: 'error' })
    return
  }
  const item = { product: productId, catalog: catalogId, quantity, ruc: accountStore.using }
  try {
    const response = await cartItemService.post(item)
    if (response) {
      cartItemStore.addItem(item).then(() => {
        accountStore.points[0].total -= price
        accountStore.updatePoints(accountStore.points)
        showNotification({ message: 'Producto añadido', type: 'success' })
      })
    }
  } catch (err) {
    console.error('Error adding cart item:', err)
    showNotification({ message: 'Error al agregar el producto al carrito.', type: 'error' })
  }
}

// Open the product detail modal
function openProductDetail(product) {
  selectedProduct.value = product
  showModal.value = true
}

// Close the product detail modal
function closeProductModal() {
  showModal.value = false
  selectedProduct.value = null
}
</script>


<style scoped>
/* No additional custom positioning needed as we're using sticky */
</style>
