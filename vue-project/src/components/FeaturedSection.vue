<template>
  <div class="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden" v-if="showsDatas.length > 0">
    <div class="relative flex items-center justify-between pt-20 pb-10">
      <BlurCirlcle top="0" right="-80px" />
      <p class="text-gray-300 font-medium text-lg">Now Showing</p>
      <button
        @click="router.push('/movies')"
        class="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
      >
        View All
        <ArrowRight class="group-hover:translate-x-0.5 transition w-[18px] h-[18px]" />
      </button>
    </div>

    <div class="flex flex-wrap max-sm:justify-center gap-8 mt-8">
      <!-- Add movie cards or content here -->
      <MovieCard v-for="show in showsDatas.slice(0, 4)" :key="show._id" :movie="show" />
    </div>

    <!-- Additional content if needed -->
    <div class="flex justify-center mt-20">
      <button
        @click="handleShowMore"
        class="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
      >
        Show more
      </button>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-screen">
    <p class="text-gray-400 text-lg">No shows available at the moment.</p>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { useRouter } from "vue-router";
import BlurCirlcle from "./BlurCirlcle.vue";
import MovieCard from "./MovieCard.vue";
import { useUserStore } from "@/stores/user";
import { onMounted, computed } from "vue";

const router = useRouter();
const userStore = useUserStore();

const showsDatas = computed(() => userStore.shows);

const handleShowMore = () => {
  window.scrollTo(0, 0);
  router.push("/movies");
};

onMounted(async () => {
  await userStore.fetchShows();
});
</script>
