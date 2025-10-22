<template>
  <div class="dossier-detail">
    <div v-if="!dossier">
      <p>Dossier introuvable.</p>
    </div>
    <div v-else>
      <header class="dossier-header">
        <div>
          <h2>{{ dossier.numero }} - {{ dossier.nom }}</h2>
          <div class="meta">Statut: {{ dossier.statut }} • Date décès: {{ dossier.dateDeces }}</div>
        </div>
        <div class="actions">
          <button class="btn">Modifier</button>
          <button class="btn">Cloner</button>
          <button class="btn primary">Initier signature</button>
          <button class="btn danger">Archiver</button>
        </div>
      </header>

      <nav class="tabs">
        <button v-for="t in tabs" :key="t" @click="active = t" :class="['tab', { active: active===t }]">{{ t }}</button>
      </nav>

      <section class="tab-content">
        <div v-if="active === 'Défunt'">
          <h3>Défunt</h3>
          <div class="grid">
            <div><strong>Nom:</strong> {{ dossier.nom }}</div>
            <div><strong>Date naissance:</strong> {{ dossier.dateNaissance }}</div>
            <div><strong>Lieu:</strong> {{ dossier.lieuNaissance }}</div>
            <div><strong>N° acte:</strong> {{ dossier.numeroActe }}</div>
            <div><strong>Adresse famille:</strong> {{ dossier.adresseFamille }}</div>
            <div><strong>Contact:</strong> {{ dossier.contact }}</div>
          </div>
        </div>

        <div v-if="active === 'Documents'">
          <h3>Documents</h3>
          <div class="uploader" @dragover.prevent @drop.prevent="handleDrop">
            Glisser-déposer des fichiers ici ou <input type="file" multiple @change="handleFiles" />
          </div>
          <div class="files">
            <div v-for="f in files" :key="f.name" class="file-item">
              <div class="thumb">📄</div>
              <div class="info">
                <div class="name">{{ f.name }}</div>
                <div class="actions">
                  <button @click="preview(f)" class="btn small">Prévisualiser</button>
                  <button @click="download(f)" class="btn small">Télécharger</button>
                  <button @click="linkToDossier(f)" class="btn small">Lier au dossier</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="active !== 'Défunt' && active !== 'Documents'">
          <p>Onglet {{ active }} (contenu mock)</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { dossiers as mockData } from '../data/dossiersMock';

const route = useRoute();
const dossier = ref(null);

const load = () => {
  const id = Number(route.params.id);
  dossier.value = mockData.find(d => d.id === id) || null;
};

load();

const tabs = ['Résumé','Défunt','Pouvoirs','Sépulture','Transport','Soins','Mise en bière','Cérémonie','Inhumation','Documents','Signatures','Historique'];
const active = ref('Défunt');

const files = ref([
  { name: 'acte_deces.pdf', size: 12345 },
  { name: 'carte_id.jpg', size: 23456 }
]);

const handleFiles = (e) => {
  const list = Array.from(e.target.files || e.dataTransfer?.files || []);
  list.forEach(f => files.value.push({ name: f.name, size: f.size, raw: f }));
};

const handleDrop = (e) => {
  const list = Array.from(e.dataTransfer.files || []);
  list.forEach(f => files.value.push({ name: f.name, size: f.size, raw: f }));
};

const preview = (f) => alert('Preview ' + f.name);
const download = (f) => alert('Download ' + f.name);
const linkToDossier = (f) => alert('Linked ' + f.name);
</script>

<style scoped>
.dossier-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:1rem 0;
  border-bottom:1px solid #eee;
}
.dossier-header .meta { color:#6b7280; }
.tabs { display:flex; gap:0.5rem; margin:1rem 0; }
.tab { padding:0.4rem 0.6rem; background:#f3f4f6; border-radius:4px; cursor:pointer; }
.tab.active { background:#e2e8f0; font-weight:600; }
.tab-content { padding:1rem 0; }
.grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.5rem; }
.uploader { padding:1rem; border:2px dashed #cbd5e1; border-radius:6px; text-align:center; margin-bottom:1rem; }
.files { display:flex; flex-direction:column; gap:0.5rem; }
.file-item { display:flex; gap:0.5rem; align-items:center; padding:0.5rem; border:1px solid #e5e7eb; border-radius:6px; }
.thumb { font-size:1.5rem; }
.info .name { font-weight:600; }
.info .actions { display:flex; gap:0.5rem; margin-top:0.25rem; }
</style>