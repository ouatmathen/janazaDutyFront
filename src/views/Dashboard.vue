<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Tableau de bord</h2>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-500 text-white p-4 rounded">
        Total Dossiers: {{ stats.totalDossiers }}
      </div>
      <div class="bg-green-500 text-white p-4 rounded">
        Dossiers Signés: {{ stats.signedDossiers }}
      </div>
      <div class="bg-yellow-500 text-white p-4 rounded">
        Dossiers en cours: {{ stats.pendingDossiers }}
      </div>
    </div>

    <!-- Notifications -->
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Notifications récentes</h3>
      <ul>
        <li v-for="note in notifications" :key="note.id" class="border-b py-1">
          {{ note.message }} - {{ note.date }}
        </li>
      </ul>
    </div>

    <!-- Liens rapides -->
    <div>
      <h3 class="font-semibold mb-2">Accès rapide</h3>
      <div class="flex gap-2">
        <router-link to="/dossiers" class="bg-blue-600 text-white px-3 py-2 rounded">
          Gérer Dossiers
        </router-link>
        <router-link to="/documents" class="bg-green-600 text-white px-3 py-2 rounded">
          Documents
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();

// Stats et notifications
const stats = ref({
  totalDossiers: 0,
  signedDossiers: 0,
  pendingDossiers: 0,
});
const notifications = ref([]);

onMounted(async () => {
  try {
    // Exemple: appel backend pour stats
    const resStats = await api.get("/dossiers/stats");
    stats.value = resStats.data;

    // Exemple: appel backend pour notifications
    const resNotes = await api.get("/notifications");
    notifications.value = resNotes.data;
  } catch (e) {
    console.error("Erreur lors du chargement du tableau de bord :", e);
  }
});
</script>
