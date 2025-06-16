<script setup>
import { ref, onMounted } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const profileImage = ref("");

// Load data from localStorage when page loads
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    name.value = user.name || "";
    email.value = user.email || "";
    password.value = user.password || "";
    confirmPassword.value = user.password || "";
    profileImage.value = user.profileImage || "";
  }
});

// Save updated data
const updateProfile = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  const updatedUser = {
    name: name.value,
    email: email.value,
    password: password.value,
    profileImage: profileImage.value,
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));
  alert("Profile updated successfully!");
};

// Handle image file change
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    profileImage.value = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-6 mt-10 bg-white shadow-lg rounded">
    <h2 class="text-2xl font-bold mb-4 text-center">Your Profile</h2>

    <!-- Profile Image Preview -->
    <div class="mb-4 text-center">
      <img
        v-if="profileImage"
        :src="profileImage"
        alt="Profile"
        class="w-34 h-34 rounded-full mx-auto object-cover"
      />
    </div>

    <!-- Profile Form -->
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Name</label>
        <input v-model="name" type="text" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input v-model="email" type="email" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Password</label>
        <input v-model="password" type="password" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Confirm Password</label>
        <input v-model="confirmPassword" type="password" class="w-full border p-2 rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Profile Image</label>
        <input type="file" accept="image/*" @change="handleImageUpload" />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Update Profile
      </button>
    </form>
  </div>
</template>

