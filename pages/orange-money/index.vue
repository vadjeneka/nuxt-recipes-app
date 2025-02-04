<script setup lang="ts">
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';

const router = useRouter();

const phone = ref('');
const goToSetSecretCode = (phoneNumber) => {
  router.push({ path: '/orange-money/set-code', query: { phone: phoneNumber } });
};

console.log('phone', router.currentRoute.value.query.phone)

</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">

    <div class="w-full">
      <div class="w-full flex items-center justify-between py-4 mt-3">
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
      <h1 class="text-2xl font-semibold ml-4">Remplacement de sim</h1>
    </div>

    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="w-full flex justify-center my-4">
        <atom-illustration-image
          source="/Group101.svg"
          :css-style="['w-2/3', 'max-w-xs']"
          :alt="group"
        />
      </div>

      <div class="text-center relative">
        <p class="text-2xl font-bold">
          Vérification du compte OM
        </p>
        <p class="text-gray-400 text-sm mt-3">Veuillez renseignez votre code pour finaliser</p>
      </div>

      <button
        class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5"
        @click="goToSetSecretCode($router.currentRoute.value.query.phone)"
      >
        Suivant
      </button>
    </div>
  </div>
</template>