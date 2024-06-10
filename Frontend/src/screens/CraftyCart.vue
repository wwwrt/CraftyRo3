<template>
  <div class="cart-container">
    <h1>Your Cart</h1>
    <div v-if="cartProducts.length > 0">
      <div v-for="product in cartProducts" :key="product.id" class="cart-product">
        <img :src="product.image" alt="Product Image" class="cart-product-image" />
        <div class="cart-product-details">
          <h2>{{ product.name }}</h2>
          <p>Price: ${{ product.price }}</p>
          <p>Quantity: {{ product.quantity }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const cartProducts = computed(() => cartStore.products)

onMounted(() => {
  cartStore.fetchCartItems()
})
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.cart-product {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-product-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.cart-product-details {
  text-align: left;
}

.cart-product-details h2 {
  margin: 0 0 10px 0;
}

.cart-product-details p {
  margin: 0;
}
</style>
