<template>
  <div class="flipbook-wrapper">
    <!-- Flipbook component; pass in the pages and options -->
    <Flipbook :pages="pages" :options="flipOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Flipbook from 'flipbook-vue'

// Array of image URLs for each PDF page
const pages = [
  'https://storage.googleapis.com/static-content-seed/danec/hola.png',
  'https://storage.googleapis.com/static-content-seed/danec/hola.png',
  'https://storage.googleapis.com/static-content-seed/danec/hola.png',
]

// Options to configure the flipbook (adjust as desired)
const flipOptions = {
  width: 550,
  height: 733,
  showCover: true,
  // you can include additional options as documented by flipbook-vue
}
</script>

<style scoped>
.flipbook-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
