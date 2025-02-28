<template>
  <Modal>
  <div class="bg-white shadow rounded z-50">
    <!-- Header -->
    <div class="bg-main font-bold text-center text-xl text-white py-2">
      Finalizar Canje
    </div>
    <!-- Content -->
    <div class="p-4">
      <div class="flex flex-wrap -mx-2">
        <div
            v-for="(r, index) in formData"
            :key="index"
            class="w-full sm:w-1/2 px-2 mb-4"
        >
          <!-- Only render input if the field type is not a button -->
          <input
              v-if="r.type !== 'button'"
              v-model="r.model"
              :type="r.type"
              :placeholder="`${r.name} *`"
              class="block w-full px-3 py-2 border rounded uppercase"
              required
          />
          <!-- If you need to add a button field, include additional logic here -->
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <button
            @click="closeModal"
            class="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
            @click="sendData"
            class="bg-main text-white px-4 py-2 rounded"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from '~/stores/account'
import { exchangeService } from '~/services/exchangeService.js'

// Define emitted events
const emit = defineEmits(['exchanged', 'close'])

// Access your account store via Pinia
const account = useAccountStore()

// Local reactive state for form data
const formData = ref([
  { type: 'text', name: 'Ciudad', id: 'city', model: '' },
  { type: 'text', name: 'Dirección', id: 'address', model: '' },
  { type: 'text', name: 'Barrio', id: 'neighborhood', model: '' },
  { type: 'text', name: 'Provincia', id: 'department', model: '' },
  { type: 'text', name: 'Nombre Completo', id: 'name', model: '' },
  { type: 'email', name: 'Correo', id: 'email', model: '' },
  { type: 'number', name: 'Celular', id: 'cellphone', model: '' },
  { type: 'text', name: 'Teléfono', id: 'telephone', model: '' },
  { type: 'number', name: 'DNI contacto', id: 'idCardContact', model: '' },
  { type: 'text', name: 'Nombre contacto', id: 'contact', model: '' },
  { type: 'text', name: 'Telefono contacto', id: 'cellphoneContact', model: '' }
])

// When the component mounts, pre-fill the form using data from the account store
onMounted(() => {
  formData.value.forEach(field => {
    if (field.id === 'name') {
      field.model = account.user.name_canonical
    } else {
      field.model = account.user[field.id]
    }
  })
})

// Send form data to the backend
const sendData = async () => {
  let data = {}
  for (let field of formData.value) {
    data[field.id] = field.model
    if (!field.model) {
      alert('Debe completar todos los campos')
      return
    }
  }
  data.using = account.using
  try {
    const answer = await exchangeService.post(data)
    // Refresh the user data in your store after a successful call
    account.refreshUser()
    emit('exchanged', answer)
  } catch (error) {
    alert('Error al redimir')
  }
}

// Emit an event to close the modal
const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
/* You can add any additional Tailwind customizations or overrides here */
</style>
