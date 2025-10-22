<template>
  <div class="dossiers-page">
    <section class="filter-bar">
      <input v-model="filters.search" placeholder="Recherche..." class="input" />
      <label>Date from <input type="date" v-model="filters.from" class="input-date" /></label>
      <label>To <input type="date" v-model="filters.to" class="input-date" /></label>
      <select v-model="filters.status" class="input-select">
        <option value="all">All</option>
        <option value="En cours">En cours</option>
        <option value="Terminé">Terminé</option>
      </select>
      <button @click="applyFilters" class="btn">Filtrer</button>
    </section>

    <section class="actions-bar">
      <div class="left-actions">
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
        <button @click="bulkDelete" class="btn danger" :disabled="!anySelected">Supprimer</button>
        <button @click="exportCsv" class="btn">Export CSV</button>
      </div>
      <div class="right-actions">
        <span>Afficher {{ pagedData.length }} / {{ filtered.length }}</span>
      </div>
    </section>

    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>N° dossier</th>
          <th>Nom défunt</th>
          <th>Date décès</th>
          <th>Statut</th>
          <th>Signatures</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pagedData" :key="item.id">
          <td><input type="checkbox" v-model="selected" :value="item.id" /></td>
          <td>{{ item.numero }}</td>
          <td>{{ item.nom }}</td>
          <td>{{ item.dateDeces }}</td>
          <td>{{ item.statut }}</td>
          <td>{{ item.signaturesDone }} / {{ item.signaturesTotal }}</td>
          <td><button @click="open(item)" class="btn small">Open</button></td>
        </tr>
      </tbody>
    </table>

    <section class="pager">
      <button @click="prevPage" :disabled="page===1">Prev</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page===totalPages">Next</button>
      <select v-model.number="perPage">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { dossiers as mockData } from '../data/dossiersMock';

const data = ref([
  { id: 1, numero: '2025-0001', nom: 'DUPONT, Jean', dateDeces: '2025-09-01', statut: 'En cours', signaturesDone: 1, signaturesTotal: 2 },
  { id: 2, numero: '2025-0002', nom: 'MARTIN, Claire', dateDeces: '2025-08-15', statut: 'Terminé', signaturesDone: 2, signaturesTotal: 2 },
  { id: 3, numero: '2025-0003', nom: 'LEGRAND, Paul', dateDeces: '2025-09-10', statut: 'En cours', signaturesDone: 0, signaturesTotal: 1 },
  // add more mock rows for pagination
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: 4 + i,
    numero: `2025-${String(4 + i).padStart(4, '0')}`,
    nom: `Client ${i + 1}`,
    dateDeces: '2025-09-01',
    statut: i % 2 === 0 ? 'En cours' : 'Terminé',
    signaturesDone: i % 3,
    signaturesTotal: 2
  }))
]);

const filters = ref({ search: '', from: '', to: '', status: 'all' });
const selected = ref([]);
const selectAll = ref(false);
const page = ref(1);
const perPage = ref(10);

const filtered = computed(() => {
  return data.value.filter((row) => {
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase();
      if (!row.nom.toLowerCase().includes(q) && !row.numero.toLowerCase().includes(q)) return false;
    }
    if (filters.value.status !== 'all' && row.statut !== filters.value.status) return false;
    if (filters.value.from && row.dateDeces < filters.value.from) return false;
    if (filters.value.to && row.dateDeces > filters.value.to) return false;
    return true;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage.value)));

const pagedData = computed(() => {
  const start = (page.value - 1) * perPage.value;
  return filtered.value.slice(start, start + perPage.value);
});

watch([perPage, filtered], () => (page.value = 1));

const applyFilters = () => { page.value = 1; };

const anySelected = computed(() => selected.value.length > 0);

const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = pagedData.value.map((r) => r.id);
  } else {
    selected.value = [];
  }
};

const bulkDelete = () => {
  if (!confirm('Supprimer les éléments sélectionnés ?')) return;
  data.value = data.value.filter((r) => !selected.value.includes(r.id));
  selected.value = [];
  selectAll.value = false;
};

const exportCsv = () => {
  const rows = filtered.value;
  const csv = ["id,numero,nom,dateDeces,statut,signaturesDone,signaturesTotal", ...rows.map(r => `${r.id},${r.numero},${r.nom},${r.dateDeces},${r.statut},${r.signaturesDone},${r.signaturesTotal}`)].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dossiers.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const router = useRouter();
const open = (item) => {
  router.push({ name: 'DossierDetail', params: { id: item.id } });
};

const prevPage = () => { if (page.value > 1) page.value -= 1; };
const nextPage = () => { if (page.value < totalPages.value) page.value += 1; };

</script>

<style scoped>
.dossiers-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.filter-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.input { padding: 0.4rem 0.6rem; }
.input-date { padding: 0.25rem; }
.input-select { padding: 0.35rem; }
.btn { padding: 0.4rem 0.6rem; border-radius: 4px; background: #e2e8f0; border: none; cursor: pointer; }
.btn.small { padding: 0.2rem 0.4rem; }
.btn.danger { background: #f87171; color: white; }

.table { width: 100%; border-collapse: collapse; }
.table th, .table td { border: 1px solid #e5e7eb; padding: 0.5rem; text-align: left; }
.pager { display:flex; gap:1rem; align-items:center; }
.actions-bar { display:flex; justify-content:space-between; align-items:center; }
</style>