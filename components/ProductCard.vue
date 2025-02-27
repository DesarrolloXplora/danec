<template>
  <div class="border rounded shadow-sm w-full relative flex flex-col justify-end">
    <div v-if="product.quantity === 0" class="absolute top-0 left-0 z-10">
      <div class="bg-main text-white font-[700] text-center uppercase -translate-x-2 -rotate-[30deg] origin-right" style="width: 220px;">
        Agotado
      </div>
    </div>
    <div class="p-2">
      <img
          @click="showDetail"
          :src="product.image"
          alt="Product Image"
          class="object-contain h-48 w-full"
      />
    </div>
    <div class="bg-gray-200 p-4 text-center relative">
      <h2 class="text-primary font-bold uppercase mb-2 min-h-[3lh]">
        {{ product.name }}<br />
        <span class="color-main">{{ product.price }} Puntos</span>
      </h2>
      <button
          @click="redeem"
          class="w-full bg-black text-white py-2 rounded flex items-center justify-center uppercase"
      >
        <span class="material-icons mr-2">shopping_cart</span>
        canjear
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  catalogId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['redeem', 'showdetail'])

function redeem() {
  emit('redeem', {
    productId: props.product.id,
    catalogId: props.catalogId,
    quantity: 1,
    price: props.product.price
  })
}

function showDetail() {
  emit('showdetail', props.product)
}
</script>

<style scoped>
/* Add or adjust styles as needed */
</style>
