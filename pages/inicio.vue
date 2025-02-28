<template>
  <div>
    <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :space-between="20"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 3000 }"
        pagination
        navigation
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <img :src="slide.image" :alt="slide.title" class="w-full h-auto object-cover rounded-lg" />
      </swiper-slide>
    </swiper>
    <Miniextract/>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Miniextract from "~/components/Miniextract.vue";

const slides = [
  { image: 'https://storage.googleapis.com/static-content-seed/danec/banners/banner1.png', title: 'First Slide' },
];
</script>

<style scoped>
/* Optional: Customize navigation buttons */
.swiper-button-next,
.swiper-button-prev {
  color: #fff;
}
</style>
