
<template>
  <HeaderBar />
  <div class="main-layout">
    <Sidebar />
    <div class="main-content">
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import HeaderBar from '../components/HeaderBar.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  background: #f7fafc;
}
.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
main {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>