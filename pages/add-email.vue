<script setup lang="ts">
import { ArrowLeft, Search, Bell, MessageCircleQuestion, UserCircle } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();


const phone = ref('');
const email = ref('');
const provider = ref<string | null>(null);

const goToSetEmail = (phoneNumber) => {
  router.push({ path: '/email', query: { phone: phoneNumber, email: null, provider: router.currentRoute.value.query.provider } });
};

onMounted(() => {
  provider.value = route.query.provider ? String(route.query.provider) : null;
});

</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <atom-page-header title="Remplacement de sim" />

    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="w-full flex justify-center my-4">
        <atom-illustration-image
          source="/header.svg"
          :css-style="['w-2/3', 'max-w-xs']"
          :alt="header"
        />
      </div>

      <div class="text-center relative">
        <p class="text-2xl font-bold">
          Ajout de l'email
        </p>
        <p class="text-gray-400 text-sm mt-3">Veuillez renseignez votre email pour finaliser</p>
      </div>

      <button
        class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5"
        @click="goToSetEmail($router.currentRoute.value.query.phone)"
      >
        Renseignez l'email
      </button>
    </div>
  </div>
</template>