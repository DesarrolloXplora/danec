<template>
<div>
  <Head>
    <Title>Danec | Catálogo</Title>
  </Head>
  <div class="grid grid-cols-4 gap-5">
    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product"/>
    </div>
  </div>
</div>
</template>
<script setup>
const { data:products } = await useFetch('https://fakestoreapi.com/products')
</script>
<style scoped>

</style>
