<template>
  <div class="space-y-6">
    <!-- User Points Card -->
    <div class="bg-black text-white rounded p-4 text-center">
      <div class="uppercase font-bold text-lg">Mis Puntos:</div>
      <div class="text-2xl">{{ totalPoints }}</div>
    </div>
    <!-- Filters Card -->
    <div class="bg-gray-800 text-white rounded p-4">
      <div class="text-center font-medium uppercase pt-2">Filtros</div>
      <!-- Price Range Filter -->
      <div class="mt-4">
        <p class="text-center">Puntos</p>
        <p class="text-center">{{ start }} - {{ end }}</p>
        <div class="relative mt-2">
          <!-- Minimum Points Slider -->
          <input
              v-model="start"
              type="range"
              min="1"
              :max="pointsFilter.end"
              step="5"
              @input="filterEffect"
              class="w-full appearance-none h-1 bg-main rounded"
          />
          <!-- Maximum Points Slider -->
          <input
              v-model="end"
              type="range"
              min="10"
              :max="pointsFilter.end"
              step="5"
              @input="filterEffect"
              class="w-full appearance-none h-1 bg-main rounded mt-2"
          />
        </div>
      </div>
      <!-- Category Filter -->
      <div class="mt-6">
        <div class="flex justify-between items-center">
          <span class="uppercase font-medium">Categorías</span>
          <!-- Chevron Down Icon -->
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.586l3.71-3.354a.75.75 0 111.02 1.096l-4 3.5a.75.75 0 01-1.02 0l-4-3.5a.75.75 0 01.02-1.096z" clip-rule="evenodd" />
          </svg>
        </div>
        <ul class="mt-2 space-y-2">
          <li
              v-for="(category, i) in categories"
              :key="i"
              @click="selectCategory(i)"
              :class="{'bg-main': selectedIndex === i}"
              class="cursor-pointer p-2 uppercase text-sm rounded"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAccountStore } from '~/stores/account'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  pointsFilter: {
    type: Object,
    default: () => ({ start: 0, end: 0 })
  }
})
const emit = defineEmits(['filter', 'points'])

const accountStore = useAccountStore()
const totalPoints = computed(() => {
  return accountStore.using && accountStore.points && accountStore.points[accountStore.using]
      ? accountStore.points[accountStore.using].total
      : 0
})

const start = ref(0)
const end = ref(0)
const selectedIndex = ref(0)

onMounted(() => {
  end.value = props.pointsFilter.end
})

function filterEffect() {
  emit('points', { start: start.value, end: end.value })
}

function selectCategory(index) {
  selectedIndex.value = index
  emit('filter', index)
}
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: white;
  border: 2px solid black;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: white;
  border: 2px solid black;
  cursor: pointer;
}
</style>
