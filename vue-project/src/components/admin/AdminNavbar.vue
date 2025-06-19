<template>
  <div
    className="flex items-center justify-between px-6
    md:px-10 h-16 border-b border-gray-300/30"
  >
    <router-link to="/"> <img :src="assets.logo" alt="logo" /> </router-link>
  </div>
</template>
<script setup lang="ts">
import { assets } from "@/assets/assets";
</script>
<style></style>
