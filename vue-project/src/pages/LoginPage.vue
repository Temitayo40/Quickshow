<template>
  <!-- 🔲 Full-screen container -->
  <div class="relative w-full h-screen overflow-hidden text-white">
    <!-- 🎬 Video Background -->
    <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover z-0">
      <source src="/videos/cinema-bg2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- 🧥 Dark Overlay for readability -->
    <div class="absolute inset-0 bg-black/60 z-10"></div>

    <!-- 🧾 Login Form -->
    <div class="relative z-20 min-h-screen flex items-center justify-center px-4">
      <div
        class="bg-transparent backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10"
      >
        <h2 class="text-2xl font-semibold text-center mb-6">
          Login to <span class="text-primary">QuickShow</span>
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full input bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full input bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />

          <button
            :disabled="!email || !password || loading"
            type="submit"
            class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition duration-200 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {{ loading ? "Submitting..." : "Login" }}
            <span v-if="loading" class="loader ml-2"></span>
          </button>
        </form>

        <div class="my-6 text-center text-gray-400">or</div>

        <button
          @click="loginWithGoogle"
          class="w-full border border-white/10 py-2 rounded-lg flex items-center justify-center gap-3 bg-[#141414] hover:bg-white/5 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="h-5 w-5" />
          <span class="text-white">Continue with Google</span>
        </button>

        <p class="text-sm text-center mt-6 text-gray-400">
          Don't have an account?
          <RouterLink to="/register" class="text-primary hover:underline"> Register </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const authStore = useUserStore();

const email = ref("");
const password = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    if (authStore.user) {
      router.push("/");
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    password.value = "";
    email.value = "";
    loading.value = false;
  }
};

const loginWithGoogle = () => {
  window.location.href = "https://quickshow-m12s.onrender.com/auth/google";
};
</script>
<style scoped>
.input {
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  transition: border 0.2s, box-shadow 0.2s;
}

.loader {
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
