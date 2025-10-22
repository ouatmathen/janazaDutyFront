<template>
  <aside :class="['sidebar', collapsed ? 'sidebar-collapsed' : 'sidebar-expanded']">
    <button class="sidebar-toggle" @click="collapsed = !collapsed">
      <span v-if="collapsed">&gt;&gt;</span>
      <span v-else>&lt;&lt;</span>
    </button>
    <nav class="flex-1">
      <ul>
        <li v-for="item in menu" :key="item.name">
          <SidebarItem :icon="item.icon" :text="item.label" :to="item.to" :collapsed="collapsed" />
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import SidebarItem from './SidebarItem.vue';
import { HomeIcon, FolderIcon, DocumentIcon, PencilIcon, Cog6ToothIcon, UsersIcon } from '@heroicons/vue/24/outline';

const collapsed = ref(false);
const menu = [
  { name: 'Dashboard', label: 'Tableau de bord', to: '/', icon: HomeIcon },
  { name: 'Dossiers', label: 'Dossiers', to: '/dossiers', icon: FolderIcon },
  { name: 'DossierCreate', label: 'Nouveau Dossier', to: '/dossiers/nouveau', icon: PencilIcon },
  { name: 'Documents', label: 'Documents', to: '/documents', icon: DocumentIcon },
  { name: 'Signatures', label: 'Signatures', to: '/signatures', icon: DocumentIcon },
  { name: 'Users', label: 'Utilisateurs', to: '/users', icon: UsersIcon },
  { name: 'Settings', label: 'Paramètres', to: '/settings', icon: Cog6ToothIcon }
];
</script>
<style src="./Sidebar.css" scoped></style>