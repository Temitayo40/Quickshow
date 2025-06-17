<template>
  <footer class="px-6 pt-8 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
    <div
      class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14"
    >
      <div class="md:max-w-96">
        <img class="w-36 h-auto" :src="assets.logo" alt="logo" />
        <p class="mt-6 text-sm">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        <div class="flex items-center gap-2 mt-4">
          <img
            :src="assets.googlePlay"
            alt="google play"
            class="h-10 w-auto border border-white rounded"
          />
          <img
            :src="assets.appStore"
            alt="app store"
            class="h-10 w-auto border border-white rounded"
          />
        </div>
      </div>
      <div class="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
        <div>
          <h2 class="font-semibold mb-5">Company</h2>
          <ul class="text-sm space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div>
          <h2 class="font-semibold mb-5">Get in touch</h2>
          <div class="text-sm space-y-2">
            <p>+1-234-567-890</p>
            <p>contact@example.com</p>
          </div>
        </div>
      </div>
    </div>
    <p class="pt-4 text-center text-sm pb-5">
      Copyright {{ currentYear }} © FreeRealm. All Right Reserved.
    </p>
  </footer>
</template>

<script setup>
import { assets } from "@/assets/assets";
const currentYear = new Date().getFullYear();
</script>
