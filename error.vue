<template>
  <div class="mt-7 mx-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Oops.</p>
    <p class="mt-7">{{ error.message }}</p>
    <button class="btn" @click="handleClickError">Volver</button>
  </div>
</template>
<script setup>
defineProps(['error'])

const handleClickError = () => clearError({ redirect: "/" });
</script>
<style scoped>

</style>
