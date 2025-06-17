<template>
  <div>
    <h2>Welcome, {{ user.username }}!</h2>
    <p>Email: {{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem("loggedInUser") || "{}"));

const logout = () => {
  localStorage.removeItem("loggedInUser");
  router.push("/login");
};
</script>
