import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: {
      email: localStorage.getItem('userEmail') || '',
      name: 'Administrador',
      role: 'admin'
    }
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user
  },
  actions: {
    login(email, password) {
      // Autenticação mockada
      // Aceita login tradicional ou OAuth (quando password é 'oauth')
      if (password === 'oauth' || (email === 'admin@atlas.com' && password === 'admin123')) {
        this.isAuthenticated = true
        this.user.email = email
        this.user.name = email.includes('@') ? email.split('@')[0] : 'Usuário'
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', email)
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      this.user = {
        email: '',
        name: '',
        role: ''
      }
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userEmail')
    }
  }
})

