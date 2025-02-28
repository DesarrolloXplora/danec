// ~/stores/account.js
import { defineStore } from 'pinia'
import { userService } from '~/services/userService'

export const useAccountStore = defineStore('account', {
    state: () => ({
        user: null,
        status: { loggingIn: false, loggedIn: false, active: false },
        points: null,
        using: 0
    }),
    getters: {
        currentPoints: (state) => {
            return state.points && state.points[0]
                ? state.points[0].total || 0
                : 0
        },
        pointsWon: (state) => {
            return state.points && state.points[0]
                ? state.points[0].won || 0
                : 0
        }
    },
    actions: {
        async login({ username, password }) {
            this.status.loggingIn = true
            try {
                const user = await userService.login(username, password)
                if (!user || !user.token) {
                    throw new Error('Credenciales inválidas')
                }
                this.setUser(user)
                this.status = { loggedIn: true, active: false }
            } catch (error) {
                this.status.loggingIn = false
                this.user = null
                throw error
            }
        },
        setUser(user) {
            this.user = user
        },
        logout() {
            userService.logout()
            this.status = { loggingIn: false, loggedIn: false, active: false }
            this.user = null
            this.points = null
            this.using = null
        },
        updatePoints(points) {
            console.log('points', points)
            if(points !== undefined) this.points = points
        },
        updateUsing(pdv) {
            this.using = pdv
        },
        async updateUserData(updatedData) {
            try {
                // Call the userService update method
                const updatedUser = await userService.update(updatedData)
                // Merge updated fields into our existing user state
                this.user = { ...this.user, ...updatedUser }
                return updatedUser
            } catch (error) {
                console.error('Error updating user data', error)
                throw error
            }
        },
        async updateUserPicture(file) {
            try {
                // Create FormData and append the file
                const formData = new FormData()
                formData.append('file', file)
                // Call the userService to update the photo, using the user id
                const updatedUser = await userService.putPhoto(formData, this.user.id)
                // Update the avatar in our state (assumes response returns updated avatar URL)
                this.user.avatar = updatedUser.avatar || this.user.avatar
                return updatedUser
            } catch (error) {
                console.error('Error updating user picture', error)
                throw error
            }
        },
    },
    persist: {
        enabled: process.client,
        strategies: [
            {
                key: 'account',
                storage: {
                    getItem: (key) =>
                        typeof window !== 'undefined' ? localStorage.getItem(key) : null,
                    setItem: (key, value) =>
                        typeof window !== 'undefined' ? localStorage.setItem(key, value) : null,
                    removeItem: (key) =>
                        typeof window !== 'undefined' ? localStorage.removeItem(key) : null
                }
            }
        ]
    }
})
