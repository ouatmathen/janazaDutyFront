<template>
  <div>
    <h3 class="text-lg font-semibold mb-2">Informations Défunt</h3>
    <input v-model="localForm.nomDefunt" placeholder="Nom" class="w-full mb-2 border rounded px-2 py-1" />
    <input v-model="localForm.prenomDefunt" placeholder="Prénom" class="w-full mb-2 border rounded px-2 py-1" />
    <input type="date" v-model="localForm.dateNaissance" class="w-full mb-2 border rounded px-2 py-1" />
    <input type="date" v-model="localForm.dateDeces" class="w-full mb-2 border rounded px-2 py-1" />
    <input v-model="localForm.lieuDeces" placeholder="Lieu de décès" class="w-full mb-2 border rounded px-2 py-1" />
  </div>
</template>

<script setup>
import { watch, reactive, toRefs } from 'vue';
const props = defineProps({
  formData: Object
});

const localForm = reactive({ ...props.formData });

watch(localForm, (val) => {
  Object.assign(props.formData, val);
}, { deep: true });
</script>