<template>
<div class=" bg-center bg-cover mx-auto h-screen w-screen bg-[url('/bg-min.jpg')]">
    <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white opacity-[0.8] p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Signup</h2>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')

const handleSignup = () => {
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  localStorage.setItem('user', JSON.stringify(userData))
  alert('Signup successful!')
  router.push('/login')
}
</script>
