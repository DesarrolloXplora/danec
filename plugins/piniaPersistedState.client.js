import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    // Since @pinia/nuxt auto-registers Pinia, we need to get it from nuxtApp
    const pinia = nuxtApp.$pinia
    if (pinia) {
        pinia.use(piniaPluginPersistedstate)
    }
})
