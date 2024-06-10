<template>
  <div class="flex flex-col justify-center items-center p-6">
    <h1
      class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-[#d4a373]"
    >
      Add a new PRODUCT
    </h1>

    <form @submit.prevent="addProduct" class="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bold mb-2">Product Name</label>
        <input
          v-model="newProduct.name"
          type="text"
          id="name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-gray-700 font-bold mb-2">Price</label>
        <input
          v-model="newProduct.price"
          type="number"
          step="0.01"
          id="price"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div class="mb-4">
        <label for="imageURL" class="block text-gray-700 font-bold mb-2">Image URL</label>
        <input
          v-model="newProduct.imageURL"
          type="url"
          id="imageURL"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div class="mb-4">
        <label for="stock" class="block text-gray-700 font-bold mb-2">Stock</label>
        <input
          v-model="newProduct.stock"
          type="number"
          id="stock"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="mx-auto mt-5 mb-5 block text-3xl text-[#7f5539] hover:bg-[#d4a373] hover:text-[#faedcd] rounded p-2 font-bold"
        >
          ADD
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ws } from '../ws.js' // Importă clientul WebSocket

const router = useRouter()
const newProduct = ref({
  name: '',
  price: '',
  imageURL: '',
  stock: 0
})

const addProduct = async () => {
  try {
    const response = await axios.post('http://localhost:3000/products', newProduct.value)
    console.log('Product added:', response.data)

    // Trimite un mesaj WebSocket pentru a notifica toți clienții
    ws.send(
      JSON.stringify({
        type: 'ADD_PRODUCT',
        product: response.data
      })
    )

    // Afișează un mesaj de confirmare și redirecționează utilizatorul
    alert('Product added successfully')
    router.push({ name: 'shop' })

    // Resetează formularul după adăugare
    newProduct.value = {
      name: '',
      price: '',
      imageURL: '',
      stock: 0
    }
  } catch (error) {
    console.error('Failed to add product:', error)
  }
}
</script>

<style></style>
