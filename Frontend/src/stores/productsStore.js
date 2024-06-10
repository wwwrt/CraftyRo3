import { defineStore } from 'pinia'
import { ws } from '../ws.js'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    setProducts(products) {
      this.products = products
    },
    addProduct(product) {
      this.products.push(product)
      // Send WebSocket message after adding the product
      ws.send(
        JSON.stringify({
          type: 'ADD_PRODUCT',
          product: product
        })
      )
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id)
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct)
        // Send WebSocket message after updating the product
        ws.send(
          JSON.stringify({
            type: 'UPDATE_PRODUCT',
            product: updatedProduct
          })
        )
      }
    },
    deleteProduct(productId) {
      this.products = this.products.filter((p) => p.id !== productId)
      // Send WebSocket message after deleting the product
      ws.send(
        JSON.stringify({
          type: 'DELETE_PRODUCT',
          productId: productId
        })
      )
    }
  }
})
