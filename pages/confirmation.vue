<script setup lang="ts">
</script>

<template>
  <molecule-status-page
    title="Souscription en cours d'activation"
    message="Veuillez patienter pendant le processus création du compte. Cette opération peut prendre jusqu'a 25 secondes"
    imageSrc="/org_illustration_success.svg"
    buttonText="Accueil"
    buttonRoute="/"
    :cssStyle="['w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5']"
  />
</template>