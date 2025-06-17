<script setup>
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

// Logout function for Nuxt 3
const logout = () => {
  localStorage.removeItem("user");
  navigateTo("/login");
};
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="fixed w-full h-[70px] flex justify-between  z-50">
      <h1 class="mt-[10px] text-3xl text-white ml-[50px]">StoryPlus</h1>

      <!-- Desktop Menu -->
      <ul class="hidden sm:flex gap-[35px] mr-[80px] font-semibold text-white mt-[20px]">
        <li class="hover:text-slate-800">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="hover:text-slate-800">
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <li class="hover:text-slate-800">
          <nuxt-link to="/stories">Stories</nuxt-link>
        </li>
        <li class="hover:text-slate-800">
          <nuxt-link to="/archives">Archives</nuxt-link>
        </li>

        <!-- Profile Dropdown -->
        <li class="relative group">
          <nuxt-link to="/profile">Profile</nuxt-link>
          <div class="absolute hidden group-hover:block bg-white text-black mt-2 right-0 w-[200px] shadow-md rounded">
            <nuxt-link to="/profile" href="#" class="block mb-2 p-3 hover:bg-amber-400 hover:w-full">Your Profile</nuxt-link>
            <a href="#" @click.prevent="logout" class="block p-3 hover:bg-amber-400">Log out</a>
          </div>
        </li>
      </ul>

      <!-- Hamburger Icon (Mobile) -->
      <div class="sm:hidden mt-[20px] mr-[30px] text-white">
        <i
          class="fa-solid"
          :class="isMobileMenuOpen ? 'fa-xmark text-3xl' : 'fa-bars text-3xl'"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        ></i>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="sm:hidden bg-gray-900 text-white pt-[60px] px-[30px] py-4 space-y-4"
    >
      <nuxt-link to="/" class="block">Home</nuxt-link>
      <nuxt-link to="/about" class="block">About</nuxt-link>
      <nuxt-link to="/stories" class="block">Stories</nuxt-link>
      <nuxt-link to="/archives" class="block">Archives</nuxt-link>

      <!-- Mobile Profile Menu -->
      <div>
        <p class="font-semibold">Profile</p>
        <div class="ml-4 mt-2 space-y-2">
          <nuxt-link to="/profile" class="block hover:text-amber-400">Your Profile</nuxt-link>
          <a href="#" @click.prevent="logout" class="block hover:text-amber-400">Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
