// ~/services/userService.js
import { useRuntimeConfig } from '#app'
import { useAccountStore } from '~/stores/account'
import { authHeader, handleResponse } from './sessionHelper'

export const userService = {
    login,
    logout,
    terms,
    getAll,
    reload,
    resetting,
    get,
    putPhoto,
    getMyPoints,
    getDetailedPoints,
    getPointsAbstract,
    update,
    changePassword
}

async function login(username, password) {
    const config = useRuntimeConfig()
    const accountStore = useAccountStore()
    // Send login credentials using useFetch
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/login_check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    const user = handleResponse(data.value)
    if (user.token) {
        // Instead of localStorage, update the Pinia store
        accountStore.setUser(user)
        // Fetch the full user profile with the auth header
        const { data: profileData, error: profileError } = await useFetch(
            `${config.public.RED_BARON_URL}/user`,
            { headers: authHeader() }
        )
        if (profileError.value) {
            return handleResponse(profileError.value)
        }
        const profile = handleResponse(profileData.value)
        // Preserve the token and update the store
        profile.token = user.token
        accountStore.setUser(profile)
        return profile
    }
    return user
}

function logout() {
    const accountStore = useAccountStore()
    // Clear the user from the Pinia store
    accountStore.$reset()
}

async function reload() {
    const config = useRuntimeConfig()
    const accountStore = useAccountStore()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/users/profile`, {
        headers: authHeader()
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    const profile = handleResponse(data.value)
    // Retain the current token if available
    if (accountStore.user && accountStore.user.token) {
        profile.token = accountStore.user.token
    }
    accountStore.setUser(profile)
    return profile
}

async function resetting(email) {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/user/resetting/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function terms(id, body) {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/users/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function changePassword(id, body) {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/user/${id}/change`, {
        method: 'POST',
        headers: authHeader(),
        body
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function getAll() {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/users`, {
        headers: authHeader()
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function getMyPoints() {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/user/points`, {
        headers: authHeader()
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function getDetailedPoints() {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/user/detailed_points`, {
        headers: authHeader()
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function getPointsAbstract() {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/user/abstract`, {
        headers: authHeader()
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function putPhoto(form, id) {
    const config = useRuntimeConfig()
    // When sending FormData, let useFetch set the proper headers automatically
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/users/${id}`, {
        method: 'POST',
        headers: authHeader(),
        body: form
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function get(id) {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/users/${id}`, {
        headers: authHeader()
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}

async function update(user) {
    const config = useRuntimeConfig()
    const { data, error } = await useFetch(`${config.public.RED_BARON_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (error.value) {
        return handleResponse(error.value)
    }
    return handleResponse(data.value)
}
