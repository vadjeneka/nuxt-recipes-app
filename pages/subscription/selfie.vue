<template>
  <div class="min-h-screen flex flex-col bg-white px-4 relative">
    <div v-if="!isCameraOpen">
      <atom-page-header title="Nouvelle Acquisition"/>
      <div class="m-4">
        <div class="w-full bg-[#FF7900] rounded-full h-1.5 mb-4 dark:bg-gray-300">
          <div class="bg-[#FF7900] h-1.5 rounded-full dark:bg-[#FF7900]" style="width: 45%"></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center py-5">
      <div v-if="!isCameraOpen" class="w-full flex justify-center my-4">
        <atom-illustration-image
          source="/om-instructions.svg"
          :css-style="['w-2/3', 'max-w-xs']"
          :alt="success"
        />
      </div>

      <div v-if="!isCameraOpen" class="text-center relative">
        <p class="text-2xl font-bold">
          Instructions pour prendre la photo:
        </p>
        <p class="text-gray-400 text-sm mt-3">Nous allons vérifier votre photo avec celle de votre CNI</p>
      </div>

      <div v-if="!isCameraOpen" class="bg-white w-full flex flex-col">
        <ul class="mt-4">
          <li class="flex justify-start items-center ml-2">
            <span class="w-20 h-20">
              <img src="/glass.svg" class="w-[60px] h-full m-auto" alt="" />
            </span>
            <span class="font-semibold flex justify-center items-center">Veuillez enlever vos lunettes</span>
          </li>

          <li class="flex justify-start items-center ml-3">
            <span class="w-20 h-20">
              <img src="/face.svg" class="w-[50px] h-full m-auto" alt="" />
            </span>
            <span class="font-semibold flex justify-center items-center">Bien regarder la caméra</span>
          </li>

          <li class="flex justify-start items-center ml-3">
            <span class="w-20 h-20">
              <img src="/soleil.svg" class="w-[60px] h-full m-auto" alt="" />
            </span>
            <span class="font-semibold flex justify-center items-center">Être dans un endroit bien éclairé</span>
          </li>
        </ul>
      </div>


      <div v-if="isCameraOpen" class="mt-5 w-full flex-grow min-h-[70vh] flex flex-col items-center justify-center relative">

        <video ref="videoElement" autoplay class="absolute inset-0 rounded-lg shadow-md w-full h-full object-cover pointer-events-auto"></video>
        <img v-if="capturedImage" :src="capturedImage" class="absolute inset-0 w-full h-full object-cover" />


        <button @click="closeSelfie()" v-if="!capturedImage"
          class="absolute top-2 right-2 bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-800 z-50">
          <X class="w-8 h-8"/>
        </button>

        <button @click="removeSelfie()" v-if="capturedImage"
          class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-800 z-50">
          <X class="w-8 h-8"/>
        </button>

        <button
          @click="captureSelfie" v-if="!capturedImage"
          class="absolute bottom-5 z-50 bg-white bg-opacity-50 border-4 border-[#FF7900] w-20 h-20 rounded-full shadow-lg hover:bg-opacity-80 flex items-center justify-center"
          :disabled="isLoading"
          >
          <span v-if="isLoading" class="animate-spin border-4 border-[#FF7900] border-t-transparent rounded-full w-10 h-10"></span>
          <span v-else>Capture</span>
        </button>

      </div>

        <button
          v-if="capturedImage"
          class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5 z-50"
          @click="goToConfirmationPage()"
        >
          Continuer
        </button>
      <!-- <input type="file" accept="image/*" capture="user" id="selfie-input" /> -->

      <button
        v-if="!isCameraOpen"
        class="w-full bg-[#FF7900] text-white py-3 rounded-lg shadow-md hover:bg-orange-600 mt-5 z-50"
        @click="startFromSelfieCamera"
      >
        Continuer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { X } from 'lucide-vue-next';


const isCameraOpen = ref(false);
const videoElement = ref(null);
const capturedImage = ref(null);
const router = useRouter()
const isLoading = ref(false);

const startFromSelfieCamera = async () => {
  try {
    isCameraOpen.value = true;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });

    if (videoElement.value) {
      videoElement.value.srcObject = stream;
    }
  } catch (error) {
    console.error("Erreur lors de l'ouverture de la caméra :", error);
    isCameraOpen.value = false;
    alert("Impossible d'accéder à la caméra", error);
  }
};

const captureSelfie = async () => {
  isLoading.value = true;

  setTimeout(() => {
    const canvas = document.createElement("canvas");
    const video = videoElement.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    capturedImage.value = canvas.toDataURL("image/png");
    console.log("Photo capturée :", capturedImage.value);
    // closeSelfie();

    // if (capturedImage.value != null) {
    //   goToConfirmationPage();
    // }

    isLoading.value = false;
  }, 1000);
};

const closeSelfie = () => {
  if (videoElement.value && videoElement.value.srcObject) {
    const stream = videoElement.value.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoElement.value.srcObject = null;
  }
  isCameraOpen.value = false;
};

const removeSelfie = () => {
  capturedImage.value = null;
}


// const takePhoto = () => {
//   document.getElementById('selfie-card');
// };

const goToConfirmationPage = () => {
  router.push({
    path: '/subscription/confirmation'
  })
}

</script>
