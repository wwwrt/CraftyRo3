import { RouterLink } from 'vue-router';
<template>
  <div>
    <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 rounded-lg shadow-xl bg-[#d4a373]">
      <h2 class="text-2xl font-bold text-[#fefae0]">Sign Up to CraftyRO</h2>
      <form class="mt-8 space-y-6" action="#">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium dark:text-[#fefae0]"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-[#fefae0] border border-[#fefae0] text-[#d4a373] text-sm rounded-lg w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-[#fefae0] border border-[#fefae0] text-[#d4a373] text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Re-enter your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-[#fefae0] border border-[#fefae0] text-[#d4a373] text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              name="remember"
              type="checkbox"
              class="w-4 h-4"
              required
            />
          </div>
          <div class="ms-3 text-sm">
            <label for="remember" class="font-medium text-[#fefae0]">Remember this device</label>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <button
            type="submit"
            class="w-full px-5 py-3 text-base font-medium text-center text-white bg-[#e7c8a0] rounded-lg hover:bg-[#484564] sm:w-auto"
          >
            Sign Up
          </button>
          <div class="mt-6 text-sm font-medium text-gray-900 dark:text-white">
            Have an account?
            <RouterLink
              class="text-blue-600 hover:underline dark:text-[#484564]"
              :to="{ name: 'login' }"
              >Log In</RouterLink
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
