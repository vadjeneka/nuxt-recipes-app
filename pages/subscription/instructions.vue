<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <atom-page-header title="Nouvelle Acquisition"/>
    <div class="m-4">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 15%"></div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center py-5">
      <div class="w-full flex justify-center my-4">
        <atom-illustration-image
          source="/om-instructions.svg"
          :css-style="['w-2/3', 'max-w-xs']"
          :alt="success"
        />
      </div>

      <div class="text-center relative">
        <p class="text-2xl font-bold">
          Instructions pour souscrire au sim swap:
        </p>
        <p class="text-gray-400 text-sm mt-3">Nous allons verifier votre compte OM et votre identité</p>
      </div>

      <div class="bg-white w-full flex flex-col">
        <ul class="mt-4">
          <li class="flex justify-center items-center ml-2">
            <span class="w-20 h-20 flex justify-center items-center p-2">
              <img src="/Thumbnail.svg" class="w-full h-full" alt="" />
            </span>

            <span class="font-semibold flex justify-center items-center">Préparer votre CNI, vous aurez à la scanner</span>
          </li>

          <li class="flex justify-center items-center ml-3">
            <span class="w-20 h-20 flex justify-center items-center">
              <img src="/Thumbnail.svg" class="w-full h-full" alt="" />
            </span>
            <span class="font-semibold flex justify-center items-center">Une photo de vous sera necessaire, pour confirmer votre identité</span>
          </li>
        </ul>
      </div>
        <button
          class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5"
          @click="goToSubSetCard()"
        >
          Continuez
        </button>
    </div>
  </div>
</template>
<script setup>
const router = useRouter();
const goToSubSetCard = () => {
  router.push({ path: '/subscription/set-card', query: { data: null } });
};
</script>