<template>
  <div id="dateselect" class="pt-30">
    <div
      class="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border-primary/20 rounded-lg"
    >
      <BlurCirlcle top="-100px" left="-100px" />
      <BlurCirlcle top="100px" left="0px" />

      <div>
        <p class="text-lg font-semibold">Choose Date</p>
        <div class="flex items-center gap-6 text-sm mt-5">
          <ChevronLeftIcon width="28" />
          <span class="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
            <span v-for="date in Object.keys(props.dateTime)" :key="date">
              <button
                @click="updateSelected(date)"
                :class="[
                  'flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer',
                  selected === date ? 'bg-primary text-white' : 'border border-primary/70',
                ]"
              >
                <span>{{ new Date(date).getDate() }}</span>
                <span>{{
                  new Date(date).toLocaleDateString("en-us", {
                    month: "short",
                  })
                }}</span>
              </button>
            </span>
          </span>
          <ChevronRightIcon width="28" />
        </div>
      </div>

      <button
        @click="onBookHandler"
        class="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
      >
        Book Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import BlurCirlcle from "./BlurCirlcle.vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  dateTime: Record<string, any>;
  id: string;
}>();

const selected = ref<string | null>(null);

const updateSelected = (date: string) => {
  selected.value = date;
};

const onBookHandler = () => {
  if (!selected.value) {
    return toast("Please select a date");
  }
  router.push(`/movies/${props.id}/${selected.value}`);
  window.scrollTo(0, 0);
};
</script>
