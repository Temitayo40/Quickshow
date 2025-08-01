<template>
  <div v-if="!isLoading">
    <TitleHead text1="List" text2="Bookings" />
    <div className="max-w-4xl mt-6 overflow-x-auto">
      <table
        className="w-full border-collapse rounded-md overflow-hidden text-nowrap"
        v-if="bookings.length > 0"
      >
        <thead>
          <tr className="bg-primary/20 text-left text-white">
            <th className="p-2 font-medium pl-5">User Name</th>
            <th className="p-2 font-medium">Movie Name</th>
            <th className="p-2 font-medium">Show Time</th>
            <th className="p-2 font-medium">Seats</th>
            <th className="p-2 font-medium">Amount</th>
          </tr>
        </thead>

        <tbody className="text-sm font-light">
          <tr
            v-for="(item, index) in bookings"
            :key="index"
            className="border-b border-primary/20 bg-primary/5 even:bg-primary/18"
          >
            <td className="p-2 min-w-45 pl-5">{{ item.user.name }}</td>
            <td className="p-2">7 >{{ item.show.movie.title }}</td>
            <td className="p-2">{{ dateFormat(item.show.showDateTime) }}</td>
            <td className="p-2">
              {{
                Object.keys(item.bookedSeats as string[])
                  .map((seat: string) => item.bookedSeats[seat as any])
                  .join(", ")
              }}
            </td>
            <td class="p:2">{{ currency }} {{ item.amount }}</td>
          </tr>
        </tbody>
      </table>
      <h2 v-else>Empty Bookings</h2>
    </div>
  </div>
  <div v-else><Loading /></div>
</template>
<script setup lang="ts">
import Loading from "@/components/LoadingSpinner.vue";
import TitleHead from "@/components/admin/TitleHead.vue";
import { dateFormat } from "@/lib/dateFormat";
import type { Booking } from "@/lib/types";
import { ref, watchEffect } from "vue";
import api from "@/lib/axios";
import { useUserStore } from "@/stores/user";
import { toast } from "vue3-toastify";

const currency = import.meta.env.VITE_CURRENCY;

const bookings = ref<Booking[]>([]);
const isLoading = ref(true);

const { token, user } = useUserStore();
const getAllBookings = async () => {
  try {
    const { data } = await api.get("/api/admin/all-bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    bookings.value = data.bookings;
  } catch (error) {
    toast.error("Failed to fetch bookings");
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  if (user) {
    getAllBookings();
  }
});
</script>
<style></style>
