<template>
  <div class="w-full py-0 min-h-[90vh]">
    <div class="flex flex-col h-full">
      <div class="w-full md:w-10/12 mx-auto self-center">
        <div class="px-4">
          <div class="pt-5"></div>
          <div class="bg-white">
            <div class="bg-main font-bold flex justify-center text-lg text-white py-4 rounded-tl-3xl rounded-tr-3xl">
              ESTADO DE MI CANJE
            </div>
            <div v-if="!loading" class="overflow-auto">
              <table class="w-full">
                <thead class="text-left text-xl font-bold border-b border-black text-primary">
                <tr>
                  <th class="border-b border-black py-2">Producto</th>
                  <th class="border-b border-black py-2">Código</th>
                  <th class="border-b border-black py-2">Cantidad</th>
                  <th class="border-b border-black py-2">Estado</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="item in exchanges"
                    :key="item.id"
                    class="text-left text-secondary"
                >
                  <td class="font-medium py-2">{{ item.product.toUpperCase() }}</td>
                  <td class="py-2">{{ item.code }}</td>
                  <td class="py-2">{{ item.quantity }}</td>
                  <td class="py-2">{{ item.tracking }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <!-- Spacer -->
            <div class="pt-5"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const exchanges = ref([])

function loadExchanges() {
  // Dummy data for demonstration purposes
  exchanges.value = [
    { id: 1, product: 'Producto1', code: 'ABC123', quantity: 2, tracking: 'En proceso' },
    { id: 2, product: 'Producto2', code: 'XYZ789', quantity: 1, tracking: 'Completado' },
    { id: 3, product: 'Producto3', code: 'LMN456', quantity: 5, tracking: 'Pendiente' }
  ]
  loading.value = false
}

onMounted(() => {
  loadExchanges()
})
</script>

<style scoped>
</style>
