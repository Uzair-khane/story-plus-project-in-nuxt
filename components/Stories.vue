<script setup>
import { ref, onMounted } from "vue";

const stories = ref([]);

onMounted(() => {
  getStories();
});

const { $axios } = useNuxtApp();


async function getStories() {
  try {
    let res = await $axios.get(
      "https://story-backend-nu.vercel.app/get-stories?page=1&type=&story="
    );
  } catch (err) {
    console.log("data fetching error occure", err);
  }
}
</script>

<template>
  <div>
    <!-- main div  -->
    <div class="flex justify-between mx-auto mt-5">
      <h1
        class="text-2xl font-semibold underline decoration-orange-400 font-sans ml-[20px] underline-offset-4"
      >
        All stories
      </h1>
      <button
        class="bg-orange-400 text-white px-[18px] py-[8px] mr-[20px] rounded-[5px] hover:bg-orange-500"
      >
        Create Story
      </button>
    </div>

    <!-- stories list -->
    <div class="mt-5 px-5">
      <div v-if="stories.length === 0">No stories found.</div>
      <ul v-else>
        <li
          v-for="(story, index) in stories"
          :key="index"
          class="mb-4 p-4 border rounded shadow"
        >
          <h2 class="font-bold text-lg">{{ story.title }}</h2>
          <p>{{ story.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
