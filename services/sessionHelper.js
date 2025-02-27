// ~/services/sessionHelper.js
import { useRouter } from '#app'
import { useAccountStore } from '~/stores/account'

export function authHeader() {
    const accountStore = useAccountStore()
    return accountStore.user && accountStore.user.token
        ? { Authorization: 'Bearer ' + accountStore.user.token }
        : {}
}

export function logout() {
    const accountStore = useAccountStore()
    accountStore.logout()
}

export function handleResponse(response) {
    // If response has a status property and it's 401, redirect to login.
    if (response && response.status === 401) {
        if (process.client) {
            const router = useRouter()
            logout()
            router.push('/login')
        }
    }
    return response
}
