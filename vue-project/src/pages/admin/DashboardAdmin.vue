<template>
  <div v-if="!loading">
    <TitleHead text1="Admin" text2="Dashboard" />

    <div class="relative flex flex-wrap gap-4 mt-6">
      <BlurCirlcle top="-100px" left="0" />

      <div class="flex flex-wrap gap-4 w-full">
        <div
          v-for="(card, index) in dashboardCards"
          :key="index"
          class="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
        >
          <div>
            <h1 class="text-sm">{{ card.title }}</h1>
            <p class="text-xl font-medium mt-1">{{ card.value }}</p>
          </div>
          <component :is="card.icon" class="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Active Shows -->
    <p class="mt-10 text-lg font-medium">Active Shows</p>
    <div class="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
      <BlurCirlcle top="100px" left="-10%" />

      <div
        v-for="show in dashboardData.activeShows"
        :key="show._id"
        class="w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
      >
        <img :src="show.movie.poster_path" alt="" class="h-60s w-full object-cover" />
        <p class="font-medium p-2 truncate">{{ show.movie.title }}</p>
        <div class="flex items-center justify-between px-2">
          <p class="text-lg font-medium">{{ currency }} {{ show.showPrice }}</p>
          <p class="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
            <StarIcon class="w-4 h-4 text-primary fill-primary" />
            {{ show.movie.vote_average.toFixed(1) }}
          </p>
        </div>
        <p class="px-2 pt-2 text-sm text-gray-500">
          {{ dateFormat(show.showDateTime) }}
        </p>
      </div>
    </div>
  </div>
  <div v-else><Loading /></div>
</template>

<script setup lang="ts">
import { dummyDashboardData } from "@/assets/assets";
import BlurCirlcle from "@/components/BlurCirlcle.vue";
import Loading from "@/components/Loading.vue";
import TitleHead from "@/components/admin/TitleHead.vue";
import { dateFormat } from "@/lib/dateFormat";
import type { DashboardData } from "@/lib/types";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-vue-next";
import { reactive, ref, watchEffect } from "vue";

const currency = import.meta.env.VITE_CURRENCY;

const dashboardData: DashboardData = reactive({
  totalBookings: 0,
  totalRevenue: 0,
  activeShows: [],
  totalUser: 0,
});
const loading = ref(true);

watchEffect(() => {
  dashboardData.totalBookings = dummyDashboardData.totalBookings;
  dashboardData.totalRevenue = dummyDashboardData.totalRevenue;
  dashboardData.activeShows = dummyDashboardData.activeShows;
  dashboardData.totalUser = dummyDashboardData.totalUser;

  loading.value = false;
});

const dashboardCards = [
  { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
  {
    title: "Total Revenue",
    value: currency + dashboardData.totalRevenue || "0",
    icon: CircleDollarSignIcon,
  },
  { title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
  {
    title: "Total Users",
    value: dashboardData.totalUser || "0",
    icon: UsersIcon,
  },
];
</script>
<style></style>
