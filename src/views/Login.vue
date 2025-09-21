<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow w-96">
      <h2 class="text-xl font-bold mb-4">Connexion</h2>
      <input v-model="email" type="email" placeholder="Email" class="w-full mb-3 border rounded px-3 py-2" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full mb-3 border rounded px-3 py-2" />
      <button class="bg-blue-600 text-white w-full py-2 rounded">Se connecter</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  error.value = null;
  try {
    await auth.login(email.value, password.value);
    router.push({ name: 'Dashboard' });
  } catch(err) {
    error.value = 'Email ou mot de passe incorrect';
  }
};
</script>