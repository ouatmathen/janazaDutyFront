<template>
  <aside class="w-16 hover:w-56 bg-white shadow-lg transition-all duration-200 flex flex-col">
    <nav class="flex-1">
      <ul>
        <li v-for="item in menu" :key="item.name" class="group">
          <router-link :to="item.to" class="flex items-center p-3 hover:bg-gray-200">
            <item.icon class="w-6 h-6" />
            <span class="ml-3 hidden group-hover:block">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { HomeIcon, FolderIcon, DocumentIcon, PencilIcon, Cog6ToothIcon, UsersIcon } from '@heroicons/vue/24/outline'

const menu = [
  { name: 'Dashboard', label: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Dossiers', label: 'Dossiers', to: '/dossiers', icon: FolderIcon },
  { name: 'DossierCreate', label: 'Nouveau Dossier', to: '/dossiers/nouveau', icon: PencilIcon },
  { name: 'Documents', label: 'Documents', to: '/documents', icon: DocumentIcon },
  { name: 'Signatures', label: 'Signatures', to: '/signatures', icon: DocumentIcon },
  { name: 'Users', label: 'Utilisateurs', to: '/users', icon: UsersIcon },
  { name: 'Settings', label: 'Paramètres', to: '/settings', icon: Cog6ToothIcon }
]
</script>