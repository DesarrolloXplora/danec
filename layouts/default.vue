<template>
  <div>
  <header class="shadow-sm bg-white">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="font-bold">
        <img class="main-logo" src="https://storage.googleapis.com/static-content-seed/danec/logo-red.png" alt="logo">
      </NuxtLink>

      <!-- Navigation Links -->
      <ul class="flex gap-4">
        <li>
          <NuxtLink to="/bienvenido">Inicio</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/como-funciona">Cómo funciona</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mis-puntos">Mis Puntos</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/catalogo">Catálogo</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mis-canjes">Mis Canjes</NuxtLink>
        </li>
      </ul>

      <div ref="dropdownRef" class="relative main-dropdown">
        <button
            @click="toggleDropdown"
            class="focus:outline-none flex items-center bg-main p-2 text-white"
            :aria-expanded="isOpen.toString()"
        >
          <span class="material-icons text-2xl">account_circle</span>
          <span class="material-icons text-2xl">keyboard_arrow_down</span>
        </button>

        <transition name="fade">
          <div
              v-if="isOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded"
          >
            <NuxtLink
                to="/mi-cuenta"
                class="block px-4 py-2 hover:bg-gray-100"
                @click="closeDropdown"
            >
              Mi Cuenta
            </NuxtLink>
            <NuxtLink
                to="/login"
                class="block px-4 py-2 hover:bg-gray-100"
                @click="closeDropdown"
            >
              Salir
            </NuxtLink>
          </div>
        </transition>
      </div>
    </nav>
  </header>
  <slot></slot>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  console.log(isOpen.value)
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

onMounted(() => {
  // Ensure the function runs only on the client
  onClickOutside(dropdownRef, () => {
    isOpen.value = false
  })
})
</script>

<style>
.main-logo {
  max-width: 110px;
}
.main-dropdown:before {
  content: "";
  position: absolute;
  top: -2rem;
  background: #f70030;
  height: 2rem;
  width: 100%;
}
.main-dropdown:after {
  content: "";
  position: absolute;
  bottom: -1.5rem;
  background: #f70030;
  height: 1.5rem;
  width: 100%;
}
/* Optional fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
