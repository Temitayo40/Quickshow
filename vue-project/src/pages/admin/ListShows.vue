<template>
  <div v-if="!loading">
    <TitleHead text1="List" text2="Show" />

    <div className="max-w-4xl mt-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
        <thead>
          <tr className="bg-primary/20 text-left text-white">
            <th className="p-2 font-medium pl-5">Movie Name</th>
            <th className="p-2 font-medium">Show Time</th>
            <th className="p-2 font-medium">Total Bookings</th>
            <th className="p-2 font-medium">Earnings</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light">
          <tr
            v-for="(show, index) in shows"
            :key="index"
            className="border-b border-primary/10 bg-primary/5 even:bg-primary/18"
          >
            <td className="p-2 min-w-45 pl-5">{{ show.movie.title }}</td>
            <td className="p-2">{{ show.showDateTime }}</td>

            <td className="p-2">7 {{ Object.keys(show.occupiedSeats).length }}</td>

            <td className="p-2">
              {{ currency }} {{ Object.keys(show.occupiedSeats).length * show.showPrice }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else><Loading /></div>
</template>
<script setup lang="ts">
import { dummyShowsData } from "@/assets/assets";
import Loading from "@/components/Loading.vue";
import TitleHead from "@/components/admin/TitleHead.vue";
import type { Show } from "@/lib/types";
import { ref, watchEffect } from "vue";

const currency = import.meta.env.VITE_CURRENCY;
interface ShowNew {
  movie: Show;
  showDateTime: string;
  showPrice: number;
  occupiedSeats: {
    [seat: string]: string;
  };
}

const shows = ref<ShowNew[]>([]);
const loading = ref(false);

const getAllShows = async () => {
  try {
    shows.value = [
      {
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00Z",
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3",
        },
      },
    ];

    loading.value = false;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

watchEffect(() => {
  getAllShows();
});
</script>
<style></style>
