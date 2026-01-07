import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    general: {
      companyName: 'JD Eletronicos',
      cnpj: '12.345.678/0001-90',
      email: 'contato@jdeletronicos.com.br',
      phone: '(11) 3456-7890',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      website: 'www.jdeletronicos.com.br'
    },
    preferences: {
      language: 'pt-BR',
      currency: 'BRL',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      timezone: 'America/Sao_Paulo',
      theme: 'light',
      itemsPerPage: 20
    },
    notifications: {
      emailNotifications: true,
      salesNotifications: true,
      lowStockAlerts: true,
      appointmentReminders: true,
      weeklyReports: true,
      monthlyReports: false
    },
    inventory: {
      autoUpdateStock: true,
      lowStockThreshold: 10,
      criticalStockThreshold: 5,
      enableAlerts: true,
      alertEmail: 'estoque@jdeletronicos.com.br'
    },
    sales: {
      defaultPaymentMethod: 'Cartão de Crédito',
      allowDiscounts: true,
      maxDiscountPercent: 20,
      requireClientInfo: true,
      autoGenerateInvoice: false
    },
    security: {
      sessionTimeout: 30,
      requirePasswordChange: false,
      twoFactorAuth: false,
      loginAttempts: 5
    }
  }),
  getters: {
    getSetting: (state) => (category, key) => {
      return state[category]?.[key]
    },
    allSettings: (state) => state
  },
  actions: {
    updateGeneral(updates) {
      this.general = { ...this.general, ...updates }
    },
    updatePreferences(updates) {
      this.preferences = { ...this.preferences, ...updates }
    },
    updateNotifications(updates) {
      this.notifications = { ...this.notifications, ...updates }
    },
    updateInventory(updates) {
      this.inventory = { ...this.inventory, ...updates }
    },
    updateSales(updates) {
      this.sales = { ...this.sales, ...updates }
    },
    updateSecurity(updates) {
      this.security = { ...this.security, ...updates }
    },
    resetSettings() {
      // Resetar para valores padrão
      this.$reset()
    }
  }
})

