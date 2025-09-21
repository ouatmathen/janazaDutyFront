<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Dossiers</h2>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <ul>
      <li v-for="dossier in dossiers" :key="dossier.id">
        {{ dossier.nomDefunt }} - {{ dossier.dateDeces }} - {{ dossier.status }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const dossiers = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await api.get('/dossiers');
    dossiers.value = res.data;
  } catch(err) {
    error.value = 'Impossible de récupérer les dossiers';
  }
});
</script>