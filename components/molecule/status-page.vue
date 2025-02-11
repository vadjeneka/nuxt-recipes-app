<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps({
  title: { type: String, default: "Souscription en cours d'activation" },
  message: { type: String, default: "Veuillez patienter pendant le processus de création du compte. Cette opération peut prendre jusqu'à 25 secondes." },
  imageSrc: { type: String, default: "/org_illustration_success.svg" },
  buttonText: { type: String, default: "Accueil" },
  buttonRoute: { type: String, default: "/" },
  cssStyle: {
    type: Array as () => string[],
    default: () => []
  }
});

const router = useRouter();
const goToRoute = () => {
  router.push({ path: props.buttonRoute });
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <div class="flex flex-col flex-1 items-center justify-center py-5">
      <div class="w-full flex justify-center my-4">
        <atom-illustration-image
          :source="imageSrc"
          :css-style="['w-2/3', 'max-w-xs']"
          alt="success"
        />
      </div>

      <div class="text-center relative">
        <p class="text-2xl font-bold">{{ title }}</p>
        <p class="text-gray-400 text-sm mt-3">{{ message }}</p>
      </div>

      <atom-button
        :class="cssStyle"
        :name="buttonText"
        @click="goToRoute()"
      />
    </div>
  </div>
</template>
