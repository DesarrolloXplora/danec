<template>
  <div class="flipbook-wrapper">
    <Flipbook
        class="flipbook"
        :pages="pages"
        :options="flipOptions"
        v-slot="{ flipLeft, flipRight }"
        @page-changed="onPageChanged">
      <div class="flipbook-wrapper">
        <!-- Render your pages or let the flipbook handle them -->
        <!-- Place your external controls inside the slot -->
        <div class="action-bar flex items-center justify-center space-x-4 p-4">
          <button @click="flipLeft" class="p-2 text-2xl" aria-label="Flip Left">
            <span class="material-icons">arrow_back</span>
          </button>

          <span class="text-lg font-medium">
          Página {{ currentPage }} de {{ numPages }}
        </span>

          <button @click="flipRight" class="p-2 text-2xl" aria-label="Flip Right">
            <span class="material-icons">arrow_forward</span>
          </button>
        </div>
      </div>
    </Flipbook>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Flipbook from 'flipbook-vue'

// Array of image URLs for each page
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
// Update currentPage only when the flipbook emits an event
function onPageChanged(newPage) {
  currentPage.value = newPage
}


const currentPage = ref(1)
const numPages = pages.length
</script>

<style scoped>
.flipbook {
  padding-top: 3rem;
  width: 90vw;
  height: 85vh;
}
.flipbook-wrapper {
  display: flex;
  justify-content: center;
}

/* Additional custom styles */
.flipbook-wrapper .flipbook-page {
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
  z-index: 10000;
  top: 100px;
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
