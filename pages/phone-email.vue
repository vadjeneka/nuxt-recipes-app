<script setup lang="ts">
import { ref } from 'vue';


const router = useRouter();
const phoneNumber = ref('');
const mode = ref(3)

const goToOtp = () => {
  router.push({ path: '/otp', query: { phone: phoneNumber.value, mode: mode.value } });
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <div class="w-full mt-5">
      <h1 class="text-2xl font-semibold ml-4">Remplacement de sim</h1>
    </div>

    <div class="m-4">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 15%"></div>
      </div>
    </div>

    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="flex flex-col mt-10">
        <label class="text-lg font-semibold">Veuillez entrer votre numéro de confiance</label>
        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="07XXXXXXXX"
          class="border rounded-md p-3 mt-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF7900]"
        />
    </div>


    <button
      class="w-full bg-[#FF7900] text-white py-2 rounded-lg text-lg font-semibold mt-auto mb-6 disabled:bg-[#ff770052]"
      :disabled="phoneNumber.length < 10"
      @click="goToOtp"
    >
      Suivant
    </button>
    </div>
  </div>
</template>