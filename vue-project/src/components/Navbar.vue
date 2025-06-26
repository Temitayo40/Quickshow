<script setup lang="ts">
import { assets } from "@/assets/assets";
import { useUserStore } from "@/stores/user";
import { MenuIcon, SearchIcon, XIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const store = useUserStore();
const { favorites, user } = storeToRefs(store);
const isOpen = ref(false);

const handleLinkClick = () => {
  window.scrollTo(0, 0);
  isOpen.value = false;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

onMounted(async () => {
  await store.fetchFavoritesMovies();
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5"
  >
    <router-link to="/" class="max-md:flex-1">
      <img :src="assets.logo" alt="" class="w-36 h-auto" />
    </router-link>

    <div
      :class="[
        'z-50 flex flex-col md:flex-row items-center gap-8 py-3 overflow-hidden transition-[width] duration-300',
        'max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg max-md:justify-center max-md:h-screen',
        'min-md:px-8 min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20',
        isOpen ? 'max-md:w-full' : 'max-md:w-0',
      ]"
    >
      <!-- Close Icon -->
      <XIcon class="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" @click="toggleMenu" />

      <!-- Nav Links -->
      <router-link to="/" @click="handleLinkClick">Home</router-link>
      <router-link to="/movies" @click="handleLinkClick">Movies</router-link>
      <router-link to="/" @click="handleLinkClick">Theaters</router-link>
      <router-link to="/" @click="handleLinkClick">Releases</router-link>
      <router-link to="/favorite" v-if="favorites.length > 0" @click="handleLinkClick"
        >Favorites</router-link
      >
    </div>

    <!-- Search + Login -->
    <div class="flex items-center gap-8">
      <SearchIcon class="max-md:hidden w-6 h-6 cursor-pointer" />
      <router-link to="/login" class="hidden md:inline-block">
        <button
          v-if="!user"
          class="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Login
        </button>
        <div v-if="user">
          <button @click="store.logout" class="text-primary hover:underline">Logout</button>
        </div>
      </router-link>
    </div>

    <!-- Hamburger Icon -->
    <MenuIcon class="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" @click="toggleMenu" />
  </div>
</template>
