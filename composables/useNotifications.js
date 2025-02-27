// ~/composables/useNotifications.js
import { ref } from 'vue'

let nextId = 1
const notifications = ref([])

export function useNotifications() {
    const showNotification = ({ message, type = 'info', duration = 10000 }) => {
        const id = nextId++
        notifications.value.push({ id, message, type })
        // Auto-remove notification after specified duration
        setTimeout(() => {
            removeNotification(id)
        }, duration)
    }

    const removeNotification = (id) => {
        notifications.value = notifications.value.filter(notif => notif.id !== id)
    }

    return { notifications, showNotification, removeNotification }
}
