import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Création de l'application Vue
const app = createApp(App)

// Initialisation de Pinia
const pinia = createPinia()
app.use(pinia)

// Initialisation du router
app.use(router)

// Montage de l'application
app.mount('#app')