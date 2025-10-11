
<template>
  <router-link :to="to" class="sidebar-item">
    <component :is="icon" :class="['sidebar-icon', collapsed ? 'sidebar-icon-collapsed' : 'sidebar-icon-expanded']" />
    <span v-if="!collapsed" class="sidebar-label overflow-hidden whitespace-nowrap">{{ text }}</span>
  </router-link>
</template>

<script setup>
const props = defineProps({
  icon: [Object, Function, String],
  text: String,
  to: String,
  collapsed: Boolean
});
</script>

<style src="./SidebarItem.css" scoped></style>