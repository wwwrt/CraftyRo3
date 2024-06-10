<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue'

// Definirea props
const props = defineProps({
  selectedTab: {
    type: String,
    required: true
  }
})

// Definirea evenimentelor
const emit = defineEmits(['updateSelectedTab'])

const isDropdownOpen = ref(false)
const isLoggedIn = ref(false)
const username = ref('')

// Router
const router = useRouter()

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

function closeDropdown() {
  isDropdownOpen.value = false
}

function handleClickOutside(event) {
  if (!event.target.closest('#dropdown') && !event.target.closest('.dropdown-toggle')) {
    closeDropdown()
  }
}

function updateTab(tab) {
  emit('updateSelectedTab', tab)
}

function logout() {
  isLoggedIn.value = false
  username.value = ''
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  const token = localStorage.getItem('token')
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]))
    username.value = payload.username
    isLoggedIn.value = true
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="relative px-4 flex justify-between items-center bg-white bg-opacity-30">
    <img src="/images/LogoCraftyRO.png" class="w-28" />

    <div class="lg:hidden">
      <button class="navbar-burger flex items-center text-[#d4a373] p-3">
        <svg
          class="block h-4 w-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
    </div>
    <ul class="hidden lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
      <li>
        <RouterLink
          :class="[
            'text-3xl',
            'text-[#d4a373]',
            'hover:bg-[#d4a373]',
            'hover:text-[#faedcd]',
            'rounded',
            'p-2',
            'font-bold',
            { 'active-tab': props.selectedTab === 'home' }
          ]"
          :to="{ name: 'home' }"
          @click="updateTab('home')"
          >Home</RouterLink
        >
      </li>

      <li class="relative dropdown-toggle" @click="toggleDropdown">
        <a
          class="cursor-pointer text-lg text-[#d4a373] font-bold hover:text-[#faedcd] hover:bg-[#d4a373] rounded p-1"
          >Shop</a
        >
        <!-- Dropdown menu -->
        <div
          v-if="isDropdownOpen"
          id="dropdown"
          class="border border-[#d4a373] bg-[#faedcd] divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            class="flex items-center flex-col py-2 text-sm text-[#faedcd] dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <RouterLink
                :class="[
                  'text-lg',
                  'text-[#d4a373]',
                  'font-bold',
                  'hover:text-[#faedcd]',
                  'hover:bg-[#d4a373]',
                  'rounded',
                  'p-1',
                  { 'active-tab': props.selectedTab === 'shop' }
                ]"
                :to="{ name: 'shop' }"
                @click="
                  () => {
                    updateTab('shop')
                    closeDropdown()
                  }
                "
                >Shop</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :class="[
                  'text-lg',
                  'text-[#d4a373]',
                  'font-bold',
                  'hover:text-[#faedcd]',
                  'hover:bg-[#d4a373]',
                  'rounded',
                  'p-1',
                  { 'active-tab': props.selectedTab === 'learn' }
                ]"
                :to="{ name: 'learn' }"
                @click="
                  () => {
                    updateTab('learn')
                    closeDropdown()
                  }
                "
                >CraftyLearn</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :class="[
                  'text-lg',
                  'text-[#d4a373]',
                  'font-bold',
                  'hover:text-[#faedcd]',
                  'hover:bg-[#d4a373]',
                  'rounded',
                  'p-1',
                  { 'active-tab': props.selectedTab === 'categories' }
                ]"
                :to="{ name: 'categories' }"
                @click="
                  () => {
                    updateTab('categories')
                    closeDropdown()
                  }
                "
                >ProductCategories</RouterLink
              >
            </li>
          </ul>
        </div>
      </li>

      <li>
        <RouterLink
          :class="[
            'text-lg',
            'text-[#d4a373]',
            'font-bold',
            'hover:text-[#faedcd]',
            'hover:bg-[#d4a373]',
            'rounded',
            'p-1',
            { 'active-tab': props.selectedTab === 'exhibition' }
          ]"
          :to="{ name: 'exhibition' }"
          @click="updateTab('exhibition')"
          >Exhibition</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="[
            'text-lg',
            'text-[#d4a373]',
            'font-bold',
            'hover:text-[#faedcd]',
            'hover:bg-[#d4a373]',
            'rounded',
            'p-1',
            { 'active-tab': props.selectedTab === 'leaderboard' }
          ]"
          :to="{ name: 'leaderboard' }"
          @click="updateTab('leaderboard')"
          >Leaderboard</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="[
            'text-lg',
            'text-[#d4a373]',
            'font-bold',
            'hover:text-[#faedcd]',
            'hover:bg-[#d4a373]',
            'rounded',
            'p-1',
            { 'active-tab': props.selectedTab === 'about' }
          ]"
          :to="{ name: 'about' }"
          @click="updateTab('about')"
          >About</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="[
            'text-lg',
            'text-[#d4a373]',
            'font-bold',
            'hover:text-[#faedcd]',
            'hover:bg-[#d4a373]',
            'rounded',
            'p-1',
            { 'active-tab': props.selectedTab === 'points' }
          ]"
          :to="{ name: 'points' }"
          @click="updateTab('points')"
          >Points</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="[
            'text-lg',
            'text-[#d4a373]',
            'font-bold',
            'hover:text-[#faedcd]',
            'hover:bg-[#d4a373]',
            'rounded',
            'p-1',
            { 'active-tab': props.selectedTab === 'vip' }
          ]"
          :to="{ name: 'vip' }"
          @click="updateTab('vip')"
          >VIP</RouterLink
        >
      </li>
      <li>
        <RouterLink
          :class="[
            'text-lg',
            'text-[#d4a373]',
            'font-bold',
            'hover:text-[#faedcd]',
            'hover:bg-[#d4a373]',
            'rounded',
            'p-1',
            { 'active-tab': props.selectedTab === 'profile' }
          ]"
          :to="{ name: 'profile' }"
          @click="updateTab('profile')"
          >Profile</RouterLink
        >
      </li>
    </ul>
    <div class="flex items-center">
      <template v-if="isLoggedIn">
        <span class="hidden lg:inline-block text-[#d4a373] font-bold mr-4"
          >Welcome, {{ username }}</span
        >
        <button
          class="hidden lg:inline-block py-2 px-6 bg-[#faedcd] hover:bg-[#d4a 373] hover:text-[#faedcd] text-sm text-[#d4a373] font-bold rounded-xl transition duration-700"
          @click="logout"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <RouterLink
          class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-[#faedcd] hover:bg-[#d4a373] hover:text-[#faedcd] text-sm text-[#d4a373] font-bold rounded-xl transition duration-700"
          :to="{ name: 'signup' }"
          >Sign Up</RouterLink
        >
        <RouterLink
          class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-[#faedcd] hover:bg-[#d4a373] hover:text-[#faedcd] text-sm text-[#d4a373] font-bold rounded-xl transition duration-700"
          :to="{ name: 'login' }"
          >Login</RouterLink
        >
      </template>
      <RouterLink
        class="inline-block lg:ml-auto lg:mr-3 p-2 bg-[#faedcd] hover:bg-[#d4a373] hover:text-[#faedcd] text-[#d4a373] rounded-xl transition duration-700"
        :to="{ name: 'cart' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.341 2.668L7 13h10l1.659-7.332L21 3H5m1.625 10H16.75M7.25 21a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM17.25 21a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
          />
        </svg>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
li {
  position: relative;
}

#dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  z-index: 10;
}

.active-tab {
  background-color: #d4a373;
  color: #faedcd;
}

.cart-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-icon svg {
  width: 24px;
  height: 24px;
  color: #d4a373;
  transition: color 0.3s;
}

.cart-icon:hover svg {
  color: #faedcd;
}
</style>
