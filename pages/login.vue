<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    const response = await fetch('https://story-backend-nu.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    //  Save token in cookie (valid for 7 days)
    Cookies.set('token', data.token, { expires: 7 })

    //  Optionally store user info
    localStorage.setItem('user', JSON.stringify(data.user))

    //  Redirect to homepage
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="bg-center bg-cover mx-auto h-screen w-screen bg-[url('/bg-min.jpg')]">
    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-white opacity-[0.9] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded-xl"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded-xl"
          />
          <button
            type="submit"
            class="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
          >
            Login
          </button>
          <p class="text-red-500 mt-2" v-if="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
