<template>
  <h1 class="font-medium text-2xl">
    {{ text1 }} <span class="underline text-primary">{{ text2 }}</span>
  </h1>
</template>
<script setup lang="ts">
defineProps<{
  text1: string;
  text2: string;
}>();
</script>
<style></style>
