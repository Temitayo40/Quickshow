<template>
  <div :key="row" class="flex gap-2 mt-2">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button
        v-for="i in count"
        :key="`${row}${i}`"
        @click="emitSeatClick(`${row}${i}`)"
        class="h-8 w-8 rounded border border-primary/60 cursor-pointer"
        :class="selectedSeats.includes(`${row}${i}`) ? 'bg-primary text-white' : ''"
      >
        {{ `${row}${i}` }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  row: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 9,
  },
  selectedSeats: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["seat-click"]);

function emitSeatClick(seatId) {
  emit("seat-click", seatId);
}
</script>
