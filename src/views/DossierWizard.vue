<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Création Dossier</h2>

    <component :is="steps[currentStep]" v-model:formData="formData"></component>

    <div class="mt-4 flex justify-between">
      <button @click="prevStep" :disabled="currentStep === 0" class="bg-gray-400 text-white px-3 py-1 rounded">Précédent</button>
      <button @click="nextStep" class="bg-blue-600 text-white px-3 py-1 rounded">
        {{ currentStep === steps.length - 1 ? 'Terminer' : 'Suivant' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Step1Defunt from './wizard/Step1Defunt.vue';
import Step2Pouvoir from './wizard/Step2Pouvoir.vue';
import Step3Sepulture from './wizard/Step3Sepulture.vue';
import Step4Transport from './wizard/Step4Transport.vue';
import Step5Soins from './wizard/Step5Soins.vue';
import Step6MiseEnBiere from './wizard/Step6MiseEnBiere.vue';
import Step7Ceremonie from './wizard/Step7Ceremonie.vue';
import Step8Inhumation from './wizard/Step8Inhumation.vue';
import Step9Documents from './wizard/Step9Documents.vue';
import Step10Signature from './wizard/Step10Signature.vue';

const steps = [
  { label: 'Défunt', component: Step1Defunt },
  { label: 'Pouvoir', component: Step2Pouvoir },
  { label: 'Sépulture', component: Step3Sepulture },
  { label: 'Documents', component: Step4Documents },
  { label: 'Transport', component: Step5Transport },
  { label: 'Soins', component: Step6Soins },
  { label: 'Mise en bière', component: Step7MiseEnBiere },
  { label: 'Cérémonie', component: Step8Ceremonie },
  { label: 'Inhumation', component: Step9Inhumation },
  { label: 'Signature', component: Step10Signature }
];

const currentStep = ref(0);
const formData = ref({});

const nextStep = () => {
  if(currentStep.value < steps.length - 1) {
    currentStep.value++;
  } else {
    // TODO: envoyer formData vers backend
    console.log('Dossier complet', formData.value);
  }
};

const prevStep = () => {
  if(currentStep.value > 0) currentStep.value--;
};
</script>