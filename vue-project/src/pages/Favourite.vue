<template>
  <div v-if="favoritesData.length > 0">
    <div class="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCirlcle top="150px" left="0" />
      <BlurCirlcle bottom="50px" right="50px" />
      <h1 class="text-lg font-medium my-4">Your Favorite Movies</h1>
      <div class="flex flex-wrap max-sm:justify-center gap-8">
        <div v-for="movie in favoritesData" :key="movie?._id">
          <MovieCard :movie="movie" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold text-center">No movies available</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
// import { useRoute } from "vue-router";
import { dummyShowsData } from "@/assets/assets";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import MovieCard from "@/components/MovieCard.vue";
import type { Show } from "@/lib/types";
import { useUserStore } from "@/stores/user";
const { fetchFavoritesMovies, favorites } = useUserStore();

// const route = useRoute();
const favoritesData = ref<Show[]>(favorites as Show[]);

watchEffect(() => {
  fetchFavoritesMovies();
});
</script>

<style></style>
