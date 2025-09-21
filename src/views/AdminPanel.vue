<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">Administration SaaS</h2>

    <div class="mb-6">
      <h3 class="font-semibold mb-2">Entreprises clientes</h3>
      <input v-model="newTenant.name" placeholder="Nom entreprise" class="border rounded px-2 py-1 mb-2" />
      <button @click="createTenant" class="bg-blue-600 text-white px-3 py-1 rounded">Créer</button>

      <ul class="mt-4">
        <li v-for="tenant in tenants" :key="tenant.id">
          {{ tenant.name }}
          <button @click="deleteTenant(tenant.id)" class="bg-red-500 text-white px-2 py-1 ml-2 rounded">Supprimer</button>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="font-semibold mb-2">Utilisateurs</h3>
      <input v-model="newUser.username" placeholder="Nom utilisateur" class="border rounded px-2 py-1 mb-2" />
      <input v-model="newUser.email" placeholder="Email" class="border rounded px-2 py-1 mb-2" />
      <select v-model="newUser.role" class="border rounded px-2 py-1 mb-2">
        <option value="ADMIN">ADMIN</option>
        <option value="MANAGER">MANAGER</option>
        <option value="USER">USER</option>
      </select>
      <button @click="createUser" class="bg-blue-600 text-white px-3 py-1 rounded">Créer</button>

      <ul class="mt-4">
        <li v-for="user in users" :key="user.id">
          {{ user.username }} - {{ user.role }}
          <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1 ml-2 rounded">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const tenants = ref([]);
const users = ref([]);
const newTenant = ref({ name: '' });
const newUser = ref({ username: '', email: '', role: 'USER' });

const fetchTenants = async () => {
  try {
    const res = await api.get('/admin/tenants');
    tenants.value = res.data;
  } catch(err) { console.error(err); }
};

const fetchUsers = async () => {
  try {
    const res = await api.get('/users');
    users.value = res.data;
  } catch(err) { console.error(err); }
};

const createTenant = async () => {
  try {
    await api.post('/admin/tenants', newTenant.value);
    newTenant.value.name = '';
    fetchTenants();
  } catch(err) { console.error(err); }
};

const deleteTenant = async (id) => {
  try {
    await api.delete(`/admin/tenants/${id}`);
    fetchTenants();
  } catch(err) { console.error(err); }
};

const createUser = async () => {
  try {
    await api.post('/users', newUser.value);
    newUser.value = { username: '', email: '', role: 'USER' };
    fetchUsers();
  } catch(err) { console.error(err); }
};

const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    fetchUsers();
  } catch(err) { console.error(err); }
};

onMounted(() => {
  fetchTenants();
  fetchUsers();
});
</script>