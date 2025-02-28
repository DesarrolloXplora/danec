<template>
  <div class="bg-white rounded p-4 shadow-none">
    <!-- Title -->
    <Head>
      <Title>Danec | Actualización de mis puntos</Title>
    </Head>
    <!-- Table -->
    <table class="miniextract w-full my-4">
      <thead class="bg-main text-center head-table text-white">
      <tr>
        <th class="border-table-left p-2">Participante</th>
        <th class="p-2">
          <img
              src="https://storage.googleapis.com/static-content-seed/celima/icons/meses.png"
              alt="Meses"
              class="indicator-img inline-block mr-1"
          />
          Puntos cargados por última vez
        </th>
        <th class="p-2">
          <img
              src="https://storage.googleapis.com/static-content-seed/celima/icons/acumulados.png"
              alt="Acumulados"
              class="indicator-img inline-block mr-1"
          />
          Puntos acumulados
        </th>
        <th class="p-2">
          <img
              src="https://storage.googleapis.com/static-content-seed/celima/icons/canjeados.png"
              alt="Canjeados"
              class="indicator-img inline-block mr-1"
          />
          Puntos canjeados
        </th>
        <th class="border-table-right p-2">
          <img
            src="https://storage.googleapis.com/static-content-seed/celima/icons/disponibles.png"
            alt="Disponibles"
            class="indicator-img inline-block mr-1"
          />
          Puntos disponibles
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in points" :key="item.name" class="text-center">
        <td class="p-2">{{ item.pdv }}</td>
        <td class="p-2">{{ item.lastMonth }}</td>
        <td class="p-2">{{ item.won }}</td>
        <td class="p-2">{{ item.spent || 0 }}</td>
        <td class="p-2">{{ item.total }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const points = ref([
  { name: '1', pdv: 'Participante 1', lastMonth: "Abril 12", won: 200, spent: 100, total: 100 }
])
</script>

<style scoped>
.head-table{
  .border-table-left{
    border-top-left-radius: 20px;
  }
  .border-table-right{
    border-top-right-radius: 20px
  }
}
.letter-row{
  font-weight: bold;
}
.miniextract{
  margin: 0 auto;
}
.miniextract thead {
  text-align: left;
  border-bottom: 1px;
  font-weight: 800;
  height: 70px;
}
.miniextract thead tr th:first-child {
  padding-left: 3rem!important;
  padding: 1rem;
  width: fit-content;
}

.miniextract thead tr.secondary-tr{
  background: var(--secondary-color);
}
.miniextract thead tr th {
    color: white !important;
    text-transform: uppercase;
    width: 20%;
    padding-left: 60px !important;
    position: relative;
    font-size: 0.75rem;
    font-weight: bolder;
}
.indicator-img{
  width: 3rem;
  height: auto;
  position: absolute;
  left: 0;
  filter: brightness(0) invert(1);
  top: 50%;
  transform: translateY(-50%);
}
.miniextract tbody tr {
  text-align: center;
  line-height: 4rem;
}
.miniextract tbody{
  border-bottom: solid 1px black;
}
</style>
