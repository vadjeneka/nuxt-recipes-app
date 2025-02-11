<template>
  <div class="min-h-screen flex flex-col bg-white px-6">
    <atom-page-header title="Souscrivez à l'offre" v-if="email"/>
    <atom-page-header title="Remplacement de sim" v-if="phone"/>

    <div class="m-4">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 30%"></div>
      </div>
    </div>


    <p class="text-lg font-semibold mt-10">
      Un OTP a été envoyé au <span class="text-[#FF7900] font-bold">{{ phone || email }}</span>
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
        @keypress="onlyNumbers"
        autocomplete="one-time-code"
      />
    </div>


    <p class="text-gray-500 text-sm mt-3">
      Vous n'avez pas reçu votre code ?
      <button class="text-blue-500 font-semibold" @click="resendOtp">Renvoyer OTP</button>
    </p>

    <div v-if="showToast" class="mt-5">
      <atom-toast
        :message="toastMessage"
        :type="toastType"
      />
    </div>


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

const router = useRouter();
const route = useRoute();
const phone = ref<string | null>(null);
const email = ref<string | null>(null);
const mode = ref<string | null>(null);
const provider = ref<string | null>(null);
const otp = ref(Array(5).fill(''));
const toastMessage = ref<string | null>(null);
const showToast = ref(false);
const toastType = ref<string | null>(null);

const goToSetOrangeMoneySecretCode = () => {
  console.log("PROVIDER", provider.value)
  if (mode.value === '3') {
    router.push({path: '/add-email', query: {
      phone: phone.value || email.value,
      provider: router.currentRoute.value.query.provider
    }})
  }

  if (provider.value === "new-register") {
    router.push({path: '/subscription/instructions', query: {
      phone: phone.value || email.value,
      provider: router.currentRoute.value.query.provider
    }})
  }
  
  if (provider.value === "new-register" && mode.value === '3' ) {
    router.push({path: '/add-email', query: {
      phone: phone.value || email.value,
      provider: router.currentRoute.value.query.provider
    }})
  }

  if (mode.value === null && provider.value === null) {
    router.push({ path: '/orange-money', query: { 
      phone: phone.value || email.value ,
      provider: router.currentRoute.value.query.provider} });
  }

};

onMounted(() => {
  phone.value = route.query.phone ? String(route.query.phone) : null;
  email.value = route.query.email ? String(route.query.email) : null;
  mode.value = route.query.mode ? String(route.query.mode) : null;
  provider.value = route.query.provider ? String(route.query.provider) : null;
});


const moveFocus = (index, event) => {
  const input = event.target;
  const value = input.value.replace(/\D/g, "");
  otp.value[index] = value;

  if (value) {
    if (index < otp.value.length - 1) {
      input.nextElementSibling?.focus();
    }
  } else if (event.inputType === "deleteContentBackward") {

    if (index > 0) {
      input.previousElementSibling?.focus();
      otp.value[index] = "";
    }
  }
};

const onlyNumbers = (event) => {
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
};


const resendOtp = () => {
  console.log('OTP renvoyé à', phone.value || email.value);
};

const verifyOtp = () => {
  if (otp.value.join('') === "00000") {
    showToast.value = true
    toastMessage.value = "Otp invalide !";
    toastType.value = "success"

    setTimeout(() => {
      showToast.value = false;
      goToSetOrangeMoneySecretCode();
    }, 2000);

  } else {
    showToast.value = true
    toastMessage.value = "Otp invalide !";
    toastType.value = "error"

    setTimeout(() => {
      showToast.value = false
    }, 3000);
  }
};
</script>
