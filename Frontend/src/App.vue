<template>
  <div>
    <header>
      <Navbar :selectedTab="selectedTab" @updateSelectedTab="updateSelectedTab" />
    </header>
    <router-view />
    <Footer />
    <ButtonAdd v-if="showButton" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import ButtonAdd from './components/ButtonAdd.vue'

const selectedTab = ref('home')

function updateSelectedTab(tab) {
  selectedTab.value = tab
}

const route = useRoute()
const showButton = computed(() => {
  return route.name === 'home' || route.name === 'shop'
})
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
