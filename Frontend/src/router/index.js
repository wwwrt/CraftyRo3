import { createRouter, createWebHistory } from 'vue-router'

import AboutUs from '@/screens/AboutUs.vue'
import CraftyLearn from '@/screens/CraftyLearn.vue'
import ProductCategories from '@/screens/ProductCategories.vue'
import Exhibition from '@/screens/Exhibition.vue'
import VIP from '@/screens/VIP.vue'
import MyProfile from '@/screens/MyProfile.vue'
import HomePage from '@/screens/HomePage.vue'
import Leaderboard from '@/screens/Leaderboard.vue'
import Points from '@/screens/Points.vue'
import SignUp from '@/screens/SignUp.vue'
import LogIn from '@/screens/LogIn.vue'
import CraftyShop from '@/screens/CraftyShop.vue'
import UpdateProduct from '@/screens/UpdateProduct.vue'
import NewProduct from '@/screens/NewProduct.vue'
import CraftyCart from '@/screens/CraftyCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/exhibition',
    name: 'exhibition',
    component: Exhibition
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUs
  },
  {
    path: '/points',
    name: 'points',
    component: Points
  },
  {
    path: '/vip',
    name: 'vip',
    component: VIP
  },
  {
    path: '/profile',
    name: 'profile',
    component: MyProfile
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/shop',
    name: 'shop',
    component: CraftyShop
  },
  {
    path: '/learn',
    name: 'learn',
    component: CraftyLearn
  },
  {
    path: '/categories',
    name: 'categories',
    component: ProductCategories
  },
  {
    path: '/newproduct',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/updateproduct/:id',
    name: 'UpdateProduct',
    component: UpdateProduct,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: CraftyCart
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
