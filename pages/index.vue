<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">

    <div class="w-full">
      <div class="w-full flex items-center py-4">
        <button class="text-black">
          <ArrowLeft class="w-6 h-6" />
        </button>
      </div>
      <h1 class="text-2xl font-semibold ml-4">Remplacement de sim</h1>
    </div>

    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="w-full flex justify-center my-4">
        <atom-illustration-image
          source="/guestmode.svg"
          :css-style="['w-2/3', 'max-w-xs']"
          :alt="Illustration"
        />
      </div>

      <div class="text-center relative">
        <p class="text-2xl font-bold">
          Plus besoin de vous déplacer en agence en cas de perte de votre carte
        </p>
        <p class="text-gray-400 text-sm mt-3">infos à ajouter</p>
      </div>

      <button
        class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5"
        @click="showOverlay = true"
      >
        Souscrire Maintenant
      </button>

      <div class="mt-5 w-full bg-orange-100 text-orange-700 p-5 rounded-lg flex items-center mb-3">
        <span class="flex-1">Service est uniquement disponible sur Abidjan</span>
        <Info class="w-5 h-5" />
      </div>
    </div>

    <!-- Overlay couvrant tout le texte sous l’image -->
    <transition name="slide-up">
      <div
        v-if="showOverlay"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end"
        @click.self="showOverlay = false"
      >
        <div
          class="bg-white p-6 rounded-t-2xl shadow-lg w-full min-h-[50vh] flex flex-col"
        >
          <h2 class="text-lg font-bold text-center mb-3">Sélection du mode de récupération</h2>
          <ul class="mt-4 space-y-5 flex-1">
            <NuxtLink to="/phone-number" >
              <li class="flex justify-between items-center p-3 border-b-2">
                <span class="w-16 h-16 bg-[#3e3e3e] rounded-lg flex justify-center items-center p-4">
                  <img src="/principal.svg" class="w-full h-full" alt="principal" />
                </span>

                <div class="flex flex-col flex-1 ml-4">
                  <span class="text-sm text-gray-500">Mode 1</span>
                  <span>Numéro de confiance</span>
                </div>

                <ChevronRight class="w-5 h-5 text-gray-500" />
              </li>
            </NuxtLink>

            <NuxtLink to="/email" >
              <li class="flex justify-between items-center p-3 border-b-2">
                <span class="w-16 h-16 bg-[#3e3e3e] rounded-lg flex justify-center items-center p-4">
                  <img src="/Group-130.svg" class="w-full h-full" alt="" />
                </span>

                <div class="flex flex-col flex-1 ml-4">
                  <span class="text-sm text-gray-500">Mode 2</span>
                  <span>E-mail</span>
                </div>

                <ChevronRight class="w-5 h-5 text-gray-500" />
              </li>
            </NuxtLink>

            <NuxtLink to="/phone-email" >
              <li class="flex justify-between items-center p-3 border-b-2">
                <span class="w-16 h-16 bg-[#3e3e3e] rounded-lg flex justify-center items-center p-4">
                  <img src="/Frame.svg" class="w-full h-full" alt="" />
                </span>

                <div class="flex flex-col flex-1 ml-4">
                  <span class="text-sm text-gray-500">Mode 3</span>
                  <span>Numéro de confiance et E-mail</span>
                </div>

                <ChevronRight class="w-5 h-5 text-gray-500" />
              </li>
              </NuxtLink>
          </ul>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Info, ArrowLeft, ArrowRight, ChevronRight} from 'lucide-vue-next';
const showOverlay = ref(false);
</script>

<style scoped>

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
