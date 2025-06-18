<template>
  <div v-if="!isLoading" class="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
    <BlurCirlcle top="100px" left="100px" />
    <div>
      <BlurCirlcle bottom="0" left="600px" />
    </div>
    <h1 class="fomt-semibold mb-4 text-lg">My Bookings</h1>
    <div v-for="(item, index) in bookings" :key="index">
      <div
        class="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
      >
        <div class="flex flex-col md:flex-row">
          <img
            :src="item.show.movie.poster_path"
            alt=""
            class="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
          />
          <div class="flex flex-col p-4">
            <p class="text-lg font-semibold">{{ item.show.movie.title }}</p>
            <p class="text-sm text-gray-400">{{ timeFormat(item.show.movie.runtime) }}</p>
            <p class="text-sm text-gray-400 mt-auto">
              {{ dateFormat(item.show.showDateTime) }}
            </p>
          </div>
        </div>

        <!-- second s=column -->
        <div class="flex flex-col md:items-end md:text-right justify-between p-4">
          <div class="flex items-center gap-4">
            <p class="text-2xl font-semibold mb-3">{{ currency }} {{ item.amount }}</p>
            <button
              v-if="item.isPaid"
              class="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer"
            >
              Pay Now
            </button>
          </div>
          <div class="text-sm">
            <p>
              <span class="text-gray-400">Total Tickets: &nbsp;</span>{{ item.bookedSeats.length }}
            </p>
            <p>
              <span class="text-gray-400">Total Number: &nbsp;</span
              >{{ item.bookedSeats.join(", ") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>
<script setup lang="ts">
import { dummyBookingData } from "@/assets/assets";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import Loading from "@/components/Loading.vue";
import { dateFormat } from "@/lib/dateFormat";
import timeFormat from "@/lib/timeFormat";
import { ref, watchEffect } from "vue";

const currency = import.meta.env.VITE_CURRENCY;

const bookings = ref();
const isLoading = ref(true);

watchEffect(() => {
  bookings.value = dummyBookingData;
  isLoading.value = false;
});
</script>
<style></style>
