import { defineStore } from 'pinia'
import { useSalesStore } from './sales'

export const useFinancialStore = defineStore('financial', {
  state: () => ({
    accountsPayable: [
      {
        id: 1,
        description: 'Fornecedor - Apple Brasil',
        category: 'Fornecedores',
        dueDate: '2024-01-20',
        amount: 45000.00,
        paidAmount: 0,
        status: 'pendente',
        paymentMethod: null,
        paidAt: null,
        notes: 'Compra de produtos iPhone'
      },
      {
        id: 2,
        description: 'Aluguel - Loja',
        category: 'Despesas Fixas',
        dueDate: '2024-01-25',
        amount: 3500.00,
        paidAmount: 3500.00,
        status: 'paga',
        paymentMethod: 'PIX',
        paidAt: '2024-01-10',
        notes: 'Aluguel de janeiro'
      },
      {
        id: 3,
        description: 'Energia Elétrica',
        category: 'Utilidades',
        dueDate: '2024-01-18',
        amount: 850.00,
        paidAmount: 0,
        status: 'pendente',
        paymentMethod: null,
        paidAt: null,
        notes: 'Conta de luz'
      },
      {
        id: 4,
        description: 'Fornecedor - Samsung Brasil',
        category: 'Fornecedores',
        dueDate: '2024-01-22',
        amount: 28000.00,
        paidAmount: 0,
        status: 'pendente',
        paymentMethod: null,
        paidAt: null,
        notes: 'Compra de produtos Galaxy'
      },
      {
        id: 5,
        description: 'Marketing Digital',
        category: 'Marketing',
        dueDate: '2024-01-19',
        amount: 2500.00,
        paidAmount: 2500.00,
        status: 'paga',
        paymentMethod: 'Cartão de Crédito',
        paidAt: '2024-01-15',
        notes: 'Campanha Google Ads'
      }
    ],
    accountsReceivable: [
      {
        id: 1,
        clientName: 'João Silva',
        clientId: 1,
        description: 'Venda VND-001',
        category: 'Vendas',
        dueDate: '2024-01-25',
        amount: 8999.00,
        receivedAmount: 0,
        status: 'pendente',
        paymentMethod: null,
        receivedAt: null,
        notes: 'Venda de iPhone 15 Pro Max'
      },
      {
        id: 2,
        clientName: 'Maria Santos',
        clientId: 2,
        description: 'Venda VND-002',
        category: 'Vendas',
        dueDate: '2024-01-15',
        amount: 21198.00,
        receivedAmount: 21198.00,
        status: 'recebida',
        paymentMethod: 'PIX',
        receivedAt: '2024-01-15',
        notes: 'Venda de MacBook Pro e AirPods'
      },
      {
        id: 3,
        clientName: 'Ana Oliveira',
        clientId: 4,
        description: 'Venda VND-012',
        category: 'Vendas',
        dueDate: '2024-02-05',
        amount: 8999.00,
        receivedAmount: 0,
        status: 'pendente',
        paymentMethod: 'Boleto',
        receivedAt: null,
        notes: 'Venda de Notebook Lenovo'
      },
      {
        id: 4,
        clientName: 'Pedro Costa',
        clientId: 3,
        description: 'Venda VND-003',
        category: 'Vendas',
        dueDate: '2024-01-15',
        amount: 7499.00,
        receivedAmount: 7499.00,
        status: 'recebida',
        paymentMethod: 'Cartão de Débito',
        receivedAt: '2024-01-15',
        notes: 'Venda de Samsung Galaxy S24'
      }
    ],
    cashFlow: [],
    filters: {
      status: 'all',
      category: 'all',
      dateRange: 'all',
      search: ''
    }
  }),
  getters: {
    totalPayable: (state) => {
      return state.accountsPayable
        .filter(account => account.status === 'pendente')
        .reduce((sum, account) => sum + (account.amount - account.paidAmount), 0)
    },
    totalPaid: (state) => {
      return state.accountsPayable
        .filter(account => account.status === 'paga')
        .reduce((sum, account) => sum + account.paidAmount, 0)
    },
    totalReceivable: (state) => {
      return state.accountsReceivable
        .filter(account => account.status === 'pendente')
        .reduce((sum, account) => sum + (account.amount - account.receivedAmount), 0)
    },
    totalReceived: (state) => {
      return state.accountsReceivable
        .filter(account => account.status === 'recebida')
        .reduce((sum, account) => sum + account.receivedAmount, 0)
    },
    netCashFlow: (state) => {
      const received = state.accountsReceivable
        .filter(account => account.status === 'recebida')
        .reduce((sum, account) => sum + account.receivedAmount, 0)
      const paid = state.accountsPayable
        .filter(account => account.status === 'paga')
        .reduce((sum, account) => sum + account.paidAmount, 0)
      return received - paid
    },
    filteredPayable: (state) => {
      let filtered = state.accountsPayable

      if (state.filters.status !== 'all') {
        filtered = filtered.filter(account => account.status === state.filters.status)
      }

      if (state.filters.category !== 'all') {
        filtered = filtered.filter(account => account.category === state.filters.category)
      }

      if (state.filters.search) {
        const search = state.filters.search.toLowerCase()
        filtered = filtered.filter(account =>
          account.description.toLowerCase().includes(search) ||
          account.category.toLowerCase().includes(search)
        )
      }

      return filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    },
    filteredReceivable: (state) => {
      let filtered = state.accountsReceivable

      if (state.filters.status !== 'all') {
        filtered = filtered.filter(account => account.status === state.filters.status)
      }

      if (state.filters.category !== 'all') {
        filtered = filtered.filter(account => account.category === state.filters.category)
      }

      if (state.filters.search) {
        const search = state.filters.search.toLowerCase()
        filtered = filtered.filter(account =>
          account.description.toLowerCase().includes(search) ||
          account.clientName.toLowerCase().includes(search) ||
          account.category.toLowerCase().includes(search)
        )
      }

      return filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    },
    overduePayable: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.accountsPayable.filter(account =>
        account.status === 'pendente' && account.dueDate < today
      )
    },
    overdueReceivable: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.accountsReceivable.filter(account =>
        account.status === 'pendente' && account.dueDate < today
      )
    },
    categoriesPayable: (state) => {
      return ['all', ...new Set(state.accountsPayable.map(account => account.category))]
    },
    categoriesReceivable: (state) => {
      return ['all', ...new Set(state.accountsReceivable.map(account => account.category))]
    }
  },
  actions: {
    setStatusFilter(status) {
      this.filters.status = status
    },
    setCategoryFilter(category) {
      this.filters.category = category
    },
    setSearchFilter(search) {
      this.filters.search = search
    },
    addPayable(account) {
      this.accountsPayable.push({
        id: Date.now(),
        ...account,
        status: 'pendente',
        paidAmount: 0,
        paymentMethod: null,
        paidAt: null
      })
    },
    payAccount(accountId, paymentData) {
      const account = this.accountsPayable.find(a => a.id === accountId)
      if (account) {
        account.paidAmount = paymentData.amount
        account.status = 'paga'
        account.paymentMethod = paymentData.paymentMethod
        account.paidAt = paymentData.paidAt || new Date().toISOString().split('T')[0]
      }
    },
    addReceivable(account) {
      this.accountsReceivable.push({
        id: Date.now(),
        ...account,
        status: 'pendente',
        receivedAmount: 0,
        paymentMethod: null,
        receivedAt: null
      })
    },
    receiveAccount(accountId, paymentData) {
      const account = this.accountsReceivable.find(a => a.id === accountId)
      if (account) {
        account.receivedAmount = paymentData.amount
        account.status = 'recebida'
        account.paymentMethod = paymentData.paymentMethod
        account.receivedAt = paymentData.receivedAt || new Date().toISOString().split('T')[0]
      }
    },
    deletePayable(accountId) {
      const index = this.accountsPayable.findIndex(a => a.id === accountId)
      if (index > -1) {
        this.accountsPayable.splice(index, 1)
      }
    },
    deleteReceivable(accountId) {
      const index = this.accountsReceivable.findIndex(a => a.id === accountId)
      if (index > -1) {
        this.accountsReceivable.splice(index, 1)
      }
    }
  }
})

