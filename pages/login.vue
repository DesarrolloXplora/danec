<template>
  <div class="min-h-screen flex justify-end items-center px-8">
    <div class="flex flex-col items-end lg:w-1/3 sm:w-auto">
      <!-- Logo above the white panel -->
      <div class="mb-6 w-full flex justify-center">
        <img src="https://storage.googleapis.com/static-content-seed/danec/logo-white.png" alt="Logo"
             class="w-64"/>
      </div>
      <!-- White login panel -->
      <div class="w-full bg-white p-7 rounded-3xl shadow-lg text-center">
        <span class="text-4xl font-bold">¡Bienvenido!</span>
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="mb-3">
            <input
                type="text"
                id="email"
                v-model="email"
                required
                placeholder="Usuario"
                class="mt-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring focus:border-red-400 placeholder:text-center"

            />
          </div>
          <div class="mb-4">
            <input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="Contraseña"
                class="mt-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring focus:border-red-400 placeholder:text-center"
            />
          </div>
          <button type="submit"
                  class="w-full bg-main text-white py-2 rounded-3xl hover:bg-main transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
      <div class="self-center mt-4 flex flex-col items-center" @click="goToDanec">
        <span class="text-sm text-white flex items-center gap-1 cursor-pointer">
          click aquí
          <span class="material-icons text-sm">keyboard_arrow_down</span>
        </span>
        <div class="mt-0">
          <img src="https://storage.googleapis.com/static-content-seed/danec/logo-home.png" alt="Logo" class="w-44" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'login'
})

import { ref } from 'vue';
const router = useRouter()

const email = ref('');
const password = ref('');

const submitForm = () => {
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  router.push('/bienvenido')
};
const goToDanec = () => {
  window.open("https://grupodanec.com.ec/", '_blanc')
};
</script>
<style scoped>

</style>
