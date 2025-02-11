<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = ref({
  genre: '',
  prenoms: '',
  nom: '',
  nationalite: '',
  dateNaissance: '',
  lieuNaissance: '',
  adresse: ''
});


const isFormValid = computed(() => {
  return Object.values(data.value).every(value => value.trim() !== '');
});


const goToSelfie = () => {
  if (isFormValid.value) {
    router.push({
      path: '/subscription/selfie',
      query: { data: null }
    });
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <atom-page-header title="Nouvelle Acquisition" />

    <div class="flex flex-col items-center justify-center py-5 mt-6">
      <div class="flex flex-col space-y-4 w-full mt-3 p-2">
        
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Genre</label>
          <select v-model="data.genre" class="border rounded-md p-2">
            <option value="">Sélectionnez</option>
            <option value="Femme">Femme</option>
            <option value="Homme">Homme</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Prénoms</label>
          <input v-model="data.prenoms" type="text" class="border rounded-md p-2" placeholder="Prénoms">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Nom</label>
          <input v-model="data.nom" type="text" class="border rounded-md p-2" placeholder="Nom">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Nationalité</label>
          <input v-model="data.nationalite" type="text" class="border rounded-md p-2" placeholder="Côte d'Ivoire">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Date de naissance</label>
          <input v-model="data.dateNaissance" type="date" class="border rounded-md p-2">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Lieu de naissance</label>
          <input v-model="data.lieuNaissance" type="text" class="border rounded-md p-2 " placeholder="Aboisso">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Adresse</label>
          <input v-model="data.adresse" type="text" class="border rounded-md p-2" placeholder="Abidjan">
        </div>


        <button 
          class="p-3 rounded-md mt-6 w-full transition-all"
          :class="isFormValid ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
          :disabled="!isFormValid"
          @click="goToSelfie"
        >
          Continue
        </button>

      </div>
    </div>
  </div>
</template>
