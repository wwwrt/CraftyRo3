<template>
  <div>
    <Carousel1 />

    <div class="flex justify-center mt-4">
      <button
        class="mx-auto mt-5 mb-5 block text-3xl text-[#7f5539] hover:bg-[#d4a373] hover:text-[#faedcd] rounded p-2 font-bold"
        @click="sortProducts('price')"
      >
        Sort by Price
      </button>
      <button
        class="mx-auto mt-5 mb-5 block text-3xl text-[#7f5539] hover:bg-[#d4a373] hover:text-[#faedcd] rounded p-2 font-bold"
        @click="sortProducts('name')"
      >
        Sort by Name
      </button>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <CraftyCard
        v-for="product in visibleProducts"
        :key="product.id"
        :product="product"
        @buy-product="handleBuyProduct"
        @delete-product="handleDeleteProduct"
      />
    </div>

    <div class="flex justify-center">
      <button
        v-if="!allProductsShown"
        @click="loadMore"
        class="mx-auto mt-5 mb-5 block text-3xl text-[#7f5539] hover:bg-[#d4a373] hover:text-[#faedcd] rounded p-2 font-bold"
      >
        See More
      </button>
      <p class="mt-5 mb-5 block text-center text-3xl text-[#7f5539] p-2 font-bold" v-else>
        Acestea sunt toate produsele
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Carousel1 from '/src/components/Carousel1.vue'
import CraftyCard from '/src/components/CraftyCard.vue'
import axios from 'axios'
import { useProductsStore } from '../stores/productsStore.js'
import { useCartStore } from '../stores/cartStore.js' // Import the cart store
import { ws } from '../ws.js' // Import WebSocket instance

const productStore = useProductsStore()
const cartStore = useCartStore() // Initialize the cart store
const visibleCount = ref(10)

const visibleProducts = computed(() => {
  return productStore.products.slice(0, visibleCount.value)
})

const allProductsShown = computed(() => {
  return visibleCount.value >= productStore.products.length
})

function loadMore() {
  visibleCount.value += 10
}

function sortProducts(key) {
  if (key === 'price') {
    productStore.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
  } else if (key === 'name') {
    productStore.products.sort((a, b) => a.name.localeCompare(b.name))
  }
}

async function handleBuyProduct(product) {
  console.log('Handling buy-product event:', product)

  // Add product to the cart
  cartStore.addProductToCart(product)

  try {
    // Create an order in the backend
    const orderResponse = await axios.post('http://localhost:3000/order', {
      userId: 1, // Replace with the actual user ID
      name: product.name,
      price: product.price,
      imageUrl: product.imageURL,
      stock: product.stock,
      status: 'pending'
    })

    console.log('Order created successfully', orderResponse.data)

    // Send order creation message to WebSocket server
    ws.send(
      JSON.stringify({
        type: 'ADD_ORDER',
        order: orderResponse.data
      })
    )
  } catch (error) {
    console.error('Failed to create order:', error)
  }
}

function handleDeleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    const isSeller = true

    if (isSeller) {
      axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then(() => {
          productStore.deleteProduct(productId)
        })
        .catch((error) => {
          console.error('Failed to delete product:', error)
        })
    } else {
      alert('Access denied: You are not the seller of this product.')
    }
  }
}

onMounted(async () => {
  try {
    const productsResponse = await axios.get('http://localhost:3000/products')
    productStore.setProducts(productsResponse.data)
  } catch (error) {
    console.error('Failed to load products:', error)
  }

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    if (message.type === 'ADD_ORDER') {
      cartStore.addProductToCart(message.order)
    }
  }
})
</script>
