// ws.js
import { useProductsStore } from './stores/productsStore.js'

export const ws = new WebSocket('ws://localhost:8080')

ws.onopen = () => {
  console.log('Connected to WebSocket server')
}

ws.onmessage = (event) => {
  const productStore = useProductsStore()
  const data = JSON.parse(event.data)

  // Adaugă console.log pentru a verifica ce date primești
  console.log('Message from server:', data)

  // Handle different types of messages
  if (data.type === 'ADD_PRODUCT') {
    productStore.addProduct(data.product)
  } else if (data.type === 'UPDATE_PRODUCT') {
    productStore.updateProduct(data.product)
  } else if (data.type === 'DELETE_PRODUCT') {
    productStore.deleteProduct(data.productId)
  }
}
