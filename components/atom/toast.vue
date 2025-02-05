<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: "success",
  },
  duration: {
    type: Number,
    default: 3000,
  }
});

const showToast = ref(true);

const hideToast = () => {
  showToast.value = false;
};


watch(showToast, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      hideToast();
    }, props.duration);
  }
});


const bgColors = {
  success: "bg-[#32C832]",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="showToast"
      id="toast"
      class="flex items-center w-full max-w-xs p-4 text-white rounded-lg shadow-sm mx-auto mt-4"
      :class="bgColors[type]"
      role="alert"
    >
      <div class="text-sm font-normal">
        {{ message }}
      </div>
      <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8"
          @click="hideToast"
        >
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
