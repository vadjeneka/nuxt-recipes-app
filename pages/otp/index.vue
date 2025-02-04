<template>
  <div class="min-h-screen flex flex-col bg-white px-6">

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
      <h1 class="text-2xl font-semibold ml-4">Remplacement de sim</h1>
    </div>

    <div class="m-4">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 15%"></div>
      </div>
    </div>


    <p class="text-lg font-semibold mt-10">
      Un OTP a été envoyé au <span class="text-[#FF7900] font-bold">{{ phone }}</span>
    </p>


    <div class="flex justify-between mt-6">
      <input 
        v-for="(digit, index) in otp"
        :key="index"
        type="text"
        maxlength="1"
        class="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#FF7900]"
        v-model="otp[index]"
        @input="moveFocus(index, $event)"
      />
    </div>


    <p class="text-gray-500 text-sm mt-3">
      Vous n'avez pas reçu votre code ? 
      <button class="text-blue-500 font-semibold" @click="resendOtp">Renvoyer OTP</button>
    </p>


    <button
      class="w-full bg-[#FF7900] text-white py-2 rounded-md text-lg font-semibold mt-auto mb-6 disabled:bg-[#ff770052]"
      :disabled="otp.some(d => !d)"
      @click="verifyOtp"
    >
      Suivant
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const phone = ref('');
const otp = ref(Array(5).fill(''));

const goToSetOrangeMoneySecretCode = () => {
  router.push({ path: '/orange-money', query: { phone: phone.value } });
};

onMounted(() => {
  phone.value = route.query.phone || null;
});

const moveFocus = (index, event) => {
  if (event.target.value && index < otp.value.length - 1) {
    event.target.nextElementSibling?.focus();
  }
};

const resendOtp = () => {
  console.log('OTP renvoyé à', phone.value);
};

const verifyOtp = () => {
  console.log('OTP entré :', otp.value.join(''));
  if (otp.value.join('') === "00000") {
    goToSetOrangeMoneySecretCode()
  } else {
    console.log("OTP INVALID DISPLAY MESSAGE ERROR")
  }
};
</script>
