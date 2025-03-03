<template>
  <div class="container mx-auto pt-4 min-h-[90vh] bg-white">
    <!-- Cart Card -->
    <div class="text-black rounded shadow p-4">
      <div class="bg-main text-center uppercase font-bold p-5 text-lg text-slate-50">
        Carrito
      </div>
      <!-- Top Bar: PDV Selector & Total Points -->
      <div class="mt-4 flex flex-col md:flex-row justify-center items-center">
        <div class="w-full md:w-1/2 p-2 text-center self-end">
          <strong>PUNTOS: {{ totalPoints }}</strong>
        </div>
      </div>
      <!-- Cart Items List -->
      <div class="mt-4">
        <div v-if="cartItems.length">
          <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex flex-col md:flex-row items-center border-b py-4"
          >
            <div class="w-full md:w-1/5">
              <img
                  :src="item.product.image"
                  alt="Product Image"
                  class="mx-auto max-h-32 object-contain"
              />
            </div>
            <div class="w-full md:w-4/5">
              <table class="w-full">
                <thead>
                <tr class="text-center border-b">
                  <th class="hidden md:table-cell text-left">PRODUCTO</th>
                  <th>PUNTOS</th>
                  <th>CANTIDAD</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center">
                  <td class="hidden md:table-cell text-left">
                    {{ item.product.name.toUpperCase() }}
                  </td>
                  <td>{{ item.total }}</td>
                  <td>
                    <button
                        :disabled="item.quantity <= 0"
                        @click="order(item, false)"
                        class="mx-2 bg-main text-white font-bold rounded-full p-2"
                    >
                      <span class="material-icons">remove</span>
                    </button>
                    {{ item.quantity }}
                    <button
                        @click="order(item, true)"
                        class="mx-2 bg-main  text-white font-bold rounded-full p-2"
                    >
                      <span class="material-icons">add</span>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Continue Button -->
          <div class="mt-4 text-center">
            <button
                v-if="!dialog"
                @click="dialog = true"
                class="bg-main text-white font-bold uppercase px-4 py-2 rounded"
            >
              Continuar
            </button>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p>No tiene artículos en el carrito</p>
          <button
              @click="goBack"
              class="mt-4 bg-main font-bold text-white px-4 py-2 rounded-2xl"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
    <!-- Exchange Modal -->
    <Exchange v-if="dialog" @exchanged="afterExchange" @close="dialog = false" class="z-30"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { useCartItemStore } from '~/stores/cartItemStore'
import { userService } from '~/services/userService'
import { cartItemService } from "~/services/cartItemService.js";

// Initialize stores and router
const router = useRouter()
const accountStore = useAccountStore()
const cartItemStore = useCartItemStore()

const dialog = ref(false)
const buying = ref(null)

const totalPoints = computed(() => accountStore.currentPoints)

const cartItems = computed(() => {
  return cartItemStore.cart
})

function goBack() {
  router.back()
}

// Handler for PDV selection change
function selectPdv(selectedValue) {
  accountStore.updateUsing(selectedValue)
  buying.value = selectedValue
}

async function order(item, add) {
  if (add && totalPoints.value < item.product.price) {
    alert(
        'No tienes puntos suficientes para redimir este artículo adicional.'
    )
    return
  }
  // Update local item values
  if (add) {
    item.quantity++
    item.total += item.product.price
  } else {
    if (item.quantity > 0) {
      item.quantity--
      item.total -= item.product.price
      await cartItemService.remove(item.id)
    }
  }
  try {
    await cartItemStore.increaseItem({
      product: item.product.id,
      quantity: item.quantity,
      catalog: item.catalog.id,
    })
    // Adjust the user's points accordingly
    accountStore.points[0].total -= add
        ? item.product.price
        : -item.product.price
    accountStore.updatePoints(accountStore.points)
  } catch (error) {
    console.error('Error updating cart item:', error)
  }
}

// After exchange is confirmed in the modal
function afterExchange(answer) {
  dialog.value = false
  cartItemStore.clearCart()
  alert('Canje exitoso código: ' + answer[0].code)
  router.push({ name: 'exchanges' })
}

// On mount, load points if not available and set PDV selection
onMounted(async () => {
  await loadPoints()
  if (!buying.value) {
    buying.value = accountStore.using
  }
  await cartItemStore.fetchCartItems()
})

// Load points from userService and update the account store
async function loadPoints() {
  const pointsData = await userService.getMyPoints()
  accountStore.updatePoints(pointsData)
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
