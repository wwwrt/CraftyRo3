<template>
  <button
    class="fixed bottom-5 right-5 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
    @click="navigateToPage"
  >
    +
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToPage() {
  router.push('/NewProduct')
}
</script>
