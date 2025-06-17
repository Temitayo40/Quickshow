<template>
  <div v-if="showState && showState.movie">
    <div class="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div class="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          :src="showState.movie.poster_path"
          alt="Movie Poster"
          class="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        <div class="relative flex flex-col gap-3">
          <BlurCirlcle top="-100px" left="-100px" />
          <p class="text-primary">ENGLISH</p>
          <h1 class="text-4xl font-semibold max-w-96 text-balance">{{ showState.movie.title }}</h1>
          <div class="flex items-center gap-2 text-gray-300">
            <StarIcon class="w-5 h-5 text-primary fill-primary" />
            {{ showState.movie.vote_average.toFixed(1) }} User Rating
          </div>
          <p class="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {{ showState.movie.overview }}
          </p>
          <p>
            {{ timeFormat(showState.movie.runtime) }}
            ·
            {{ showState.movie.genres.map((genre) => genre.name).join(", ") }}
            ·
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
            <button class="rounded-md p-2 bg-gray-700 hover:bg-gray-600 transition active:scale-95">
              <Heart class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <p class="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div class="overflow-x-auto no_scrollbar mt-8 pb-4">
        <div class="flex items-center gap-4 w-max px-4">
          <div v-for="(cast, index) in showState.movie.casts.slice(0, 12)">
            <div :key="index" class="flex flex-col items-center text-center">
              <img
                :src="cast.profile_path"
                alt=""
                class="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p>{{ cast.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- date select compoenent -->
      <DateSelect :dateTime="showState.dateTime" :id="id" />

      <!-- other movies -->
      <p class="text-lg font-medium mt-20 mb-8">You May Also Like</p>
      <div class="flex flex-wrap max-sm:justify-center gap-8">
        <div v-for="(movie, index) in dummyShowsData.slice(0, 4)">
          <MovieCard :movie="movie" :key="index" />
        </div>
      </div>
      <div class="flex justify-center mt-20">
        <button
          @click="navigateToMovies()"
          class="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
        >
          Show more
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-20 text-gray-400"><Loading /></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-vue-next";
import { dummyDateTimeData, dummyShowsData } from "@/assets/assets";
import timeFormat from "@/lib/timeFormat";
import DateSelect from "@/components/DateSelect.vue";
import MovieCard from "@/components/MovieCard.vue";
import Loading from "@/components/Loading.vue";

const route = useRoute();
const router = useRouter();
const showState = ref(null);
const id = route.params.id;

// const getShow = async () => {
//   const id = route.params.id;
//   const show = dummyShowsData.find((show) => show._id == id);
//   if (show) {
//     showState.value = {
//       movie: show,
//       dateTime: dummyDateTimeData,
//     };
//   } else {
//     showState.value = null;
//   }
// };
// watch(
//   () => route.params.id,
//   () => {
//     showState.value = null;
//     getShow();
//   },
//   { immediate: true }
// );

const getShow = (id) => {
  const show = dummyShowsData.find((show) => String(show._id) === id);
  if (show) {
    showState.value = {
      movie: show,
      dateTime: dummyDateTimeData,
    };
  } else {
    showState.value = null;
  }
};

onMounted(() => {
  getShow(route.params.id);
});

// watchEffect(() => {
//   getShow(route.params.id);
// });

watch(
  () => id,
  (newId, oldId) => {
    console.log(`Route ID changed from ${oldId} to ${newId}`);
    getShow(newId);
  }
);
const navigateToMovies = () => {
  router.push("/movies");
  window.scrollTo(0, 0);
};
</script>
