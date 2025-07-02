<script setup lang="ts">
import { assets } from "@/assets/assets";
import { useUserStore } from "@/stores/user";
import { MenuIcon, XIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";

const store = useUserStore();
const user = computed(() => store.user);
const { favorites, token } = storeToRefs(store);

const isOpen = ref(false);
const toggleIcon = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);

const toggleUser = () => {
  toggleIcon.value = !toggleIcon.value;
  console.log("meeeee");
};

const toggleUserRole = async (role: string) => {
  toggleIcon.value = false;
  await store.updateUserRole(role);
};

const handleLinkClick = () => {
  window.scrollTo(0, 0);
  isOpen.value = false;
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    toggleIcon.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  if (user && user.value?.imageUrl) console.log(user.value.imageUrl);
  console.log(user.value?.role, "isAdmn here");
});

onMounted(async () => {
  if (user && token) {
    await store.fetchFavoritesMovies();
  }
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
      <router-link to="/" @click="handleLinkClick">Releases</router-link>
      <router-link to="/favorite" v-if="favorites.length > 0" @click="handleLinkClick"
        >Favorites</router-link
      >
    </div>

    <!-- Search + Login -->
    <div class="flex items-center gap-8">
      <!-- <SearchIcon class="max-md:hidden w-6 h-6 cursor-pointer" /> -->
      <div class="md:inline-block">
        <router-link
          to="/login"
          v-if="!user"
          class="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Login
        </router-link>
        <div v-if="user">
          <div class="relative ml-3" ref="userMenuRef">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 border-3 border-red-700 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="toggleUser"
              >
                <img
                  class="sm:size-10 size-6 rounded-full object-fit"
                  :src="
                    user.imageUrl
                      ? user.imageUrl
                      : 'https://acdsinc.org/wp-content/uploads/2015/12/dummy-profile-pic.png'
                  "
                  alt=""
                />
              </button>
            </div>

            <div
              v-if="toggleIcon"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <button
                class="block px-4 py-2 text-sm text-gray-800 hover:text-red-700 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-md cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                @click="() => toggleUserRole(user?.role === 'admin' ? 'viewer' : 'admin')"
              >
                Become {{ user?.role === "admin" ? "a" : "an" }}
                <b>{{ user?.role === "admin" ? "Viewer" : "Admin" }}</b>
              </button>

              <router-link
                to="/my-bookings"
                class="block px-4 py-2 text-sm text-gray-800 hover:text-red-700 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-md cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
                @click="toggleUser"
              >
                My Bookings
              </router-link>

              <router-link
                v-if="(user.role = 'admin')"
                to="/admin"
                class="block px-4 py-2 text-sm text-gray-800 hover:text-red-700 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-md cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
                @click="toggleUser"
              >
                Admin
              </router-link>

              <a
                href="/"
                @click="store.logout"
                class="block px-4 py-2 text-sm text-gray-800 hover:text-red-700 border-b border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded-md cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                @auxclick="toggleUser"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hamburger Icon -->
    <MenuIcon class="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" @click="toggleMenu" />
  </div>
</template>
