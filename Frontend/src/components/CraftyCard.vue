<template>
  <div class="w-72 bg-[#faedcd] border border-[#d4a373] rounded-lg shadow-md">
    <a href="#">
      <img
        class="rounded-t-lg w-full h-48 object-cover"
        :src="product.imageURL"
        :alt="product.name"
      />
    </a>
    <div class="p-5 flex items-center flex-col">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#7f5539] text-center">
          {{ product.name }}
        </h5>
      </a>
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#7f5539] text-center">
          ${{ product.price }}
        </h5>
      </a>
      <button
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-[#faedcd] bg-[#7f5539] rounded-lg hover:bg-[#d4a373] focus:ring-4 focus:outline-none focus:ring-[#d4a373] mb-2"
        @click="buyProduct"
      >
        Buy
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
      <button
        v-if="isBuyer"
        @click="modifyProduct"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-[#faedcd] bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 mb-2"
      >
        Modify
      </button>
      <button
        v-if="isBuyer"
        @click="deleteProduct"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-[#faedcd] bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
      >
        Delete
      </button>
      <p class="text-center text-sm text-gray-600 mt-2">In stock: {{ product.stock }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    isBuyer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ws: null
    }
  },
  created() {
    this.ws = new WebSocket('ws://localhost:3000')
    this.ws.onopen = () => {
      console.log('WebSocket connection established')
    }
    this.ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data)
    }
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    this.ws.onclose = () => {
      console.log('WebSocket connection closed')
    }
  },
  beforeUnmount() {
    if (this.ws) {
      this.ws.close()
    }
  },
  methods: {
    buyProduct() {
      this.$emit('buy-product', this.product)
    },
    modifyProduct() {
      if (confirm('Ești vânzătorul acestui produs?')) {
        this.$router.push({ name: 'UpdateProduct', params: { id: this.product.id } })
      } else {
        alert('Access denied')
      }
    },
    deleteProduct() {
      if (confirm('Ești vânzătorul acestui produs?')) {
        axios
          .delete(`http://localhost:3000/products/${this.product.id}`)
          .then(() => {
            this.$emit('delete-product', this.product.id)

            // Trimite un mesaj WebSocket pentru a notifica toți clienții
            this.ws.send(
              JSON.stringify({
                type: 'DELETE_PRODUCT',
                productId: this.product.id
              })
            )
          })
          .catch((error) => {
            console.error('Failed to delete product:', error)
          })
      } else {
        alert('Access denied')
      }
    }
  }
}
</script>
