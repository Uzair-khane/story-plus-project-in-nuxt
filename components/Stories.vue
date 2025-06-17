<script setup>
import { ref, onMounted } from "vue";

const stories = ref([]);
const showForm = ref(false); 

// Form fields
const title = ref("");
const description = ref("");
const imageFile = ref();

const { $axios } = useNuxtApp();
const baseUrl = "https://story-backend-nu.vercel.app";

onMounted(() => {
  getStories();
});

async function getStories() {
  try {
    const res = await $axios.get(`${baseUrl}/get-stories?page=1&type=&story=`);
    stories.value = res.data.stories || [];
  } catch (err) {
    console.log("Data fetching error occurred:", err);
  }
}

async function submitStory() {
  if (!title.value || !description.value ) {
    alert("Please fill all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("image", imageFile.value);

  try {
    const res = await $axios.post(`${baseUrl}/create-blog`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      alert("Story created successfully!");
      getStories();
      title.value = "";
      description.value = "";
      imageFile.value = null;
      showForm.value = false;
    } else {
      alert("Failed to create story.");
    }
  } catch (err) {
    console.log("Error creating story:", err);
    alert("An error occurred.");
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
        @click="showForm = true"
        class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
      >
        Create Story
      </button>
    </div>

    <!-- MODAL FORM -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div class="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
        <!-- Cancel button -->
        <button
          @click="showForm = false"
          class="absolute top-3 right-3 text-red-500 font-bold text-lg"
        >
          X
        </button>

        <h2 class="text-xl font-semibold mb-4 text-center">Create a New Story</h2>

        <div class="space-y-4">
          <div>
            <label class="block font-medium">Title</label>
            <input v-model="title" type="text" class="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label class="block font-medium">Description</label>
            <textarea v-model="description" class="w-full border px-3 py-2 rounded"></textarea>
          </div>

          <div>
            <label class="block font-medium">Image</label>
            <input type="file" class="w-full border px-3 py-2 rounded" @change="e => imageFile.value = e.target.files[0]" />
          </div>

          <button
            @click="submitStory"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Submit Story
          </button>
        </div>
      </div>
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
            :src="story?.user?.profile_image || '/default-user.png'"
            alt="Profile"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p class="font-semibold text-sm">{{ story?.user?.name }}</p>
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
          <h2 class="font-bold text-lg truncate">
            {{ story.title || "Untitled" }}
          </h2>
          <p class="text-gray-600 text-sm truncate">
            {{ story.description || "No description" }}
          </p>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-end gap-3 px-4 py-2 text-gray-600 text-sm"
        >
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
