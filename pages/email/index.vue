<script setup lang="ts">
import { ref } from 'vue';
import { Info} from 'lucide-vue-next';


const router = useRouter();
const email = ref('');

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const goToOtp = () => {
  router.push({ path: '/otp', query: { email: email.value } });
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <div class="w-full mt-5">
      <h1 class="text-2xl font-semibold ml-4">Souscrivez à l'offre</h1>
    </div>

    <div class="m-4">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 15%"></div>
      </div>
    </div>

    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="flex flex-col flex-1">
        <label class="text-lg font-semibold">Veuillez entrer votre adresse email</label>
        <input
          v-model="email"
          type="email"
          placeholder="exemple@email.com"
          class="border rounded-md p-3 mt-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF7900] w-96"
        />
      </div>

      <div class="w-full bg-[#4BB4E652] text-gray-400 p-5 rounded-lg flex items-center mb-12">
        <span class="flex-1">Un code Otp vous sera envoyé par mail ou sur votre second contact</span>
        <Info class="w-5 h-5" />
      </div>

      <button
        class="w-full bg-[#FF7900] text-white py-2 rounded-lg text-lg font-semibold mt-12 mb-6 disabled:bg-[#ff770052]"
        :disabled="!isValidEmail(email)"
        @click="goToOtp"
      >
        Suivant
      </button>
    </div>
  </div>
</template>
