<template>
  <div
    class="flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen text-white"
  >
    <!-- 🔥 Marvel Logo -->
    <Motion
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ delay: 0.2, duration: 0.6 }"
    >
      <img :src="assets.marvelLogo" alt="Marvel Logo" class="max-h-11 lg:h-11 mt-20" />
    </Motion>

    <!-- 🎬 Hero Title -->
    <Motion
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ delay: 0.4, duration: 0.7 }"
    >
      <h1 class="text-5xl md:text-[70px] md:leading-[1.1] font-semibold max-w-[40rem]">
        Guardians <br />
        of the Galaxy
      </h1>
    </Motion>

    <!-- 🎭 Genre Info -->
    <Motion
      :initial="{ opacity: 0, x: -20 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{ delay: 0.6, duration: 0.6 }"
    >
      <div
        class="flex items-start sm:items-center flex-col sm:flex-row justify-start gap-4 text-gray-300 text-sm"
      >
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
    </Motion>

    <!-- 📝 Description -->
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 0.8, duration: 0.8 }"
    >
      <p class="max-w-md text-gray-300">
        In a post-apocalyptic world where cities ride on wheels and consume each other to survive,
        two people meet in London and try to stop a conspiracy.
      </p>
    </Motion>

    <!-- 🎯 CTA Button -->
    <Motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ delay: 1.1, duration: 0.5 }"
    >
      <button
        @click="router.push('/movies')"
        class="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
      >
        Explore Movies
        <ArrowRight class="w-5 h-5" />
      </button>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { assets } from "@/assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { Motion } from "@motionone/vue";
const router = useRouter();
// const MotionDiv = motion.div;
</script>
