<template>
  <div v-if="shows && shows.movie">
    <div class="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <!-- available timing -->
      <div
        class="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30"
      >
        <p class="text-lg font-semibold px-6">Available Timing</p>

        <div class="mt-5 space-y-1">
          <div v-for="item in shows.dateTime[date]">
            <div
              @click="updateSelectedTime(item)"
              :key="item.time"
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
      </div>
    </div>
  </div>

  <!-- <div :key="row" class="flex gap-2 mt-2">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <div v-for="(_, i) in Array.from({ length: count })">
        const seatId =`${row}${i + 1}` return (
        <button
          key="{seatId}"
          onclick="handleSeatClick(seatId)"
          className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}
        >{seatId}</button>
        )
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { assets, dummyDateTimeData, dummyShowsData } from "@/assets/assets";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import isoTimeFormat from "@/lib/isoTimeFormat";
import { ClockIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { id, date } = route.params;
const shows = ref(null);
const selectedTime = ref(null);
const updateSelectedTime = (data) => {
  selectedTime.value = data;
};

const getShow = (id) => {
  const show = dummyShowsData.find((show) => String(show._id) === id);
  if (show) {
    shows.value = {
      movie: show,
      dateTime: dummyDateTimeData,
    };
  } else {
    shows.value = null;
  }
};

// const renderSeats = (row, count = 9) => (
//   <div :key="row" className="flex gap-2 mt-2">
//     <div class="flex flex-wrap items-center justify-center gap-2">
//       <div v-for="(_, i) in Array.from({ length: count })">
//         const seatId =`${row}${i + 1}` return (
//         <button
//           key="{seatId}"
//           onclick="handleSeatClick(seatId)"
//           className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}
// >{seatId}</button>
//         )
//       </div>
//     </div>
//   </div>
// );

onMounted(() => {
  getShow(route.params.id);
});
</script>
<style></style>
