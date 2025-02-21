<template>
  <div class="flipbook-wrapper">
    <Flipbook class="flipbook" :pages="pages" :options="flipOptions" ref="flipbookRef" />
    <div class="action-bar flex items-center justify-center space-x-4 p-4">
      <!-- Left arrow -->
      <button
          @click="flipLeft"
          :class="{'opacity-50 cursor-not-allowed': !canFlipLeft}"
          class="p-2 text-2xl"
          aria-label="Flip Left"
      >
        <span class="material-icons">arrow_back</span>
      </button>

      <!-- Zoom in -->
      <button
          @click="zoomIn"
          :class="{'opacity-50 cursor-not-allowed': !canZoomIn}"
          class="p-2 text-2xl"
          aria-label="Zoom In"
      >
        <span class="material-icons">magnify_plus</span>
      </button>

      <!-- Page Indicator -->
      <span class="text-lg font-medium">
        Page {{ currentPage }} of {{ numPages }}
      </span>

      <!-- Zoom out -->
      <button
          @click="zoomOut"
          :class="{'opacity-50 cursor-not-allowed': !canZoomOut}"
          class="p-2 text-2xl"
          aria-label="Zoom Out"
      >
        <span class="material-icons">magnify_minus</span>
      </button>

      <!-- Right arrow -->
      <button
          @click="flipRight"
          :class="{'opacity-50 cursor-not-allowed': !canFlipRight}"
          class="p-2 text-2xl"
          aria-label="Flip Right"
      >
        <span class="material-icons">arrow_forward</span>
      </button>
    </div>

  <!-- Action Bar -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Flipbook from 'flipbook-vue'


// Array of image URLs for each PDF page
const pages = [
  'https://storage.googleapis.com/static-content-seed/danec/guia/1.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/2.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/3.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/4.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/5.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/6.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/7.webp',
  'https://storage.googleapis.com/static-content-seed/danec/guia/8.webp',
]

const flipOptions = {
  width: "auto",
  height: "auto",
  showCover: true,
  singlePage: true,
}
const flipbookRef = ref('flipbookRef')

const currentPage = ref(1)
const numPages = pages.length

const canFlipLeft = computed(() => currentPage.value > 1)
const canFlipRight = computed(() => currentPage.value < numPages)
const canZoomIn = ref(true)  // Adjust logic as needed
const canZoomOut = ref(true) // Adjust logic as needed

// Methods to simulate flipbook actions
function flipLeft() {
  if (canFlipLeft.value) {
    currentPage.value--
    console.log('Flipping left')
    // Optionally call a method on flipbookRef.value
  }
}

function flipRight() {
  if (canFlipRight.value) {
    currentPage.value++
    console.log('Flipping right')
  }
}

function zoomIn() {
  console.log('Zooming in')
}

function zoomOut() {
  console.log('Zooming out')
}
</script>

<style scoped>
.flipbook {
  width: 90vw;
  height: 85vh;
}.flipbook-wrapper {
   display: flex;
   justify-content: center;
 }

/* Add additional custom styles as needed, for example: */
.flipbook-wrapper .flipbook-page {
  /* This is a placeholder: target the correct class or element based on inspection */
  background: #fff;
  border: 1px solid #ddd;
}


.action-bar {
  position: absolute;
  width: 100%;
  height: 30px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: transparent;
}

.action-bar .btn {
  font-size: 30px;
  color: #999;
}

.has-mouse .action-bar .btn:hover {
  color: #ccc;
  filter: drop-shadow(1px 1px 5px #000);
  cursor: pointer;
  height: 100%;
}

.action-bar .btn:active {
  filter: none !important;
}

.action-bar .btn.disabled {
  color: #666;
  pointer-events: none;
}

.action-bar .page-num {
  font-size: 12px;
  margin-left: 10px;
}
</style>
