<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAdmin = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <Navbar v-if="!isAdmin" />

  <router-view />

  <Footer v-if="!isAdmin" />
</template>

<style scoped></style>
