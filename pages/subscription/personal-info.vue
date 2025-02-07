<script setup>
const router = useRouter();
const goToSelfie = () => {
  router.push({ path: '/subscription/selfie', query: { data: null } });
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <atom-page-header title="Nouvelle Acquisition" />

    <div class="flex flex-col items-center justify-center py-5 mt-6">
      <div class="flex flex-col space-y-4 w-full mt-3 p-2">
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Genre</label>
          <select class="border rounded-md p-2">
            <option>Femme</option>
            <option>Homme</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Prénoms</label>
          <input type="text" class="border rounded-md p-2" placeholder="Prénoms">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Nom</label>
          <input type="text" class="border rounded-md p-2" placeholder="Nom">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Nationalité</label>
          <input type="text" class="border rounded-md p-2" placeholder="Côte d'Ivoire">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Date de naissance</label>
          <input type="date" class="border rounded-md p-2">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Lieu de naissance</label>
          <input type="text" class="border rounded-md p-2 " placeholder="Aboisso">
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm">Adresse</label>
          <input type="text" class="border rounded-md p-2" placeholder="Abidjan">
        </div>

        <button class="bg-orange-500 text-white p-3 rounded-md mt-6"
        @click="goToSelfie()">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>