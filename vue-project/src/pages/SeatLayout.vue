<template>
  <div v-if="shows && shows.movie">
    <div class="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <!-- available timing -->
      <div
        class="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30"
      >
        <p class="text-lg font-semibold px-6">Available Timing</p>

        <div class="mt-5 space-y-1">
          <div v-for="item in shows.dateTime[date]" :key="item.time">
            <div
              @click="updateSelectedTime(item)"
              :class="[
                'flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition',
                selectedTime?.time === item.time ? 'bg-primary text-white' : ' hover:bg-primary/20',
              ]"
            >
              <ClockIcon class="w-4 h-4" />
              <p class="text-sm">{{ isoTimeFormat(item.time) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- seats layouts -->
      <div class="relative flex flex-1 flex-col items-center max-md:mt-16">
        <BlurCirlcle top="-100px" left="-100px" />
        <BlurCirlcle bottom="0" right="0" />
        <h1 class="text-2xl font-semibold mb-4">Select your seat</h1>
        <img :src="assets.screenImage" alt="screen" />
        <p class="text-gray-400 text-sm mb-6">SCREEN SIZE</p>

        <div class="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div class="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            <!-- rows -->
            <SeatRow
              v-for="row in rows[0]"
              :key="row"
              :row="row"
              :count="count"
              :selected-seats="selectedSeats"
              :occupied-seats="occupiedSeats"
              @seat-click="handleSeatClick"
              class="flex gap-2 mt-2"
            />
          </div>

          <!-- other rows -->
          <div class="grid grid-cols-2 gap-11">
            <div v-for="(rowData, idx) in rows.slice(1)" :key="idx">
              <SeatRow
                v-for="row in rowData"
                :key="row"
                :row="row"
                :count="count"
                :selected-seats="selectedSeats"
                :occupied-seats="occupiedSeats"
                @seat-click="handleSeatClick"
                class="flex gap-2 mt-2"
              />
            </div>
          </div>

          <!-- button -->
          <button
            @click="bookedTickets"
            class="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
          >
            Proceed to Checkout
            <ArrowRightIcon class="w-4 h-4" :strokeWidth="3" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script setup lang="ts">
import { assets, dummyDateTimeData, dummyShowsData } from "@/assets/assets";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import SeatRow from "@/components/SeatRow.vue";
import Loading from "@/components/LoadingSpinner.vue";
import isoTimeFormat from "@/lib/isoTimeFormat";
import type { DateTimeData, Show, ShowTime } from "@/lib/types";
import { ClockIcon, ArrowRightIcon } from "lucide-vue-next";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import api from "@/lib/axios";
import { useUserStore } from "@/stores/user";

const { token, user, imageBaseUrl } = useUserStore();

const route = useRoute();
const router = useRouter();

const id = computed(() => route.params.id as string);
const date = computed(() => route.params.date as string);

const shows = ref<{ movie: Show; dateTime: DateTimeData } | null>(null);
const selectedTime = ref<ShowTime | null>(null);
const selectedSeats = ref<Array<string>>([]);
const occupiedSeats = ref<Array<string>>([]);
const updateSelectedTime = (data: ShowTime) => {
  selectedTime.value = data;
};

const rows = [
  ["A", "B"],
  ["C", "D"],
  ["E", "F"],
  ["G", "H"],
  ["I", "J"],
];

const count = 9;

const getShow = async () => {
  try {
    const { data } = await api.get(`/api/show/${id.value}`);
    if (data.success) {
      shows.value = data;
    } else {
      shows.value = null;
    }
  } catch (error) {
    console.error("Error fetching show:", error);
  }
};

function handleSeatClick(seatId: string) {
  if (!selectedTime.value) {
    return toast.warning("Please select time first");
  }
  if (!selectedSeats.value.includes(seatId) && selectedSeats.value.length > 4) {
    return toast.warning("You can only select 5 seats");
  }
  if (occupiedSeats.value.includes(seatId)) {
    return toast.warning("This seat is already booked");
  }

  if (selectedSeats.value.includes(seatId)) {
    selectedSeats.value = selectedSeats.value.filter((seat) => seat !== seatId);
  } else {
    selectedSeats.value.push(seatId);
  }
}

const getOccupiedSeats = async () => {
  try {
    const { data } = await api.get(`/api/booking/seats/${selectedTime.value?.showId}`);
    // console.log(data, "occupiedSeats");
    if (data.success) {
      occupiedSeats.value = data.occupiedSeats;
    } else {
      occupiedSeats.value = [];
    }
  } catch (error) {}
};

const bookedTickets = async () => {
  try {
    if (!user) return toast.error("Please login to proceed");
    if (!selectedTime.value || !selectedSeats.value.length)
      return toast.error("Please select a time first");

    const { data } = await api.post(
      "/api/booking/create",
      {
        showId: selectedTime.value.showId,
        selectedSeats: selectedSeats.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      window.location.href = data.url;
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};

watch(
  () => selectedTime.value,
  () => {
    if (selectedTime.value) {
      getOccupiedSeats();
    }
  }
);

watchEffect(async () => {
  await getShow();
  // getOccupiedSeats();
});
</script>
<style></style>
