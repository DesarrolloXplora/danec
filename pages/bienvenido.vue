<template>
  <div class="min-h-screen flex justify-end items-center sm:p-6 lg:px-24 main-hola">
    <div class="flex flex-col items-end xl:w-1/3 lg:w-1/2 sm:w-auto">
      <!-- White login panel -->
      <div class="w-full p-12 rounded-3xl text-center">
        <p class="text-5xl uppercase text-bold py-2">¡Hola!</p>
        <p class="text-2xl uppercase py-2">Nombre Apellido</p>
        <p class="text-xl uppercase font-bold py-2">"Pastelería ABC"</p>
        <button type="button" @click="submitForm"
                class="w-full bg-main text-white py-2 rounded-3xl hover:bg-main transition duration-200 uppercase"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter();

const submitForm = () => {
  router.push('/')
};
</script>
<style>
.main-hola {
  background-size: cover;
  background-position: center -9rem;
  background-image: url("https://storage.googleapis.com/static-content-seed/danec/hola.png");
  background-repeat: no-repeat;
}
</style>
