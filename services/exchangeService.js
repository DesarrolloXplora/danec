import { useRuntimeConfig } from '#app'
import { authHeader, handleResponse } from './sessionHelper'

export const exchangeService = {
    post,
    get,
    remove
}

async function post(body) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/exchange`, {
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

async function get(id) {
    const config = useRuntimeConfig()
    try {
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/exchange/${id}`, {
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
        const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/exchange/${id}`, {
            method: 'DELETE',
            headers: authHeader()
        })
        if (error.value) return handleResponse(error.value)
        return handleResponse(data.value)
    } catch (err) {
        return handleResponse(err)
    }
}
