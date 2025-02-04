<script setup lang="ts">
const props = defineProps({
  source: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  cssStyle: {
    type: Array as () => string[],
    default: () => []
  }
})

const imageSource = ref('')

onMounted(() => {
  imageSource.value = props.source.replace('https://store-monagencepro-dev.orange.ci/','')
})
</script>

<template>
  <img
      :src="source"
      class="mode-image"
      :class="cssStyle"
      :alt="alt"
      loading="lazy"
  />
</template>