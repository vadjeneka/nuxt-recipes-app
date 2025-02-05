<script setup lang="ts">
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';

const router = useRouter();

const goToHomePage = () => {
  router.push({ path: '/'});
};

</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">

    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="w-full flex justify-center my-4">
        <atom-illustration-image
          source="/org_illustration_success.svg"
          :css-style="['w-2/3', 'max-w-xs']"
          :alt="success"
        />
      </div>

      <div class="text-center relative">
        <p class="text-2xl font-bold">
          Souscription en cours d'activation
        </p>
        <p class="text-gray-400 text-sm mt-3">Veuillez patienter pendant le processus création du compte. Cette opération peut prendre jusqu'a 25 secondes</p>
      </div>

      <button
        class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5"
        @click="goToHomePage()"
      >
        Accueil
      </button>
    </div>
  </div>
</template>