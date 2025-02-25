import { useAccountStore } from '~/stores/account'

export function authHeader () {
    // Instead of localStorage, we read from our Pinia store
    const accountStore = useAccountStore()
    const user = accountStore.user
    return user && user.token
        ? { 'Authorization': 'Bearer ' + user.token }
        : {}
}

export function logout () {
    const accountStore = useAccountStore()
    accountStore.clearUser()
    // You can also clear other state if needed.
}

export function handleResponse (response) {
    // Since useFetch already parses JSON for you,
    // we can simply return the response data.
    return response
}
