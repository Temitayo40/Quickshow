<template>
  <div v-if="isAdmin" class="flex flex-col h-screen">
    <AdminNavbar />
    <div class="flex">
      <AdminSidebar />
      <div class="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
  <div v-else><Loading /></div>
</template>
<script setup lang="ts">
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import Loading from "@/components/LoadingSpinner.vue";
import { useUserStore } from "@/stores/user";
import { computed, watchEffect } from "vue";

const userStore = useUserStore();
const { fetchIsAdmin } = userStore;

const isAdmin = computed(() => userStore.isAdmin);

watchEffect(() => {
  if (!isAdmin.value) {
    fetchIsAdmin();
  }
});
</script>
<style></style>
