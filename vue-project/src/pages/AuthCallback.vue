<template>
  <div class="flex items-center justify-center h-screen">
    <p>Authenticating with Google...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  const token = route.query.token as string;
  const error = route.query.error as string;

  if (error) {
    console.error("OAuth Error:", error);
    return router.push("/login");
  }

  if (token) {
    await userStore.handleGoogleCallback(token);
    router.push("/my-bookings"); // or dashboard, etc.
  } else {
    router.push("/login");
  }
});
</script>
