<template>
  <div class="bg-white shadow-none">
    <!-- Card Title -->
    <div class="font-bold flex justify-center text-lg uppercase py-4">
      Resumen Mes a Mes
    </div>
    <!-- Table Container -->
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto">
        <thead class="text-center">
        <!-- First Header Row -->
        <tr class="bg-dark text-white">
          <th class="border-l rounded-tl-3xl px-4 py-2"></th>
          <th v-for="period in periods" :key="period" class="px-4 py-2">
            {{ period }}
          </th>
          <th class="border-r px-4 py-2 rounded-tr-3xl"></th>
        </tr>
        <!-- Second Header Row -->
        <tr class="bg-main border-t-4 border-t-slate-100 text-white">
          <th class="px-4 py-2">Punto de Venta</th>
          <th v-for="period in periods" :key="period" class="px-4 py-2">
            Puntos
          </th>
          <th class="px-4 py-2">Total Acumulado</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item, ind) in showing"
            :key="ind"
            class="text-center text-black border-t"
        >
          <td class="border px-4 py-2 font-[600] uppercase">{{ item[0].pdv }}</td>
          <td
              v-for="(period, key) in periods"
              :key="key"
              class="border px-4 py-2"
          >
            {{ getMonth(item, period) }}
          </td>
          <td class="border px-4 py-2">
            {{ calculateTotal(item) || 0 }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dummy data for the header periods
const periods = ref(["Marzo", "Abril", "Mayo"])

const showing = ref([
  [ { pdv: "Participante 1", Jan: 10, Feb: 20, Mar: 30 } ]
])

function getMonth(item, period) {
  return item[0][period] || 0;
}

function calculateTotal(item) {
  return periods.value.reduce((sum, p) => sum + (item[0][p] || 0), 0);
}
</script>

<style scoped>
</style>
