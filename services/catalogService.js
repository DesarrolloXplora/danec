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
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/catalogs`, {
            headers: authHeader()
        })
        if (error.value) {
            return handleResponse(error.value)
        }
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}

async function get(id) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/catalog/${id}`, {
            headers: authHeader()
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}

async function post(product) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/catalogs`, {
            method: 'POST',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}
