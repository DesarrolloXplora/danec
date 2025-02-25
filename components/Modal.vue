<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-4 rounded">
      <slot></slot>
      <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-main text-black rounded">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
// You can add script logic here if needed.
</script>

<style scoped>
/* Customize your modal styles as needed */
</style>
