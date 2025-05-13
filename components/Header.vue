<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <div>
    <nav class="fixed w-full h-[70px] flex justify-between mx-autoz-50">
      <h1 class="mt-[10px] text-3xl text-white ml-[30px]">StoryPlus</h1>

      <!-- Desktop menu -->
      <ul class="hidden sm:flex gap-[15px] mr-[50px] text-white mt-[20px]">
        <li><a href="">Home</a></li>
        <li><a href="">About</a></li>
        <li><a href="">Stories</a></li>
        <li><a href="">Archives</a></li>

        <!-- Profile Dropdown -->
        <li class="relative group">
          <a href="">Profile</a>
          <div
            class="absolute hidden group-hover:block bg-white text-black mt-2 right-0 w-[200px] shadow-md rounded"
          >
            <a href="#" class="block mb-2 p-3 hover:bg-amber-400 hover:w-full">Your Profile</a>
            <a href="#" class="block p-3 hover:bg-amber-400">Log out</a>
          </div>
        </li>
      </ul>

      <!-- Hamburger Icon (mobile only) -->
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
      <a href="#" class="block">Home</a>
      <a href="#" class="block">About</a>
      <a href="#" class="block">Stories</a>
      <a href="#" class="block">Archives</a>

      <!-- Profile (in mobile view) -->
      <div>
        <p class="font-semibold">Profile</p>
        <div class="ml-4 mt-2 space-y-2">
          <a href="#" class="block hover:text-amber-400">Your Profile</a>
          <a href="#" class="block hover:text-amber-400">Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>
