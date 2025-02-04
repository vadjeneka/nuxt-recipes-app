<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <!-- En-tête -->
    <div class="w-full mt-5">
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
      <h1 class="text-2xl font-semibold ml-4">Sécurisez votre opération</h1>
    </div>


    <div class="mt-5">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 75%"></div>
      </div>
    </div>


    <div class="text-center relative mt-3">
      <p class="text-black text-sm mt-3">
        Veuillez saisir votre code Orange Money afin de finaliser l'authentification.
      </p>
    </div>


    <div class="flex justify-center mt-5">
      <img src="/OM.svg" alt="Orange Money Logo" class="w-16 h-16" />
    </div>


    <div class="text-center mt-5">
      <p class="text-black text-lg font-semibold">Entrez votre secret code</p>
      <div class="flex justify-center space-x-3 mt-5">
        <div v-for="(dot, index) in 4" :key="index" class="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
          <span v-if="enteredCode[index]" class="w-4 h-4 bg-[#FF7900] rounded-full"></span>
        </div>
      </div>
    </div>


    <div class="grid grid-cols-4 gap-4 mt-6 mx-auto w-96">
      <button
        v-for="num in shuffledNumbers"
        :key="num"
        class="w-16 h-16 bg-white text-2xl rounded-lg shadow-sm"
        @click="enterDigit(num)"
      >
        {{ num }}
      </button>
      <button class="w-16 h-16 bg-white text-2xl  rounded-lg shadow-sm" @click="enterDigit(0)">
        0
      </button>
      <button class="w-16 h-16 bg-white text-2xl  rounded-lg shadow-sm" @click="removeDigit">
        ⌫
      </button>
    </div>


    <button class="w-full bg-[#FF7900] text-white text-lg font-semibold py-3 rounded-lg mt-6"
    @click="verifySecretCode">
      VALIDER
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';


const enteredCode = ref<string[]>([]);


const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const shuffledNumbers = computed(() => numbers.value.sort(() => Math.random() - 0.5));


const enterDigit = (digit: number) => {
  if (enteredCode.value.length < 4) {
    enteredCode.value.push(digit.toString());
  }
};


const removeDigit = () => {
  enteredCode.value.pop();
};

const verifySecretCode = () => {
  const goodCode = "9099";

  if (enteredCode.value.length === 4) {
    const enteredString = enteredCode.value.join("");
    console.log("ENTERED CODE", enteredString);

    if (enteredString === goodCode) {
      console.log("Code correct !");
    } else {
      console.log("Code incorrect !");
    }
  } else {
    console.log("Code invalide, saisissez 4 chiffres.");
  }
};

</script>

<style scoped>

</style>
