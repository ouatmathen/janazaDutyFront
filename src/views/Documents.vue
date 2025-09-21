<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Documents</h2>

    <div class="mb-4">
      <input type="file" multiple @change="handleFiles" class="border rounded px-2 py-1 mb-2 w-full" />
      <button @click="uploadFiles" class="bg-blue-600 text-white px-3 py-1 rounded">Uploader</button>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2">Documents attachés</h3>
      <ul>
        <li v-for="doc in documents" :key="doc.id" class="border-b py-1 flex justify-between">
          <span>{{ doc.name }} - {{ doc.signe ? 'Signé' : 'En attente' }}</span>
          <div>
            <button @click="download(doc.id)" class="bg-green-500 text-white px-2 py-1 rounded mr-2">Télécharger</button>
            <button v-if="!doc.signe" @click="sign(doc.id)" class="bg-yellow-500 text-white px-2 py-1 rounded">Signer</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const files = ref([]);
const documents = ref([]);

const handleFiles = (event) => {
  files.value = Array.from(event.target.files);
};

const uploadFiles = async () => {
  try {
    const formData = new FormData();
    files.value.forEach(file => formData.append('files', file));
    await api.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    files.value = [];
    fetchDocuments();
  } catch(err) { console.error(err); }
};

const fetchDocuments = async () => {
  try {
    const res = await api.get('/documents');
    documents.value = res.data;
  } catch(err) { console.error(err); }
};

const download = (id) => {
  window.open(`/documents/download/${id}`, '_blank');
};

const sign = async (id) => {
  try {
    const res = await api.post(`/signature/create/${id}`, { signerEmail: 'famille@email.com', signerName: 'Mme Dupont' });
    window.open(res.data.url, '_blank');
  } catch(err) { console.error(err); }
};

onMounted(() => {
  fetchDocuments();
});
</script>