<template>
  <div>
  <header class="shadow-sm bg-white after-red-bar">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="font-bold">
        <img class="main-logo" src="https://storage.googleapis.com/static-content-seed/danec/logo-red.png" alt="logo">
      </NuxtLink>

      <!-- Navigation Links -->
      <ul class="hidden md:flex gap-12 uppercase text-sm">
        <li>
          <NuxtLink to="/inicio">Inicio</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/como-funciona">¿CÓMO GANO?</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mis-puntos">Mis Puntos</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/catalogo">Catálogo</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/carrito">Carrito</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mis-canjes">Mis Canjes</NuxtLink>
        </li>
      </ul>

      <div ref="dropdownRef" class="relative main-dropdown hidden md:block">
        <button
            @click="toggleDropdown"
            class="focus:outline-none flex items-center bg-main px-2 text-white"
            :aria-expanded="isOpen.toString()"
        >
          <span class="material-icons text-2xl">account_circle</span>
          <span class="material-icons text-2xl">keyboard_arrow_down</span>
        </button>

        <transition name="fade">
          <div
              v-if="isOpen"
              class="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded z-20"
          >
            <NuxtLink
                to="/mi-cuenta"
                class="block px-4 py-2 hover:bg-gray-100"
                @click="closeDropdown"
            >
              Mi Cuenta
            </NuxtLink>
            <NuxtLink
                to="/"
                class="block px-4 py-2 hover:bg-gray-100"
                @click="logout"
            >
              Salir
            </NuxtLink>
          </div>
        </transition>
      </div>
      <!-- Mobile Hamburger Icon (shown on mobile only) -->
      <button class="md:hidden focus:outline-none" @click="toggleMobileMenu">
        <span class="material-icons text-3xl">menu</span>
      </button>
    </nav>

    <!-- Mobile Navigation Menu -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg">
        <ul class="flex flex-col gap-2 p-4">
          <li>
            <NuxtLink to="/">Inicio</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/como-funciona">¿CÓMO GANO?</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/mis-puntos">Mis Puntos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/catalogo">Catálogo</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/carrito">Carrito</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/mis-canjes">Mis Canjes</NuxtLink>
          </li>
          <!-- Optionally include profile links within mobile menu -->
          <li class="border-t pt-2">
            <NuxtLink to="/mi-cuenta" @click="toggleMobileMenu">Mi Cuenta</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pages/inicio" @click="toggleMobileMenu">Salir</NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
  <slot></slot>
  <div v-if="showFloatingButton" class="companion w-screen sticky pr-10 z-10">
    <img src="https://storage.googleapis.com/static-content-seed/danec/logo-home.png" @click="goToDanec"
         alt="Logo" class="w-44 absolute right-2 bottom-1 cursor-pointer drop-shadow-md" />
  </div>
  <Notification />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useNotifications } from '~/composables/useNotifications.js'
import { userService } from "~/services/userService.js";
import { useAccountStore } from "~/stores/account.js";
import { logout } from "~/services/sessionHelper.js";
const accountStore = useAccountStore()

const route = useRoute()
const showFloatingButton = computed(() => route.path !== '/como-funciona')

const isOpen = ref(false)
const dropdownRef = ref(null)
const isMobileMenuOpen = ref(false)


const { showNotification } = useNotifications()
async function loadPoints() {
  const pointsData = await userService.getMyPoints()
  accountStore.updatePoints(pointsData)
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const goToDanec = () => {
  window.open("https://grupodanec.com.ec/", '_blanc')
};

onMounted(() => {
  // Ensure the function runs only on the client
  onClickOutside(dropdownRef, () => {
    isOpen.value = false
  })
  loadPoints()
})
</script>

<style>
.main-logo {
  max-width: 110px;
}
.main-dropdown:before {
  content: "";
  position: absolute;
  top: -1.99rem;
  background: #f70030;
  height: 2rem;
  width: 100%;
}
.main-dropdown:after {
  content: "";
  position: absolute;
  bottom: -1.4rem;
  background: #f70030;
  height: 1.5rem;
  width: 100%;
}
.after-red-bar:after {
  content: "";
  position: absolute;
  height: 10px;
  top: 85px;
  width: 100%;
  z-index: 10;
  background-color: var(--primary-color);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.companion {
  bottom: 8%;
  z-index: 1;
}
</style>
