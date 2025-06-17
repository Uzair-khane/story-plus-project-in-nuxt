<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const token = useCookie("token");
const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");
const { $axios } = useNuxtApp();
import axios from "axios";
const handleLogin = async () => {
  error.value = "";
  try {
    const response = await $axios.post("/login", {
      email: email.value,
      password: password.value,
    });

    if (response.data.success) {
      token.value = response.data.token;
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/");
    } else {
      alert(response.data.message);
    }

    //  Save token in cookie (valid for 7 days)
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div
    class="bg-center bg-cover mx-auto h-screen w-screen bg-[url('/bg-min.jpg')]"
  >
    <div class="min-h-screen flex items-center justify-center">
      <div
        class="bg-white opacity-[0.9] p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
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
