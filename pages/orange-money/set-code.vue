<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <atom-page-header title="Sécurisez votre opération" />

    <div class="mt-5">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 75%"></div>
      </div>
    </div>

    <div class="text-center relative mt-3 ">
      <p class="text-black text-sm mt-3">
        Veuillez saisir votre code Orange Money afin de finaliser l'authentification.
      </p>
    </div>

    <div class="flex justify-center mt-5">
      <img src="/OM.svg" alt="Orange Money Logo" class="w-20 h-24" />
    </div>

    <div class="text-center mt-5">
      <p class="text-black text-lg font-semibold">Entrez votre secret code</p>
      <div class="flex justify-center space-x-3 mt-5">
        <div v-for="(dot, index) in 4" :key="index" class="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
          <span v-if="enteredCode[index]" class="w-4 h-4 bg-[#FF7900] rounded-full"></span>
        </div>
      </div>
    </div>

    <div class="flex-grow flex-col justify-end gap-4 pb-6">
      <div class="grid grid-cols-4 gap-4 mt-6 mx-auto w-96 mb-4">

        <button
          v-for="num in shuffledNumbers.slice(0, 8)"
          :key="num"
          class="w-16 h-16 bg-white text-2xl rounded-lg shadow-sm"
          @click="enterDigit(num)"
        >
          {{ num }}
        </button>

        <button class="w-16 h-16 bg-white text-2xl rounded-lg shadow-sm opacity-0" disabled></button>

        <button
          v-if="shuffledNumbers[8]"
          class="w-16 h-16 bg-white text-2xl rounded-lg shadow-sm"
          @click="enterDigit(shuffledNumbers[8])"
        >
          {{ shuffledNumbers[8] }}
        </button>

        <button class="w-16 h-16 bg-white text-2xl rounded-lg shadow-sm" @click="enterDigit(0)">
          0
        </button>

        <button class="w-16 h-16 bg-white text-2xl rounded-lg shadow-sm" @click="removeDigit">
          ⌫
        </button>
      </div>

      <div v-if="showToast" class="mt-5 w-full">
        <atom-toast
          :message="toastMessage"
          :type="toastType"
        />
      </div>

      <button class="w-full bg-[#FF7900] text-white text-lg font-semibold py-3 rounded-lg mt-6"
      @click="verifySecretCode">
        VALIDER
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';

const enteredCode = ref<string[]>([]);
const toastMessage = ref<string | null>(null);
const showToast = ref(false);
const toastType = ref<string | null>(null);
const router = useRouter();

const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const shuffledNumbers = computed(() => [...numbers.value].sort(() => Math.random() - 0.5));

const goToConfirmation = () => {
  router.push({ path: '/confirmation'});
};

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

    if (enteredString === goodCode) {
      toastMessage.value = "Code valide !";
      toastType.value = "success";

      setTimeout(() => {
        showToast.value = false;
        goToConfirmation();
      }, 2000);

    } else {
      toastMessage.value = "Code incorrect !";
      toastType.value = "error";
    }
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
      enteredCode.value = [];
    }, 3000);

  } else {
    toastMessage.value = "Code invalide, saisissez 4 chiffres.";
    toastType.value = "warning";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
      toastMessage.value = null;
    }, 3000);
  }
};

const hideToast = () => {
  showToast.value = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
