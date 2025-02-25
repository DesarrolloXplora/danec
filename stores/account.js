// ~/stores/account.js
import { defineStore } from 'pinia'
import { userService } from '~/services/userService'
import { useRouter } from 'vue-router'

export const useAccountStore = defineStore('account', {
    state: () => ({
        // Initial state: user is not logged in
        status: { loggingIn: false, loggedIn: false, active: false },
        user: null,
        points: null,
        using: null
    }),
    getters: {
        // Returns the current points for the active pdv (if available)
        currentPoints: (state) => {
            return state.points && state.using && state.points[state.using]
                ? state.points[state.using].total || 0
                : 0
        }
    },
    actions: {
        async login({ username, password }) {
            this.status.loggingIn = true
            try {
                // Call the userService login which returns the user profile
                const user = await userService.login(username, password)
                this.status = { loggedIn: true, active: false }
                this.user = user
                // Redirect after login using the router
                const router = useRouter()
                router.push('/')
            } catch (error) {
                this.status.loggingIn = false
                this.user = null
                // Optionally, you can throw or handle the error here
                throw error
            }
        },
        logout() {
            userService.logout()
            this.status = { loggingIn: false, loggedIn: false, active: false }
            this.user = null
            this.points = null
            this.using = null
        },
        updateUser(user) {
            // Update the user information in the store
            this.user = user
        },
        updateUsing(pdv) {
            // Set the active pdv
            this.using = pdv
        },
        updatePoints(points) {
            // Convert an array of points into an object keyed by pdv (ruc)
            if (Array.isArray(points) && points.length > 0) {
                const comp = {}
                points.forEach((pdv) => {
                    comp[pdv.ruc] = pdv
                })
                if (!this.using) {
                    // Set active pdv if none is selected
                    this.using = points[points.length - 1].ruc
                }
                this.points = comp
            }
        },
        async refreshUser() {
            try {
                // Refresh user data from the backend
                const refreshedUser = await userService.reload()
                this.user = refreshedUser
            } catch (error) {
                console.error('Failed to refresh user', error)
            }
        },
        validate(user) {
            // Simple validation: update the user in the store
            this.user = user
        }
    }
})
