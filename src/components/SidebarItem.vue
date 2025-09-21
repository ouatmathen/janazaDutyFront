<template>
  <router-link :to="to" class="flex items-center px-4 py-2 hover:bg-gray-700">
    <i :class="`icon-${icon} mr-2`"></i>
    <span class="overflow-hidden whitespace-nowrap">{{ text }}</span>
  </router-link>
</template>

<script setup>
const props = defineProps({ icon: String, text: String, to: String });
</script>

// src/App.vue
<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>