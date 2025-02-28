<template>
  <div class="h-full lg:h-96 flex justify-end items-center sm:p-6 lg:px-24">
    <div class="main-hola"></div>
    <div class="flex flex-col items-end xl:w-2/5 lg:w-1/2 sm:w-auto">
      <!-- White login panel -->
      <div class="w-full p-12 rounded-3xl text-center">
        <p class="text-7xl uppercase font-[700] py-8 mt-16">¡Hola!</p>
        <p class="text-4xl uppercase pt-5 pb-2">{{ name_canonical }}</p>
        <p class="text-xl uppercase font-bold py-2">"{{ company_name }}"</p>
        <button type="button" @click="submitForm"
                class="w-min text-xl font-[700] bg-main text-white py-2 px-6 mt-8 rounded-3xl hover:bg-main transition duration-200 uppercase"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAccountStore } from '~/stores/account'
import { storeToRefs } from 'pinia'

const router = useRouter()
const accountStore = useAccountStore()

// Extract user as a reactive property
const { user } = storeToRefs(accountStore)
// Create a computed property for name_canonical
const name_canonical = computed(() => user.value?.name_canonical || '')
const company_name = computed(() => user.value?.company_name || '')

const submitForm = () => {
  router.push('/mi-cuenta')
}
</script>
<style>
.main-hola {
  position: absolute;
  z-index: -1;
  top: -5rem;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-image: url("https://storage.googleapis.com/static-content-seed/danec/hola.png");
  background-repeat: no-repeat;
}
</style>
