<template>
  <AdminNavbar />
  <div class="flex">
    <AdminSidebar />
    <div class="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
</script>
<style></style>
