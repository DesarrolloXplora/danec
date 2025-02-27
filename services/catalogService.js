// ~/services/catalogService.js
import { useRuntimeConfig } from '#app'
import { authHeader, handleResponse } from './sessionHelper'

export const catalogService = {
    getAll,
    get,
    post
}

async function getAll() {
    const config = useRuntimeConfig()
    try {
        const response = await $fetch(`${config.public.RED_BARON_URL}/catalogs`, {
            headers: authHeader()
        })
        return handleResponse(response)
    } catch (error) {
        return handleResponse(error)
    }
}

async function get(id) {
    const config = useRuntimeConfig()
    try {
        const response = await $fetch(`${config.public.RED_BARON_URL}/catalog/${id}`, {
            headers: authHeader()
        })
        return handleResponse(response)
    } catch (error) {
        return handleResponse(error)
    }
}

async function post(product) {
    const config = useRuntimeConfig()
    try {
        const response = await $fetch(`${config.public.RED_BARON_URL}/catalogs`, {
            method: 'POST',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        return handleResponse(response)
    } catch (error) {
        return handleResponse(error)
    }
}
