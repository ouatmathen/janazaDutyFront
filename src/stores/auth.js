import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        async login(email, password) {
            try {
                const res = await api.post('/auth/login', { email, password });
                this.token = res.data.accessToken;
                this.user = { email }; // ou info user depuis backend
                localStorage.setItem("token", this.token);
            } catch(err) {
                throw new Error('Erreur login');
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("token");
        },
        isAuthenticated() {
            return !!this.token;
        }
    }
});