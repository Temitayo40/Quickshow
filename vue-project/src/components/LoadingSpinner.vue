<template>
  <div class="flex justify-center items-center h-[80vh]">
    <div class="animate-spin rounded-full h-14 w-14 border-2 border-t-primary"></div>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const nextUrl = route.params.nextUrl;
onMounted(() => {
  if (nextUrl) {
    setTimeout(() => {
      router.push("/" + nextUrl);
    }, 8000);
  }
});
</script>

<style></style>
