<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="close">
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full relative">
      <button class="absolute top-2 right-2 text-gray-600" @click="close">
        <span class="material-icons">close</span>
      </button>
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2">
          <img :src="product.image" alt="Product Image" class="object-contain w-full h-full" />
        </div>
        <div class="md:w-1/2 md:pl-4">
          <h2 class="text-2xl font-bold uppercase mb-2">{{ product.name }}</h2>
          <p class="mb-2 font-bold">{{ product.price }} Puntos</p>
          <p class="mb-4">{{ product.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
/* Customize modal styles as needed */
</style>
