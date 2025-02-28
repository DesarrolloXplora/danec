<template>
  <div class="form-bg h-full bg-white">
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
                <div class="absolute text-white inset-0 flex justify-center items-center rounded-full">
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
            <div class="py-1" v-if="user.terms">
              <label class="block uppercase text-sm font-[400] mb-1">
                Categoría *
              </label>
              <select
                  v-model="categoria"
                  class="w-full uppercase border-0 font-[700] border-b border-dotted border-black focus:border-gray-500 focus:outline-none"
              >
                <option disabled value="">Seleccione una opción</option>
                <option value="option1">Panaderías</option>
                <option value="option2">Horeca</option>
              </select>
            </div>
            <div class="py-1" v-if="user.terms">
              <label class="block uppercase text-sm font-[400] mb-1">
                Perfil *
              </label>
              <select
                  v-model="profile"
                  class="w-full uppercase border-0 font-[700] border-b border-dotted border-black focus:border-gray-500 focus:outline-none"
              >
                <option disabled value="">Seleccione una opción</option>
                <option value="option1">Panificador</option>
                <option value="option2">Pastelero</option>
                <option value="option3">Cocinero</option>
                <option value="option4">Chef</option>
              </select>
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
            <button @click="saveAccount" class="bg-main text-white px-6 py-2 rounded">
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

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAccountStore } from '~/stores/account'
import { userService } from '~/services/userService'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountStore = useAccountStore()
// Reactive state and sample data
const dialog = ref(false)
const participant = ref(true)
const categoria = ref('')
const profile = ref('')

const { user } = storeToRefs(accountStore)

const fields = ref([
  { index: 1, type: 'text', value: '', name: 'Nombre', id: 'name', disabled: false },
  { index: 2, type: 'text', value: '', name: 'Apellido', id: 'name_canonical', disabled: false },
  { index: 3, type: 'number', value: '', name: 'Cédula', id: 'id_number', disabled: false },
  { index: 4, type: 'text', value: '', name: 'Fecha de nacimiento', id: 'birth', disabled: false },
  { index: 3, type: 'number', value: '', name: 'Celular', id: 'telephone', disabled: false },
  { index: 4, type: 'text', value: '', name: 'Fecha de vencimiento cédula', id: 'emisionDni', disabled: false },
  { index: 5, type: 'number', value: '', name: 'RUC', id: 'username', disabled: false },
  { index: 6, type: 'text', value: '', name: 'Razón Social', id: 'company_name', disabled: false },
  { index: 6, type: 'text', value: '', name: 'Código de Cliente', id: 'code', disabled: false },
  { index: 6, type: 'text', value: '', name: 'Ciudad', id: 'city', disabled: false },
  { index: 6, type: 'text', value: '', name: 'Barrio', id: 'province', disabled: false },
  { index: 6, type: 'text', value: '', name: 'Dirección', id: 'address', disabled: false },
 // { index: 6, type: 'text', value: '', name: 'Perfil', id: 'category', disabled: true },
  // { index: 6, type: 'text', value: '', name: 'Categoría', id: 'position_name', disabled: true }
  // Add additional fields as necessary
])

onMounted(() => {
  loadAccount()
})

// A computed property to check if fields are filled
const filled = computed(() => fields.value.every(field => field.value && !field.disabled))

const barSkill = computed(() => ((fields.value.filter(f => f.model !== undefined).length) / (fields.value.length) * 100))
function onFileChange(files) {
  let file = Array.isArray(files) ? files[0] : files
  if (file) {
    // For immediate preview update:
    accountStore.user.avatar = URL.createObjectURL(file)
    // Optionally, store the file in a local ref to be used in saveImage().
    selectedFile.value = file
  }
}

const selectedFile = ref(null)

function saveAccount() {

  let userBody = bodyQuery()
  if (userBody.error === undefined) {
    userService.update(userBody).then(response => {
      accountStore.setUser(response)
      router.push('/inicio')
    }).catch({
      // console.log(error)
    })
  } else {
    alert('Complete todos los campos')
  }
}
function bodyQuery (validate = true) {
  let body = {
    id: user.value.id,
    extra_info: {}
  }
  fields.value.find(f => {
    if (validate && f.value === undefined) {
      f.error = true
      body.error = true
    }
    if (user.hasOwnProperty(f.id)) {
      body[f.id] = f.value
    }
  })
  body.habeas_data = user.value.terms
  body.terms = user.value.terms
  body.extra_info.profile = profile
  body.extra_info.categoria = categoria
  return body
}

async function saveImage() {
  if (!selectedFile.value) {
    console.error('No file selected')
    return
  }
  try {
    await accountStore.updateUserPicture(selectedFile.value)
    console.log('User picture updated:', accountStore.user.avatar)
  } catch (error) {
    console.error('Error updating user picture:', error)
  }
}
function loadAccount() {
  let index = fields.value.length
  if (user.value.extra_info === null) {
    user.value.extra_info = {}
  }
  while (index--) {
    if (!participant.value) {
      if (fields.value[index].id === 'name' || fields.value[index].id === 'id_number') {
        fields.value.splice(index, 1)
      }
    }
    if (fields.value[index] !== undefined) {
      if (user.value.hasOwnProperty(fields.value[index].id)) { // search in user properties
        fields.value[index].value = user.value[fields.value[index].id]
      } else if (
          fields.value[index].id === 'name' ||
          fields.value[index].id === 'company_id'
      ) {
        const id = fields.value[index].id !== 'company_id' ? fields.value[index].id : 'id_number'
        fields.value[index].value = user.value.company ? user.value.company[id] : ''
        fields.value[index].disabled = true
      } else if (
          fields.value[index].id === 'position_name'
      ) {
        fields.value[index].value = user.value.position ? user.value.position[name] : ''
        fields.value[index].disabled = true
      } else {
        fields.value[index].value = user.value.extra_info
            ? user.value.extra_info[fields.value[index].id]
            : ''
      }
    }
  }
}
</script>
<style>
.form-bg {
  background: url("https://storage.googleapis.com/static-content-seed/danec/formulario.png");
  background-size: contain;
  background-position: center;
  background-repeat: repeat;
}
</style>
