// ~/stores/cartItemStore.js
import { defineStore } from 'pinia'
import { cartItemService } from '~/services/cartItemService'

export const useCartItemStore = defineStore('cartItemStore', {
    state: () => ({
        cart: [],
        status: { empty: false }
    }),
    actions: {
        async addItem(body) {
            try {
                const response = await cartItemService.post(body)
                // Assume the response returns the newly created cart item
                this.itemAdded(response)
            } catch (error) {
                console.error('Error adding item:', error)
                // Optionally, handle error notifications here
            }
        },
        async increaseItem(body) {
            try {
                await cartItemService.post(body)
                this.itemIncreased()
            } catch (error) {
                console.error('Error increasing item:', error)
            }
        },
        updateItems(cartItems) {
            this.cart = cartItems
        },
        async removeItem(cart) {
            try {
                await cartItemService.remove(cart.id)
                this.itemRemoved(cart)
            } catch (error) {
                console.error('Error removing item:', error)
            }
        },
        clearCart() {
            this.clear()
        },
        // "Mutations" implemented as actions:
        itemAdded(cartItem) {
            this.cart.push(cartItem)
        },
        itemIncreased() {
            // If additional logic is needed when an item is increased, add it here.
            // Otherwise, you can leave this as a no-op.
        },
        itemRemoved(cart) {
            this.cart = this.cart.filter(item => item.id !== cart.id)
        },
        clear() {
            this.cart = []
        }
    }
})
