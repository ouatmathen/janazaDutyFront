<template>
  <header class="headerbar-root">
    <div class="headerbar-left">
      <h1 class="font-semibold text-lg">SaaS Pompes Funèbres</h1>
    </div>
    <div class="headerbar-center">
      <form class="headerbar-search-form">
        <input type="text" placeholder="Recherche..." class="headerbar-search-input" />
        <button type="button" class="bg-red-500 text-white px-3 py-1 rounded ml-2">+ Dossier</button>
      </form>
    </div>
    <div class="headerbar-right">
      <div class="w-8 h-8 bg-gray-400 rounded-full mr-4"></div>
      <LogoutButton />
    </div>
  </header>
</template>

<script setup>
import LogoutButton from './LogoutButton.vue';
</script>

<style scoped>
.headerbar-root {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 0.5rem 2rem;
}
.headerbar-left {
  flex: 0 0 auto;
}
.headerbar-center {
  flex: 1 1 0;
  display: flex;
  justify-content: center;
}
.headerbar-search-form {
  display: flex;
  align-items: center;
}
.headerbar-search-input {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  min-width: 220px;
}
.headerbar-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
</style>