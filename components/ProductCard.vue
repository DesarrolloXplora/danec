<template>
  <div class="card text-center">
    <img :src="product.image" alt="product thumb" class="thumb">
    <p class="font-bold text-gray-500 m-4 truncate">{{ product.title }}</p>
    <NuxtLink :to="`/catalogo/${product.id}`">
      <p class="btn my-4">Ver más</p>
    </NuxtLink>
  </div>
</template>
<script setup>
const { product } = defineProps(['product'])
</script>
<style scoped>
.thumb {
  max-height: 120px;
  max-width: 80%;
  margin: 0 auto;
}
</style>
