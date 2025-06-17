<template>
  <div
    class="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66"
  >
    <img
      :src="movie?.backdrop_path"
      alt="Movie Poster"
      class="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
      @click="handleClick"
    />

    <p class="font-semibold mt-2 truncate">{{ movie?.title }}</p>

    <p class="text-sm text-gray-400 mt-2">
      {{ new Date(movie?.release_date).getFullYear() }}
      <span v-if="movie?.genres?.length">
        •
        {{
          movie.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(" | ")
        }}
      </span>
      <span v-if="movie?.runtime"> • {{ timeFormat(movie.runtime) }} mins</span>
    </p>

    <div class="flex items-center justify-between mt-4 pb-3">
      <button
        @click="handleClick"
        class="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
      >
        Buy Tickets
      </button>

      <p class="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
        <StarIcon class="w-4 h-4 text-primary fill-primary" />
        <span v-if="movie?.vote_average !== undefined">
          {{ movie.vote_average.toFixed(1) }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
import timeFormat from "@/lib/timeFormat";

const router = useRouter();

const props = defineProps<{
  movie: {
    _id: string;
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genres: { id: number; name: string }[];
    casts: any[]; // or define the cast shape properly if you want
    release_date: string;
    original_language: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
  };
}>();

const handleClick = () => {
  router.push(`/movies/${props.movie._id}`);
  scrollTo(0, 0);
};
</script>
