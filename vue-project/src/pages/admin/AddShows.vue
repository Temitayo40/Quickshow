<template>
  <div v-if="nowPlayingMovies.length > 0">
    <TitleHead text1="Add" text2="Show" />
    <p class="mt-10 text-lg font-medium">Now Playing Movies</p>
    <div class="overflow-x-auto pb-4">
      <div class="group flex flex-wrap gap-4 mt-4 w-max">
        <div
          v-for="movie in nowPlayingMovies"
          :key="movie.id"
          @click="setSelectedMovie(movie.id)"
          className="relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300"
        >
          <div className="relative rounded-lg overflow-hidden">
            <img :src="movie.poster_path" alt=" " className="w-full object-cover brightness-90" />

            <div
              className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0"
            >
              <p className="flex items-center gap-1 text-gray-400">
                <StarIcon className="w-4 h-4 text-primary" :fill="'var(--color-primary)'" />
                {{ movie.vote_average.toFixed(1) }}
              </p>
              <p className="text-gray-300">{{ kConverter(movie.vote_count) }} Votes</p>
            </div>
          </div>
          <div
            v-if="selectedMovie === movie.id"
            class="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-primary rounded"
          >
            <CheckIcon class="h-6 w-6 text-white" :stroke-width="2.5" />
          </div>
          <p class="font-medium truncate">{{ movie.title }}</p>
          <p class="text-gray-400 text-sm">{{ movie.release_date }}</p>
        </div>
      </div>
    </div>

    <!-- show price input -->
    <div className="mt-8">
      <label className="block text-sm font-medium mb-2">Show Price</label>
      <div className=" inline-flex items-center gap-2 border border-gray-680 px-3 py-2 rounded-md">
        <p className="text-gray-400 text-sm">{{ currency }}</p>
        <input
          min="{}"
          type="number"
          :value="showPrice"
          :onChange="(e) => setShowPrice((e.target as HTMLInputElement)?.value)"
          placeholder="Enter show price"
          className="outline-none"
        />
      </div>
    </div>

    <!--  -->
    <div className="mt-6">
      <label className="block text-sm font-medium mb-2">Select Date and Time</label>
      <div
        className="inline-flex gap-5 border border-gray-600 p-1 pl-3
     rounded-1g"
      >
        <input
          type="datetime-local"
          value="(dateTimeInput)"
          :onChange="(e) =>
         setDateTimeInput((e.target as HTMLInputElement)?.value)"
          className="outline-none
         rounded-md"
        />
        <button
          @click="handleDateTimeAdd"
          className="bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
        >
          Add Time
        </button>
      </div>
    </div>

    <!-- display selected items  -->
    <div class="mt-6" v-if="Object.keys(dateTimeSelection).length > 0">
      <h2 class="mb-2">Selected Date-Time</h2>
      <ul class="space-y-3">
        <li v-for="[date, times] in Object.entries(dateTimeSelection)" :key="date">
          <div class="font-medium">{{ date }}</div>
          <div class="flex flex-wrap gap-2 mt-1 text-sm">
            <div
              class="border border-primary px-2 py-1 flex items-center rounded"
              v-for="time in times"
              :key="time"
            >
              <span>{{ time }}</span>
              <DeleteIcon
                class="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                :width="15"
                @click="handleRemoveTime(date, time)"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- show btn -->
    <button
      className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
    >
      Add Show
    </button>
  </div>
  <div v-else><Loading /></div>
</template>

<script setup lang="ts">
import { dummyShowsData } from "@/assets/assets";
import Loading from "@/components/Loading.vue";
import TitleHead from "@/components/admin/TitleHead.vue";
import { kConverter } from "@/lib/kConverter";
import type { Show } from "@/lib/types";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-vue-next";
import { reactive, ref } from "vue";
import { watchEffect } from "vue";
import { toast } from "vue3-toastify";

const currency = import.meta.env.VITE_CURRENCY;
const nowPlayingMovies = ref<Show[]>([]);
const selectedMovie = ref<number | null>(null);
const dateTimeSelection = reactive<Record<string, string[]>>({});
const dateTimeInput = ref("");
const showPrice = ref("");

const setSelectedMovie = (movie: number) => {
  selectedMovie.value = movie;
  // dateTimeSelection = {};
  dateTimeInput.value = "";
  showPrice.value = "";
};

const setShowPrice = (price: string) => {
  showPrice.value = price;
};
const setDateTimeInput = (dateTime: string) => {
  dateTimeInput.value = dateTime;
};
const fetchNowPlayingMovies = async () => {
  try {
    nowPlayingMovies.value = dummyShowsData;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

const handleDateTimeAdd = () => {
  if (!dateTimeInput.value) {
    toast.error("Please select a date and time.");
    return;
  }

  const [date, time] = dateTimeInput.value.split("T");
  if (!date || !time) {
    return;
  }
  const times = dateTimeSelection[date] || [];
  if (!times.includes(time)) {
    dateTimeSelection[date] = [...times, time];
  }
  dateTimeInput.value = "";
};
const handleRemoveTime = (date: string, time: string) => {
  const filteredTimes = dateTimeSelection[date]?.filter((t) => t !== time) || [];

  if (filteredTimes.length === 0) {
    delete dateTimeSelection[date];
  } else {
    dateTimeSelection[date] = filteredTimes;
  }
};

watchEffect(() => {
  fetchNowPlayingMovies();
});
</script>
<style></style>
