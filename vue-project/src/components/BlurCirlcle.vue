<template>
  <div
    class="absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl"
    :style="{
      top: top || 'auto',
      right: right || 'auto',
      bottom: bottom || 'auto',
      left: left || 'auto',
    }"
  ></div>
</template>
<script setup lang="ts">
defineProps<{
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}>();
</script>
<style></style>
