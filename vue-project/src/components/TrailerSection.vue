<template>
  <div class="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
    <p class="text-gray-300 font-medium text-lg max-w-[960px]">Trailers</p>

    <div class="relative mt-6">
      <BlurCirlcle top="-100px" right="-100px" />

      <iframe
        :key="youtubeEmbedUrl"
        :src="youtubeEmbedUrl"
        width="960"
        height="540"
        class="mx-auto max-w-full rounded-lg"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
    <div class="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
      <div v-for="trailer in dummyTrailers" :key="trailer.image">
        <div
          class="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-30 md:max-h-60 cursor-pointer"
          @click="updateTrailer(trailer)"
        >
          <img
            :src="trailer.image"
            alt="youtube images from video"
            class="rounded-lg w-full h-full sm:h-full object-cover brightness-75"
          />
          <PlayCircleIcon
            class="absolute top-1/2 left-1/2 w-5 md:w-8 md:h-12 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BlurCirlcle from "./BlurCirlcle.vue";
import { dummyTrailers } from "@/assets/assets";
import { extractYouTubeId } from "@/lib/extractYoutbeID";
import { PlayCircleIcon } from "lucide-vue-next";
import type { Trailer } from "@/lib/types";

const currentTrailer = ref(dummyTrailers[0]);
const updateTrailer = (trailer: Trailer) => {
  currentTrailer.value = trailer;
};

const youtubeEmbedUrl = computed(() => {
  const id = extractYouTubeId(currentTrailer.value.videoUrl);
  return `https://www.youtube.com/embed/${id}?controls=1`;
});
</script>
