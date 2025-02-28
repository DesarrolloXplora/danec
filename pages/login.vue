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
        <span class="text-4xl font-bold text-black">¡Bienvenido!</span>
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="mb-3">
            <input
                type="text"
                id="email"
                v-model="email"
                required
                placeholder="Usuario"
                class="mt-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring focus:border-red-400 text-center text-black"
            />
          </div>
          <div class="mb-4">
            <input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="Contraseña"
                class="mt-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring focus:border-red-400 text-center text-black"
            />
          </div>
          <button
              type="submit"
              class="w-full bg-main text-white py-2 rounded-3xl hover:bg-main transition duration-200"
          >
            Entrar
          </button>
          <span class="text-sm text-white flex items-center gap-1 cursor-pointer">
            Olvidé mi contraseña
          </span>
        </form>
      </div>
      <div class="self-center mt-4 flex flex-col items-center cursor-pointer" @click="goToDanec">
        <span class="text-sm text-white flex items-center gap-1 ">
          click aquí
          <span class="material-icons text-sm">keyboard_arrow_down</span>
        </span>
        <div class="mt-0">
          <img src="https://storage.googleapis.com/static-content-seed/danec/logo-home.png" alt="Logo" class="w-44" />
        </div>
      </div>
    </div>
    <Notification />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '~/stores/account'
import { useNotifications } from '~/composables/useNotifications.js'

definePageMeta({
  layout: 'login'
})


const router = useRouter()
const accountStore = useAccountStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const { showNotification } = useNotifications()
const submitForm = async () => {
  try {
    await accountStore.login({ username: email.value, password: password.value })
    router.push('/bienvenido')
  } catch (error) {
    showNotification({ message: error.message || 'Error en el login', type: 'error' })
  }
}

const goToDanec = () => {
  window.open("https://grupodanec.com.ec/", '_blank')
}
</script>
<style scoped>

</style>
