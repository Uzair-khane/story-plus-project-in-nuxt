// plugins/axios.ts
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: "https://story-backend-nu.vercel.app",
  });

  // Optional: Add token from localStorage (only runs on client)
  if (process.client) {
    const token = useCookie("token");
    if (token.value) {
      instance.defaults.headers.common["token"] = token.value;
    }
  }

  nuxtApp.provide("axios", instance);
});
