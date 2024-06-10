<template>
  <div class="product-detail-container">
    <h1 class="product-name">{{ product.name }}</h1>
    <img :src="product.image" alt="Product Image" class="product-image" />
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">Price: ${{ product.price }}</p>
    <button @click="addToCart(product)" class="add-to-cart-button">Add to Cart</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const product = ref({})

onMounted(async () => {
  const productId = route.params.id
  try {
    const response = await axios.get(`http://localhost:3000/products/${productId}`)
    product.value = response.data
  } catch (error) {
    console.error('Failed to fetch product details:', error)
  }
})

function addToCart(product) {
  cartStore.addProductToCart(product)
  router.push({ name: 'cart' })
}
</script>

<style scoped>
.product-detail-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.product-name {
  font-size: 2em;
  margin-bottom: 20px;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-description {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.product-price {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.add-to-cart-button {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #d4a373;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
