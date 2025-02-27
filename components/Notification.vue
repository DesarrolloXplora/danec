<template>
  <div class="fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50 space-y-2">
    <div
        v-for="notif in notifications"
        :key="notif.id"
        :class="notificationClasses(notif)"
        class="w-full max-w-md px-4 py-3 rounded shadow-lg flex items-center"
    >
      <span class="material-icons mr-2">{{ notificationIcon(notif) }}</span>
      <span class="flex-1">{{ notif.message }}</span>
      <button @click="removeNotification(notif.id)" class="ml-4 font-bold">
        X
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotifications } from '~/composables/useNotifications'

const { notifications, removeNotification } = useNotifications()

function notificationClasses(notif) {
  const base = 'text-white'
  if (notif.type === 'error') return `${base} bg-red-600`
  if (notif.type === 'success') return `${base} bg-green-600`
  if (notif.type === 'info') return `${base} bg-blue-600`
  return `${base} bg-gray-600`
}

function notificationIcon(notif) {
  if (notif.type === 'error') return 'error_outline'
  if (notif.type === 'success') return 'check_circle'
  if (notif.type === 'info') return 'info'
  return 'notification_important'
}
</script>

<style scoped>
/* You can further customize your styles if needed */
</style>
