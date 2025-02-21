<template>
  <div class="w-full pb-0">
    <div class="flex flex-col min-h-screen">
      <div class="w-full md:w-10/12 mx-auto self-center">
        <div v-if="!route.query.print" class="mt-12 flex flex-wrap -mx-2">
          <!-- Year Select -->
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label class="block uppercase mb-1">Seleccionar Año</label>
            <div class="relative">
              <select
                  v-model="selectedYear"
                  @change="changeYear"
                  class="block w-full p-2 border border-gray-300 rounded uppercase appearance-none"
              >
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
              <!-- Down arrow icon -->
              <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </div>
          </div>
          <!-- Month Select -->
          <div class="w-full md:w-1/2 px-2 mb-4">
            <label class="block uppercase mb-1">Seleccionar mes</label>
            <div class="relative">
              <select
                  v-model="selected"
                  @change="refreshing++"
                  class="block w-full p-2 border border-gray-300 rounded uppercase appearance-none"
              >
                <option v-for="period in periods" :key="period" :value="period">
                  {{ period }}
                </option>
              </select>
              <!-- Down arrow icon -->
              <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- Content row: Dummy Resumen component (only if data is ready) -->
        <div
            v-if="ready && loaded"
            class="mt-6"
        >
          <div class="w-full">
            <PointsResumen :points="pdvs" :selected="selectedYear" :key="'res' + refreshing" />
            <PointsPilarUno />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const years = ref([2021, 2022, 2023])
const periods = ref(['Marzo', 'Abril', 'Mayo'])
const selectedYear = ref(years.value[0])
const selected = ref(periods.value[0])
const refreshing = ref(0)
const ready = ref(true)
const loaded = ref(true)
const pdvs = ref([{ id: 1, name: 'Dummy Point' }])
const pillars = ref({
  2025: {
    January: [{ id: 1, value: 'Dummy Data' }],
    February: [],
    March: []
  },
  2026: {
    January: [],
    February: [],
    March: []
  }
})

const route = useRoute()
function changeYear() {
  refreshing.value++
}

</script>

<style scoped>
</style>
