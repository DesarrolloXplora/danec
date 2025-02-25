// ~/services/cartItemService.js
import { useRuntimeConfig } from '#app'
import { authHeader, handleResponse } from './sessionHelper'

export const cartItemService = {
    post,
    getAll,
    get,
    remove
}

async function post(body) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/cartItem`, {
            method: 'POST',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}

async function getAll() {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/cartItems/user`, {
            headers: authHeader()
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}

async function get(id) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/cartItem/${id}`, {
            headers: authHeader()
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}

async function remove(id) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/cartItem/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}
