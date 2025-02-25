<template>
  <div class="container mx-auto mt-20 px-4">
    <!-- Fila 1 -->
    <div class="flex flex-wrap -mx-4">
      <!-- Columna izquierda: Pilar -->
      <div class="w-full md:w-1/4 px-4 relative">
        <div class="pilar-title text-xl font-bold">
          <span>Pilar 1</span>
        </div>
      </div>

      <!-- Columna derecha: Tabla -->
      <div class="w-full md:w-3/4 px-4">
        <div v-if="!loading" class="overflow-x-auto">
          <table class="min-w-full pilares">
            <thead class="text-center headTable">
            <tr class="primary-tr bg-main text-white">
              <th class="rounded-l-3xl px-4 py-2">COMPRAS</th>
              <th></th>
              <th></th>
              <th class="text-right rounded-r-3xl px-4 py-2">{{ period }}</th>
            </tr>
            <tr class="bg-gray-200">
              <th class="rounded-l-3xl px-4 py-2">RUC</th>
              <th class="px-4 py-2">Punto de Venta</th>
              <th class="px-4 py-2">COMPRA</th>
              <th class="px-4 py-2 rounded-r-3xl">Puntos ganados</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in totals"
                :key="item.ruc"
                class="text-center border-t"
            >
              <td class="px-4 py-2">{{ item.ruc }}</td>
              <td class="px-4 py-2">{{ item.pdv }}</td>
              <td class="px-4 py-2">{{ item.extraInfo.result }}</td>
              <td class="px-4 py-2">{{ item.total }}</td>
            </tr>
            <tr class="text-center font-bold border-t bg-black text-white">
              <td colspan="2" class="px-4 py-2">Total Pilar 1</td>
              <td class="px-4 py-2">S/. {{ result || '0' }}</td>
              <td class="px-4 py-2">{{ total || '-' }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Fila 2: Botón -->
    <div class="flex flex-wrap mt-8">
      <div class="w-full md:w-5/12 md:ml-auto px-4">
        <button
            @click="$router.push('/como-funciona')"
            class="bg-main font-[600] rounded-2xl float-right px-4 py-2 text-white text-xs"
        >
          *Click para saber cómo ganas puntos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      period: 'Marzo 2025',
      totals: [
        {
          ruc: '123456789',
          pdv: 'Participante 1',
          extraInfo: { result: '150' },
          total: '15'
        },
      ],
      result: 500,
      total: 50
    }
  }
}
</script>

<style scoped>
.pilar-title{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: -12rem;
  background: var(--primary-color);
  color: white;
  font-size: 4.5rem;
  font-weight: bolder;
  text-align: right;
  padding-right: 2rem;
  vertical-align: center;
  border-radius: 0 20px 20px 0;
  line-height: 5rem;
  span {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
.headTable{
  .letterHeaderTable{
    font-weight: bolder;
    padding: 1rem;
  }
  .borderTableLeft{
    border-top-left-radius: 20px;
  }
  .border-table-right{
    border-top-right-radius: 20px
  }
}
.letterRow{
  font-weight: bold;
}
</style>
