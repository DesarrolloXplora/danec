<template>
  <div class="bg-white rounded p-4 shadow-none">
    <!-- Title -->
    <div class="font-bold text-center text-ml mb-4">
      Actualización de mis puntos
    </div>
    <!-- Table -->
    <table class="miniextract w-full">
      <thead class="primary_color text-center headTable">
      <tr>
        <th class="borderTableLeft p-2">Punto de Venta</th>
        <th class="p-2">
          <img
              src="https://storage.googleapis.com/static-content-seed/celima/icons/meses.png"
              alt="Meses"
              class="indicatorImg inline-block mr-1"
          />
          Puntos cargados última vez
        </th>
        <th class="p-2">
          <img
              src="https://storage.googleapis.com/static-content-seed/celima/icons/acumulados.png"
              alt="Acumulados"
              class="indicatorImg inline-block mr-1"
          />
          Puntos acumulados
        </th>
        <th class="p-2">
          <img
              src="https://storage.googleapis.com/static-content-seed/celima/icons/canjeados.png"
              alt="Canjeados"
              class="indicatorImg inline-block mr-1"
          />
          Puntos cargados
        </th>
        <!--
        <th class="borderTableRight p-2">
          <img
            src="https://storage.googleapis.com/static-content-seed/celima/icons/disponibles.png"
            alt="Disponibles"
            class="indicatorImg inline-block mr-1"
          />
          Puntos disponibles
        </th>
        -->
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in points" :key="item.name" class="text-center secondary_color">
        <td class="p-2">{{ item.pdv }}</td>
        <td class="p-2">{{ item.lastMonth }}</td>
        <td class="p-2">{{ item.won }}</td>
        <td class="p-2">{{ item.spent || 0 }}</td>
        <!-- <td class="p-2">{{ item.total }}</td> -->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Sample data for demonstration—replace with your actual data source or props.
const points = ref([
  { name: '1', pdv: 'Tienda A', lastMonth: 50, won: 200, spent: 100 },
  { name: '2', pdv: 'Tienda B', lastMonth: 30, won: 150, spent: 50 }
])
</script>

<style scoped>
/* If you have custom classes (e.g., primary_color, secondary_color, borderTableLeft, etc.),
   ensure they are defined in your Tailwind configuration or add additional CSS here. */
</style>
