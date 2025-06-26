<template>
  <div>
    <div class="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          :src="`${imageBaseUrl}${showState.movie.poster_path}`"
          alt="Movie Poster"
          class="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        <div class="relative flex flex-col gap-3">
          <BlurCirlcle top="-100px" left="-100px" />
          <p class="text-primary">ENGLISH</p>
          <h1 class="text-4xl font-semibold max-w-96 text-balance">
            {{ showState.movie.title }}
          </h1>
          <div class="flex items-center gap-2 text-gray-300">
            <StarIcon class="w-5 h-5 text-primary fill-primary" />
            {{ showState.movie.vote_average.toFixed(1) }} User Rating
          </div>
          <p class="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {{ showState.movie.overview }}
          </p>
          <p>
            {{ timeFormat(showState.movie.runtime) }} ·
            {{ showState.movie.genres.map((g) => g.name).join(", ") }} ·
            {{ showState.movie.release_date.split("-")[0] }}
          </p>

          <div class="flex items-center flex-wrap gap-4 mt-4">
            <button
              class="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              <PlayCircleIcon class="w-5 h-5" />
              Watch Trailer
            </button>
            <a
              href="#dateselect"
              class="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button
              class="rounded-md p-2 bg-gray-700 hover:bg-gray-600 transition active:scale-95"
              @click="handleFavorite"
            >
              <Heart
                :class="`w-5 h-5 ${isFavorite ? ' fill-primary text-primary' : ' text-gray-400'}`"
              />
            </button>
          </div>
        </div>
      </div>

      <p class="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div class="overflow-x-auto no_scrollbar mt-8 pb-4">
        <div class="flex items-center gap-4 w-max px-4">
          <div
            v-for="(cast, index) in showState.movie.casts.slice(0, 12)"
            :key="index"
            class="flex flex-col items-center text-center"
          >
            <img
              :src="`${imageBaseUrl}${cast.profile_path}`"
              alt=""
              class="rounded-full h-20 md:h-25 aspect-square object-cover"
            />
            <p>{{ cast.name }}</p>
          </div>
        </div>
      </div>

      <!-- date select -->
      <DateSelect :dateTime="showState.dateTime" :id="id" />

      <!-- other movies -->
      <p class="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div class="flex flex-wrap max-sm:justify-center gap-8">
        <MovieCard v-for="(movie, index) in shows.slice(0, 4)" :movie="movie" :key="movie._id" />
      </div>

      <div class="flex justify-center mt-20">
        <button
          @click="navigateToMovies"
          class="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show more
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watchEffect, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-vue-next";
import DateSelect from "@/components/DateSelect.vue";
import MovieCard from "@/components/MovieCard.vue";
import { toast } from "vue3-toastify";
import api from "@/lib/axios";
import { useUserStore } from "@/stores/user";
import timeFormat from "@/lib/timeFormat";

const { shows, token, user, fetchFavoritesMovies, imageBaseUrl } = useUserStore();

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);

const favorites = computed(() => useUserStore().favorites);
const isFavorite = computed(() => favorites.value.find((movie) => movie.tmdbId === id.value));

const showState = reactive({
  movie: {
    title: "",
    overview: "",
    poster_path: "",
    vote_average: 0,
    runtime: 0,
    genres: [],
    release_date: "",
    casts: [],
  },
  movies: [],
  dateTime: [],
});

const getShow = async () => {
  try {
    const { data } = await api.get(`/api/show/${id.value}`);
    // console.log(showState, "showstaes");
    if (data.success) {
      Object.assign(showState, data);
    }
  } catch (error) {
    console.error("Failed to fetch show:", error);
    toast.error("Error loading movie");
  }
};

const handleFavorite = async () => {
  try {
    if (!user) return toast.error("Please login to proceed");
    const { data } = await api.post(
      "/api/user/update-favorite",
      { movieId: id.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      await fetchFavoritesMovies();
      toast.success(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Could not update favorites");
  }
};

const navigateToMovies = () => {
  router.push("/movies");
  window.scrollTo(0, 0);
};

watch(
  () => id.value,
  async () => {
    await getShow();
  },
  { immediate: true }
);
</script>
