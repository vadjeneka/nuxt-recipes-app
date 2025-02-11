<script setup lang="ts">
const props = defineProps({
  cssStyle: {
    type: Array as () => string[],
    default: () => ['w-full bg-[#FF7900]', 'text-white py-3 rounded-lg', 'shadow-md hover:bg-orange-600 mt-5']
  },
  name: {
    type: String, default: 'Atom Buttom'
  }
})
</script>

<template>
  <button :class="cssStyle">
    {{ name }}
  </button>
</template>