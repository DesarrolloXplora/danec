<template>
  <div class="">
    <!-- User Points Card -->
    <div class="bg-black text-white rounded p-4 text-center">
      <div class="uppercase font-bold text-lg">Mis Puntos:</div>
      <div class="text-4xl font-bold">{{ totalPoints }}</div>
    </div>
    <!-- Filters Card -->
    <div class="bg-stone-200 text-yellow-600 rounded p-4">
      <div class="text-center font-[700] uppercase pt-2 text-lg">Filtros</div>
      <!-- Dual Range Slider -->
      <div class="mt-2">
        <p class="text-center font-[700] text-lg">Puntos: {{ range[0] }} - {{ range[1] }}</p>
        <div class="relative mt-6 h-6">
          <!-- Lower bound input -->
          <input
              type="range"
              :min="minValue"
              :max="maxValue"
              step="5"
              v-model.number="range[0]"
              @input="onRangeInput('min')"
              class="absolute top-0 w-full appearance-none h-1 bg-transparent z-20 pointer-events-auto"
          />
          <!-- Upper bound input -->
          <input
              type="range"
              :min="minValue"
              :max="maxValue"
              step="5"
              v-model.number="range[1]"
              @input="onRangeInput('max')"
              class="absolute top-0 w-full appearance-none h-1 bg-transparent z-10 pointer-events-auto"
          />
          <!-- Track background (for visual effect) -->
          <div class="absolute top-0 w-full h-1 bg-yellow-600 rounded"></div>
          <!-- Selected range highlight -->
          <div
              class="absolute top-0 h-1 bg-main rounded"
              :style="{
              left: ((range[0] - minValue) / (maxValue - minValue)) * 100 + '%',
              width: ((range[1] - range[0]) / (maxValue - minValue)) * 100 + '%'
            }"
          ></div>
        </div>
      </div>
      <!-- Category Filter -->
      <div class="mt-6">
        <div class="flex justify-between items-center">
          <span class="uppercase font-[700]">Categorías</span>
          <span class="material-icons text-5xl">
            keyboard_arrow_down
          </span>
        </div>
        <ul class="mt-2 space-y-2">
          <li
              v-for="(category, i) in categories"
              :key="i"
              @click="selectCategory(i)"
              :class="{'bg-main text-white': selectedIndex === i}"
              class="cursor-pointer p-2 uppercase text-sm font-[700] rounded border-category"
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

const totalPoints = computed(() => accountStore.currentPoints)

// Set minimum and maximum values from the pointsFilter or defaults.
const minValue = ref(1)
const maxValue = ref(props.pointsFilter.end || 100)

// We'll use one reactive array for the dual slider range: [min, max]
const range = ref([props.pointsFilter.start || 1, props.pointsFilter.end || maxValue.value])
const selectedIndex = ref(0)

onMounted(() => {
  // Initialize range if props provided
  range.value = [props.pointsFilter.start || 1, props.pointsFilter.end || maxValue.value]
})

function onRangeInput(type) {
  if (type === 'min' && range.value[0] > range.value[1]) {
    // Ensure lower value doesn't exceed the upper value.
    range.value[0] = range.value[1]
  }
  if (type === 'max' && range.value[1] < range.value[0]) {
    // Ensure upper value is not less than the lower value.
    range.value[1] = range.value[0]
  }
  emit('points', { start: range.value[0], end: range.value[1] })
}

function selectCategory(index) {
  selectedIndex.value = index
  emit('filter', index)
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  background: transparent;
}

/* Styling for slider track and thumb */
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  background: transparent;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  background: white;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -7px;
}
input[type="range"]::-moz-range-track {
  height: 6px;
  background: transparent;
}
input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  background: white;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
}
.border-category {
  border-bottom: 0.5px black solid;
}
</style>
