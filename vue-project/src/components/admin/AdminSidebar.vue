<template>
  <div
    className="h-[calc(1@@vh-64px)] md:flex flex-col items-center pt-8
      max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm"
  >
    <img :src="user.imageUrl" alt="" class="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto" />
    <p class="mt-2 text-base max-md:hidden">{{ user.firstName }} {{ user.lastName }}</p>

    <div class="w-full">
      <RouterLink
        v-for="(link, index) in adminNavlinks"
        :key="index"
        :to="link.path"
        custom
        v-slot="{ href, isExactActive, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400"
          :class="{ 'bg-primary/15 text-primary group': isExactActive }"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <p class="max-md:hidden">{{ link.name }}</p>
          <span
            class="w-1.5 h-10 rounded-r absolute right-0"
            :class="{ 'bg-primary': isExactActive }"
          />
        </a>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { assets } from "@/assets/assets";
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from "lucide-vue-next";
const user = {
  firstName: "Admin",
  lastName: "User",
  imageUrl: assets.profile,
};

const adminNavlinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
  { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
  { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
  { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
];
</script>
<style></style>
