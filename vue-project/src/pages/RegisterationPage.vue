<template>
  <div class="min-h-screen flex items-center justify-center bg-[#09090b] text-white px-4">
    <div class="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/10">
      <h2 class="text-2xl font-semibold text-center mb-6">Create an Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="w-full input bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
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
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full input bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />

        <button
          :disabled="loading"
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center"
        >
          {{ loading ? "Registering..." : "Register" }}
          <span v-if="loading" class="loader ml-2"></span>
        </button>
      </form>

      <div class="my-6 text-center text-gray-500">or</div>

      <button
        @click="registerWithGoogle"
        class="w-full border border-white/10 py-2 rounded-lg flex items-center justify-center gap-3 bg-[#141414] hover:bg-white/5 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="h-5 w-5" />
        <span class="text-white">Continue with Google</span>
      </button>

      <p class="text-sm text-center mt-6 text-gray-400">
        Already have an account?
        <RouterLink to="/login" class="text-primary hover:underline"> Login </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useAuthStore } from "../store/aut
import { useUserStore } from "@/stores/user";
import { toast } from "vue3-toastify";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const router = useRouter();
const authStore = useUserStore();

const handleRegister = async () => {
  loading.value = true;
  if (password.value !== confirmPassword.value) {
    toast.warning("Passwords don't match.");
    loading.value = false;
    return;
  }

  const success = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  loading.value = false;
  if (success) {
    router.push("/");
  }
};

const registerWithGoogle = () => {
  window.location.href = import.meta.env.VITE_API_URL + "/auth/google/callback";
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
