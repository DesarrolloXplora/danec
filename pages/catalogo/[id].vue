<template>
  <div>
    <Head>
      <Title>Danec | {{ product.title }}</Title>
    </Head>
    <ProductDetails :product="product"/>
  </div>
</template>
<script setup>
const { id } = useRoute().params
const uri = 'https://fakestoreapi.com/products/' + id;
const { data:product } = await useFetch(uri, { key: id })
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: "Producto no encontrado", fatal: true })
}
</script>
<style scoped>

</style>
