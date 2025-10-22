<template>
  <div class="users-page">
    <div class="topbar">
      <div>
        <button class="btn" @click="openInvite">Invite user</button>
        <button class="btn" @click="importCsv">Import CSV</button>
        <button class="btn" @click="createRole">Create role</button>
      </div>
      <div>
        <input v-model="search" placeholder="Recherche..." class="input" />
      </div>
    </div>

    <div class="content">
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle(s)</th>
              <th>Statut</th>
              <th>Dernière connexion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filtered" :key="u.id">
              <td>{{ u.nom }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.roles.join(', ') }}</td>
              <td>{{ u.status }}</td>
              <td>{{ u.lastLogin || '-' }}</td>
              <td>
                <button class="btn small" @click="editUser(u)">Edit</button>
                <button class="btn small" @click="manageRoles(u)">Roles</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside class="role-editor">
        <h3>Role editor</h3>
        <label>Nom rôle <input v-model="role.name" class="input" /></label>
        <div class="perms">
          <h4>Permissions</h4>
          <div v-for="module in modules" :key="module">
            <strong>{{ module }}</strong>
            <div class="perm-row">
              <label v-for="p in permOptions" :key="p"><input type="checkbox" v-model="role.perms[module]" :value="p" /> {{ p }}</label>
            </div>
          </div>
        </div>
        <div class="scope">
          <h4>Scope</h4>
          <select v-model="role.scope">
            <option value="global">Global</option>
            <option value="local">Local</option>
          </select>
        </div>
        <div class="role-actions">
          <button class="btn" @click="saveRole">Save</button>
        </div>
      </aside>
    </div>

    <!-- invite modal (simple) -->
    <div v-if="showInvite" class="modal">
      <div class="modal-content">
        <h3>Invite user</h3>
        <input v-model="inviteEmail" placeholder="Email" class="input" />
        <button class="btn" @click="sendInvite">Send invite</button>
        <button class="btn" @click="showInvite=false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const users = ref([
  { id:1, nom: 'Dupont Jean', email:'jean.dupont@example.com', roles:['Admin'], status:'Active', lastLogin:'2025-10-01' },
  { id:2, nom: 'Martin Claire', email:'claire.martin@example.com', roles:['User'], status:'Active', lastLogin:null }
]);

const search = ref('');
const filtered = computed(() => users.value.filter(u => u.nom.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase())));

const showInvite = ref(false);
const inviteEmail = ref('');
const openInvite = () => { showInvite.value = true; };
const sendInvite = () => { alert('Invited ' + inviteEmail.value); showInvite.value = false; inviteEmail.value = ''; };
const importCsv = () => alert('Import CSV (stub)');
const createRole = () => { role.name=''; role.perms = modules.reduce((acc,m)=>{ acc[m]=[]; return acc; },{}); role.scope='global'; };

const editUser = (u) => alert('Edit ' + u.nom);
const manageRoles = (u) => alert('Manage roles for ' + u.nom);

const modules = ['Dossiers','Documents','Users','Settings'];
const permOptions = ['read','write','delete','export'];
const role = ref({ name:'Editor', perms: modules.reduce((acc,m)=>{ acc[m]=['read']; return acc; },{}), scope: 'global' });

const saveRole = () => alert('Role saved: ' + role.value.name);
</script>

<style scoped>
.users-page { display:flex; flex-direction:column; gap:1rem; }
.topbar { display:flex; justify-content:space-between; align-items:center; }
.content { display:flex; gap:1rem; }
.table-wrap { flex:2; }
.table { width:100%; border-collapse:collapse; }
.table th, .table td { border:1px solid #e5e7eb; padding:0.5rem; }
.role-editor { width:320px; background:#fff; padding:1rem; border:1px solid #e5e7eb; border-radius:6px; }
.perm-row { display:flex; gap:0.5rem; }
.modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.4); }
.modal-content { background:#fff; padding:1rem; border-radius:6px; width:320px; }
.input { padding:0.4rem; margin:0.3rem 0; width:100%; }
.btn { padding:0.4rem 0.6rem; border-radius:4px; background:#e2e8f0; border:none; cursor:pointer; }
.btn.small { padding:0.2rem 0.4rem; }
</style>