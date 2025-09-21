import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Dossiers from '../views/Dossiers.vue'
import DossierCreate from '../views/DossierCreate.vue'
import Documents from '../views/Documents.vue'
import Signatures from '../views/Signatures.vue'
import Users from '../views/Users.vue'
import Settings from '../views/Settings.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
      { path: 'dossiers', name: 'Dossiers', component: Dossiers, meta: { requiresAuth: true } },
      { path: 'dossiers/nouveau', name: 'DossierCreate', component: DossierCreate, meta: { requiresAuth: true } },
      { path: 'documents', name: 'Documents', component: Documents, meta: { requiresAuth: true } },
      { path: 'signatures', name: 'Signatures', component: Signatures, meta: { requiresAuth: true } },
      { path: 'users', name: 'Users', component: Users, meta: { requiresAuth: true } },
      { path: 'settings', name: 'Settings', component: Settings, meta: { requiresAuth: true } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router