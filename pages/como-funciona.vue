<template>
  <div class="flipbook-wrapper">
    <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :space-between="20"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 30000 }"
        pagination
        navigation
        class="h-full"
    >
      <swiper-slide v-for="(slide, index) in pages" :key="index" class="h-[80vh]">
        <img :src="slide" alt="como funciona" class="w-auto h-full object-contain rounded-lg m-auto" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";

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

</script>

<style scoped>
.flipbook-wrapper {
  display: flex;
  justify-content: center;
  background: #1c1818;
  height: 90vh;
  z-index: 10;
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
