<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAdmin = computed(() => route.path.startsWith("/admin"));
const isLoginPage = computed(() => route.path === "/login");
const isRegisterPage = computed(() => route.path === "/register");
const showLayout = computed(() => !isAdmin.value && !isLoginPage.value && !isRegisterPage.value);
</script>

<template>
  <Navbar v-if="showLayout" />

  <router-view />

  <Footer v-if="showLayout" />
</template>
