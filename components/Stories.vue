<script setup>
import { ref, onMounted } from "vue";

const stories = ref([]);

onMounted(() => {
  getStories();
});

const { $axios } = useNuxtApp();
const baseUrl = "https://story-backend-nu.vercel.app"
async function getStories() {
  try {
    const res = await $axios.get(
      "https://story-backend-nu.vercel.app/get-stories?page=1&type=&story="
    );
    stories.value = res.data.stories || [];
  } catch (err) {
    console.log("Data fetching error occurred:", err);
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mx-auto mt-5 px-5">
      <h1 class="text-2xl font-semibold underline decoration-orange-400 underline-offset-4">
        All Stories
      </h1>
      <button
        class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
      >
        Create Story
      </button>
    </div>

    <!-- Story Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 px-5 mt-6">
      <div
        v-for="(story, index) in stories"
        :key="index"
        class="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      >
        <!-- Header -->
        <div class="flex items-center gap-3 p-3">
          <img
            :src="story?.user?.profile_image"
            alt="Profile"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-sm">{{ story?.user?.name }}</p>
            <p class="text-xs text-gray-500">{{ }}</p>
          </div>
        </div>

        <!-- Image -->
        <div class="w-full h-[180px] bg-gray-100">
          <img
            :src="story.image"
            alt="Story"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="p-4">
          <h2 class="font-bold text-lg truncate">{{ story.title || 'Untitled' }}</h2>
          <p class="text-gray-600 text-sm truncate">{{ story.description || 'No description' }}</p>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-4 py-2 text-gray-600 text-sm">
          <div class="flex items-center gap-1">
            <i class="fas fa-lock"></i>
          </div>
          <div class="flex items-center gap-1">
            <i class="fas fa-thumbs-up"></i>
            <span>{{ story.likes || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
