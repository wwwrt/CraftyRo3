import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchCartItems() {
      try {
        const response = await axios.get('http://localhost:3000/orderItem')
        this.products = response.data.map((item) => ({
          id: item.Product.id,
          name: item.Product.name,
          price: item.Product.price,
          image: item.Product.image,
          quantity: item.quantity
        }))
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      }
    },
    async addProductToCart(product) {
      try {
        await axios.post('http://localhost:3000/orderItem', {
          productId: product.id,
          quantity: 1 // Or any default quantity
        })
        this.products.push(product)
      } catch (error) {
        console.error('Failed to add product to cart:', error)
      }
    }
  }
})
