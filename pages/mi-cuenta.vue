<template>
  <div class="form-bg h-full">
    <div class="container mx-auto md:px-16 py-6 h-full">
      <div class="flex flex-col md:flex-row justify-center items-start">
        <!-- Left Column -->
        <div class="w-full md:w-1/3 p-4 pt-10">
          <div class="mx-auto">
            <div class="text-center font-bold text-4xl text-black">
              Apunta <br /> tus datos
            </div>
            <div class="text-center my-6">
              <div
                  @click="dialog = !dialog"
                  class="cursor-pointer mx-auto border border-secondary_color rounded-full w-48 h-48 overflow-hidden"
              >
                <img
                    :src="user.avatar || 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'"
                    alt="Avatar"
                    class="object-cover w-full h-full"
                />
              </div>
              <!-- Progress Bar -->
              <div
                  class="relative mt-8 mx-auto rounded-full"
                  style="width: 35%; height: 25px; background-color: #b0b3b8;"
              >
                <div
                    :style="{ width: Math.ceil(barSkill) + '%', backgroundColor: '#faa55c' }"
                    class="h-full rounded-full"
                ></div>
                <div class="absolute text-white inset-0 flex justify-center items-center  rounded-full">
                  <strong>{{ Math.ceil(barSkill) }}%</strong>
                </div>
              </div>
              <!-- Description & Change Password Link -->
              <p class="mt-6 mx-10 text-xs text-secondary_color">
                *Debes cumplir el <span class="font-bold">100%</span> para ver el contenido
              </p>
              <NuxtLink
                  to="/password"
                  class="bg-main mb-4 text-sm font-bold uppercase text-white inline-block py-1 px-2 mt-4 rounded-full"
              >
                Cambiar contraseña
              </NuxtLink>
            </div>
          </div>
        </div>
        <!-- Right Column -->
        <div class="w-full md:w-2/3 p-4 pt-10 text-secondary_color">
          <p class="text-left text-sm mb-4">
            <span class="text-primary_color">*</span> Campos Obligatorios
          </p>
          <!-- Form Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="r in fields" :key="r.index" class="py-1">
              <div v-if="r.type !== 'button'">
                <label class="block uppercase text-sm font-[400] mb-1">
                  {{ r.name }} *
                </label>
                <input
                    v-model="r.value"
                    :type="r.type"
                    :readonly="r.disabled"
                    class="w-full uppercase border-0 font-[700] border-b border-dotted border-black focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <!-- Checkboxes -->
          <div class="mt-4">
            <label class="flex items-center text-sm">
              <input type="checkbox" v-model="user.terms" required class="mr-2" />
              <span>
                Acepto
                <a
                    target="_blank"
                    href="https://storage.googleapis.com/static-content-seed/danec/terms.pdf"
                    class="underline ml-1"
                    title="Ver documento"
                >
                  TÉRMINOS Y CONDICIONES JUNTO CON EL TRATAMIENTO Y USO DE DATOS.
                </a>
              </span>
            </label>
          </div>
          <!-- Save Button -->
          <div class="mt-6 text-center">
            <button @click="saveAccount" class="bg-primary_color text-white px-6 py-2 rounded">
              {{ filled ? 'Actualizar' : 'Actualizar y continuar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Dialog for File Input -->
    <div v-if="dialog" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <!-- Modal Content -->
      <div class="bg-white rounded shadow-lg z-10 max-w-lg w-full p-6">
        <div>
          <label class="block mb-2 font-medium">Avatar</label>
          <input
              type="file"
              @change="onFileChange($event.target.files)"
              accept="image/png, image/jpeg, image/jpg, image/bmp"
              class="block w-full"
          />
        </div>
        <div class="mt-4 flex justify-end">
          <button @click="saveImage" class="bg-main text-white px-4 py-2 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state and sample data
const dialog = ref(false)
const user = ref({
  avatar: '',
  terms: false
})
const barSkill = ref(50)

const fields = ref([
  { index: 1, type: 'text', value: 'Pedro', name: 'Nombre', disabled: false },
  { index: 2, type: 'text', value: 'Gomez', name: 'Apellido', disabled: false },
  { index: 3, type: 'number', value: '5432123', name: 'Cédula', disabled: false },
  { index: 4, type: 'text', value: '12-12-93', name: 'Fecha de nacimiento', disabled: false },
  { index: 3, type: 'number', value: '5432123', name: 'Celular', disabled: false },
  { index: 4, type: 'text', value: '12-12-93', name: 'Fecha de vencimiento cédula', disabled: false },
  { index: 5, type: 'number', value: '32323344', name: 'RUC', disabled: false },
  { index: 6, type: 'text', value: 'Pastelería S.A', name: 'Razón Social', disabled: false },
  { index: 6, type: 'text', value: '123123', name: 'Código de Cliente', disabled: false },
  { index: 6, type: 'text', value: 'Cuenca', name: 'Ciudad', disabled: false },
  { index: 6, type: 'text', value: 'Cuenca', name: 'Barrio', disabled: false },
  { index: 6, type: 'text', value: 'Cuenca', name: 'Dirección', disabled: false },
  { index: 6, type: 'text', value: 'Panaderías', name: 'Categoría', disabled: true }
  // Add additional fields as necessary
])

// A computed property to check if fields are filled
const filled = computed(() => fields.value.every(field => field.value && !field.disabled))

// Methods for handling file input and saving data
function onFileChange(file: File | File[]) {
  if (Array.isArray(file)) {
    file = file[0]
  }
  // For preview purposes, update the user's avatar with an object URL
  user.value.avatar = URL.createObjectURL(file)
}

function saveAccount() {
  // Implement your save logic here (e.g. API calls, form validation, etc.)
  console.log('Account data:', { fields: fields.value, user: user.value })
}

function saveImage() {
  // Implement your image save logic here
  console.log('Image saved')
  dialog.value = false
}
</script>
<style>
.form-bg {
  background: url("https://storage.googleapis.com/static-content-seed/danec/formulario.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
