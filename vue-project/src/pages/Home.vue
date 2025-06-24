<template>
  <HeroSection />
  <FeaturedSection />
  <TrailerSection />
</template>
<script setup lang="ts">
import HeroSection from "@/components/HeroSection.vue";
import FeaturedSection from "@/components/FeaturedSection.vue";
import TrailerSection from "@/components/TrailerSection.vue";
import { watchEffect } from "vue";
import { useUserStore } from "@/stores/user";
const { fetchShows } = useUserStore();

watchEffect(() => {
  fetchShows();
});
</script>
<style lang=""></style>
