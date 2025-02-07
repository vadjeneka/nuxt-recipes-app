<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <atom-page-header title="Remplacement de SIM"/>
    <div class="m-4">
      <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
        <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 30%"></div>
      </div>
    </div>

    <p class="text-gray-600 text-center mb-4">
      Veuillez vérifier la qualité de la photo et vous assurer que les informations sont lisibles. 
      Si ce n'est pas le cas, veuillez réessayer !
    </p>

    <!-- CNI Recto -->
    <h1 class="font-semibold text-lg">CNI recto</h1>
    <div class="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden">
      <video ref="videoRecto" autoplay playsinline class="absolute inset-0 w-full h-full object-cover" v-show="cameraActive === 'recto'"></video>
      <img v-if="photoRecto" :src="photoRecto" class="absolute inset-0 w-full h-full object-cover" />

      <button v-if="photoRecto" @click="removePhoto('recto')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
        <X class="w-5 h-5" />
      </button>

      <div class="flex flex-col space-y-3">
        <span class="text-sm font-semibold"> Scanner pour ajouter le Recto</span>
        <button v-if="!photoRecto && cameraActive !== 'recto'" @click="startCamera('recto')" class="bg-white px-4 py-2 rounded-lg border-2 border-black relative z-10">
          Ajouter
        </button>
        <button v-if="cameraActive === 'recto'" @click="capturePhoto('recto')" class="border-4 border-[#FF7900] text-white px-4 py-2 rounded-lg relative z-10 opacity-50">
          Capturer
        </button>
      </div>
    </div>

    <!-- CNI Verso -->
    <h1 class="font-semibold text-lg mt-5">CNI verso</h1>
    <div class="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden">
      <video ref="videoVerso" autoplay playsinline class="absolute inset-0 w-full h-full object-cover" v-show="cameraActive === 'verso'"></video>
      <img v-if="photoVerso" :src="photoVerso" class="absolute inset-0 w-full h-full object-cover" />

      <button v-if="photoVerso" @click="removePhoto('verso')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
        <X class="w-5 h-5" />
      </button>

      <div class="flex flex-col space-y-3">
        <span class="text-sm font-semibold"> Scanner pour ajouter le Verso</span>
        <button v-if="!photoVerso && cameraActive !== 'verso'" @click="startCamera('verso')" class="bg-white px-4 py-2 rounded-lg border-2 border-black relative z-10">
          Ajouter
        </button>
        <button v-if="cameraActive === 'verso'" @click="capturePhoto('verso')" class="border-4 border-[#FF7900] text-white px-4 py-2 rounded-lg relative z-10 opacity-50">
          Capturer
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="mt-5 w-full">
      <atom-toast :message="errorMessage" type="error" />
    </div>


    <button
      :disabled="!photoRecto && !photoVerso"
      class="mt-12 w-full bg-[#FF7900] text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all"
      :class="{ 'opacity-50 cursor-not-allowed': !photoRecto || !photoVerso }"
      @click="goToPersonalInfo()"
    >
      Suivant
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { X } from 'lucide-vue-next';

const videoRecto = ref(null);
const videoVerso = ref(null);
const photoRecto = ref(null);
const photoVerso = ref(null);
const errorMessage = ref("");
const cameraActive = ref(null);
let stream = null;
const router = useRouter()

const goToPersonalInfo = (() => {
  router.push({ path: '/subscription/personal-info', query: { data: null } });

})
const startCamera = async (type) => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      errorMessage.value = "Accès à la caméra non supporté par ce navigateur.";
      return;
    }


    if (cameraActive.value === type) return;


    stopCamera();

    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });


    cameraActive.value = type;

    if (type === "recto" && videoRecto.value) {
      videoRecto.value.srcObject = stream;
    } else if (type === "verso" && videoVerso.value) {
      videoVerso.value.srcObject = stream;
    }
  } catch (err) {
    errorMessage.value = "L'accès à la caméra a été refusé. Veuillez autoriser l'accès.";
    console.error("Erreur d'accès à la caméra :", err);
  }
};


const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  cameraActive.value = null;
};


const capturePhoto = (type) => {
  const videoElement = type === "recto" ? videoRecto.value : videoVerso.value;

  if (!stream || !videoElement) {
    console.error("La caméra n'est pas activée !");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  if (type === "recto") {
    photoRecto.value = canvas.toDataURL("image/png");
  } else {
    photoVerso.value = canvas.toDataURL("image/png");
  }

  stopCamera();
};

const removePhoto = (side) => {
  if (side === 'recto') {
    photoRecto.value = null;
  } else {
    photoVerso.value = null;
  }
};
</script>

<style scoped>
button {
  transition: background 0.3s ease;
}
button:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>
