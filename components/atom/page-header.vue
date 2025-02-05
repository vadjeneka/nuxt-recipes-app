<script setup lang="ts">
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-between py-4 mt-5">
      <button class="text-black" @click="$router.back()">
        <ArrowLeft class="w-6 h-6" />
      </button>
      <div class="flex items-center space-x-4">
        <Search class="w-6 h-6" />
        <Bell class="w-6 h-6" />
        <MessageCircleQuestion class="w-6 h-6" />
        <UserCircle class="w-6 h-6 text-gray-400" />
      </div>
    </div>
    <h1 class="text-2xl font-semibold ml-4">{{ title }}</h1>
  </div>
</template>
