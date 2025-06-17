<template>
  <div
    class="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen"
  >
    <img :src="assets.marvelLogo" alt="Marvel Logo" class="max-h-11 lg:h-11 mt-20" />

    <h1 class="text-5xl md:text-[70px] md:leading-[1.1] font-semibold max-w-[40rem]">
      Guardians <br />
      of the Galaxy
    </h1>

    <div class="flex items-center gap-4 text-gray-300 text-sm">
      <span>Action | Adventure | Sci-Fi</span>

      <div class="flex items-center gap-1">
        <CalendarIcon class="w-[18px] h-[18px]" />
        <span>2018</span>
      </div>

      <div class="flex items-center gap-1">
        <ClockIcon class="w-[18px] h-[18px]" />
        <span>2h 8m</span>
      </div>
    </div>

    <p class="max-w-md text-gray-300">
      In a post-apocalyptic world where citie rides o wheels and consume each other to survive, two
      people meet in london and try to stop a conspiract.
    </p>

    <button
      @click="router.push('/movies')"
      class="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
    >
      Explore Movies
      <ArrowRight class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { assets } from "@/assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
const router = useRouter();
</script>
