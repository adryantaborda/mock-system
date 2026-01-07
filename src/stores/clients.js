import { defineStore } from 'pinia'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [
      {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        totalPurchases: 5,
        totalSpent: 45250.00,
        lastPurchase: '2024-01-05',
        status: 'ativo',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(11) 97654-3210',
        totalPurchases: 8,
        totalSpent: 78900.00,
        lastPurchase: '2024-01-10',
        status: 'ativo',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        id: 3,
        name: 'Pedro Costa',
        email: 'pedro.costa@email.com',
        phone: '(21) 96543-2109',
        totalPurchases: 3,
        totalSpent: 22497.00,
        lastPurchase: '2023-12-20',
        status: 'ativo',
        city: 'Rio de Janeiro',
        state: 'RJ'
      },
      {
        id: 4,
        name: 'Ana Oliveira',
        email: 'ana.oliveira@email.com',
        phone: '(11) 95432-1098',
        totalPurchases: 12,
        totalSpent: 125400.00,
        lastPurchase: '2024-01-12',
        status: 'ativo',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        id: 5,
        name: 'Carlos Mendes',
        email: 'carlos.mendes@email.com',
        phone: '(31) 94321-0987',
        totalPurchases: 6,
        totalSpent: 56994.00,
        lastPurchase: '2024-01-08',
        status: 'ativo',
        city: 'Belo Horizonte',
        state: 'MG'
      },
      {
        id: 6,
        name: 'Fernanda Lima',
        email: 'fernanda.lima@email.com',
        phone: '(11) 93210-9876',
        totalPurchases: 4,
        totalSpent: 8796.00,
        lastPurchase: '2023-11-15',
        status: 'inativo',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        id: 7,
        name: 'Roberto Alves',
        email: 'roberto.alves@email.com',
        phone: '(48) 92109-8765',
        totalPurchases: 7,
        totalSpent: 24493.00,
        lastPurchase: '2024-01-03',
        status: 'ativo',
        city: 'Florianópolis',
        state: 'SC'
      },
      {
        id: 8,
        name: 'Lucas Ferreira',
        email: 'lucas.ferreira@email.com',
        phone: '(51) 91098-7654',
        totalPurchases: 9,
        totalSpent: 40491.00,
        lastPurchase: '2024-01-11',
        status: 'ativo',
        city: 'Porto Alegre',
        state: 'RS'
      },
      {
        id: 9,
        name: 'Juliana Rocha',
        email: 'juliana.rocha@email.com',
        phone: '(11) 90987-6543',
        totalPurchases: 2,
        totalSpent: 13998.00,
        lastPurchase: '2023-10-25',
        status: 'inativo',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        id: 10,
        name: 'Rafael Souza',
        email: 'rafael.souza@email.com',
        phone: '(85) 89876-5432',
        totalPurchases: 11,
        totalSpent: 76989.00,
        lastPurchase: '2024-01-13',
        status: 'ativo',
        city: 'Fortaleza',
        state: 'CE'
      },
      {
        id: 11,
        name: 'Patricia Gomes',
        email: 'patricia.gomes@email.com',
        phone: '(41) 88765-4321',
        totalPurchases: 15,
        totalSpent: 134850.00,
        lastPurchase: '2024-01-14',
        status: 'ativo',
        city: 'Curitiba',
        state: 'PR'
      },
      {
        id: 12,
        name: 'Bruno Martins',
        email: 'bruno.martins@email.com',
        phone: '(11) 87654-3210',
        totalPurchases: 1,
        totalSpent: 8999.00,
        lastPurchase: '2023-09-10',
        status: 'inativo',
        city: 'São Paulo',
        state: 'SP'
      }
    ],
    filters: {
      status: 'all',
      search: ''
    }
  }),
  getters: {
    getClientById: (state) => (id) => {
      return state.clients.find(client => client.id === id)
    },
    filteredClients: (state) => {
      let filtered = state.clients

      // Filtrar por status
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(client => client.status === state.filters.status)
      }

      // Filtrar por busca
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(client =>
          client.name.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower) ||
          client.phone.includes(searchLower) ||
          client.city.toLowerCase().includes(searchLower)
        )
      }

      return filtered
    },
    totalClients: (state) => state.clients.length,
    activeClients: (state) => state.clients.filter(c => c.status === 'ativo').length,
    inactiveClients: (state) => state.clients.filter(c => c.status === 'inativo').length,
    totalRevenue: (state) => {
      return state.clients.reduce((sum, client) => sum + client.totalSpent, 0)
    }
  },
  actions: {
    setStatusFilter(status) {
      this.filters.status = status
    },
    setSearchFilter(search) {
      this.filters.search = search
    },
    addClient(client) {
      const newClient = {
        id: Date.now(),
        ...client,
        totalPurchases: 0,
        totalSpent: 0,
        status: 'ativo'
      }
      this.clients.push(newClient)
    },
    updateClient(id, updates) {
      const client = this.clients.find(c => c.id === id)
      if (client) {
        Object.assign(client, updates)
      }
    },
    deleteClient(id) {
      const index = this.clients.findIndex(c => c.id === id)
      if (index > -1) {
        this.clients.splice(index, 1)
      }
    }
  }
})

