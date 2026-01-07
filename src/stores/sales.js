import { defineStore } from 'pinia'

export const useSalesStore = defineStore('sales', {
  state: () => ({
    sales: [
      {
        id: 1,
        saleNumber: 'VND-001',
        clientName: 'João Silva',
        clientId: 1,
        date: '2024-01-15',
        time: '09:30',
        items: [
          { product: 'iPhone 15 Pro Max', quantity: 1, price: 8999.00 }
        ],
        total: 8999.00,
        status: 'concluida',
        paymentMethod: 'Cartão de Crédito',
        discount: 0
      },
      {
        id: 2,
        saleNumber: 'VND-002',
        clientName: 'Maria Santos',
        clientId: 2,
        date: '2024-01-15',
        time: '10:45',
        items: [
          { product: 'MacBook Pro M3', quantity: 1, price: 18999.00 },
          { product: 'AirPods Pro 2', quantity: 1, price: 2199.00 }
        ],
        total: 21198.00,
        status: 'concluida',
        paymentMethod: 'PIX',
        discount: 500.00
      },
      {
        id: 3,
        saleNumber: 'VND-003',
        clientName: 'Pedro Costa',
        clientId: 3,
        date: '2024-01-15',
        time: '14:20',
        items: [
          { product: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 7499.00 }
        ],
        total: 7499.00,
        status: 'concluida',
        paymentMethod: 'Cartão de Débito',
        discount: 0
      },
      {
        id: 4,
        saleNumber: 'VND-004',
        clientName: 'Ana Oliveira',
        clientId: 4,
        date: '2024-01-16',
        time: '11:15',
        items: [
          { product: 'iPad Air 5ª Geração', quantity: 2, price: 4299.00 },
          { product: 'Apple Watch Series 9', quantity: 1, price: 3299.00 }
        ],
        total: 11897.00,
        status: 'concluida',
        paymentMethod: 'Cartão de Crédito',
        discount: 300.00
      },
      {
        id: 5,
        saleNumber: 'VND-005',
        clientName: 'Carlos Mendes',
        clientId: 5,
        date: '2024-01-16',
        time: '15:30',
        items: [
          { product: 'Notebook Dell XPS 15', quantity: 1, price: 12999.00 }
        ],
        total: 12999.00,
        status: 'pendente',
        paymentMethod: 'Boleto',
        discount: 0
      },
      {
        id: 6,
        saleNumber: 'VND-006',
        clientName: 'Roberto Alves',
        clientId: 7,
        date: '2024-01-16',
        time: '16:45',
        items: [
          { product: 'Monitor LG UltraWide 34"', quantity: 1, price: 3499.00 },
          { product: 'Teclado Mecânico Logitech', quantity: 1, price: 899.00 },
          { product: 'Mouse Logitech MX Master 3', quantity: 1, price: 699.00 }
        ],
        total: 5097.00,
        status: 'concluida',
        paymentMethod: 'PIX',
        discount: 200.00
      },
      {
        id: 7,
        saleNumber: 'VND-007',
        clientName: 'Lucas Ferreira',
        clientId: 8,
        date: '2024-01-17',
        time: '09:00',
        items: [
          { product: 'PlayStation 5', quantity: 1, price: 4499.00 }
        ],
        total: 4499.00,
        status: 'concluida',
        paymentMethod: 'Cartão de Crédito',
        discount: 0
      },
      {
        id: 8,
        saleNumber: 'VND-008',
        clientName: 'Rafael Souza',
        clientId: 10,
        date: '2024-01-17',
        time: '13:20',
        items: [
          { product: 'Xbox Series X', quantity: 1, price: 4999.00 },
          { product: 'Smart TV Samsung 65"', quantity: 1, price: 6999.00 }
        ],
        total: 11998.00,
        status: 'concluida',
        paymentMethod: 'Cartão de Crédito',
        discount: 1000.00
      },
      {
        id: 9,
        saleNumber: 'VND-009',
        clientName: 'Patricia Gomes',
        clientId: 11,
        date: '2024-01-17',
        time: '14:50',
        items: [
          { product: 'MacBook Pro M3', quantity: 1, price: 18999.00 },
          { product: 'AirPods Pro 2', quantity: 1, price: 2199.00 },
          { product: 'Apple Watch Series 9', quantity: 1, price: 3299.00 }
        ],
        total: 24497.00,
        status: 'concluida',
        paymentMethod: 'PIX',
        discount: 1500.00
      },
      {
        id: 10,
        saleNumber: 'VND-010',
        clientName: 'Juliana Rocha',
        clientId: 9,
        date: '2024-01-18',
        time: '10:30',
        items: [
          { product: 'Nintendo Switch OLED', quantity: 1, price: 2499.00 }
        ],
        total: 2499.00,
        status: 'cancelada',
        paymentMethod: 'Cartão de Crédito',
        discount: 0
      },
      {
        id: 11,
        saleNumber: 'VND-011',
        clientName: 'Fernanda Lima',
        clientId: 6,
        date: '2024-01-18',
        time: '11:45',
        items: [
          { product: 'Samsung Galaxy Watch 6', quantity: 1, price: 1999.00 }
        ],
        total: 1999.00,
        status: 'concluida',
        paymentMethod: 'Cartão de Débito',
        discount: 0
      },
      {
        id: 12,
        saleNumber: 'VND-012',
        clientName: 'Ana Oliveira',
        clientId: 4,
        date: '2024-01-18',
        time: '15:20',
        items: [
          { product: 'Notebook Lenovo ThinkPad', quantity: 1, price: 8999.00 }
        ],
        total: 8999.00,
        status: 'pendente',
        paymentMethod: 'Boleto',
        discount: 500.00
      }
    ],
    filters: {
      status: 'all',
      dateRange: 'all',
      search: ''
    }
  }),
  getters: {
    getSaleById: (state) => (id) => {
      return state.sales.find(sale => sale.id === id)
    },
    filteredSales: (state) => {
      let filtered = state.sales

      // Filtrar por status
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(sale => sale.status === state.filters.status)
      }

      // Filtrar por busca
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(sale =>
          sale.saleNumber.toLowerCase().includes(searchLower) ||
          sale.clientName.toLowerCase().includes(searchLower) ||
          sale.items.some(item => item.product.toLowerCase().includes(searchLower))
        )
      }

      // Ordenar por data mais recente
      return filtered.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`)
        const dateB = new Date(`${b.date} ${b.time}`)
        return dateB - dateA
      })
    },
    totalSales: (state) => state.sales.length,
    completedSales: (state) => state.sales.filter(s => s.status === 'concluida').length,
    pendingSales: (state) => state.sales.filter(s => s.status === 'pendente').length,
    cancelledSales: (state) => state.sales.filter(s => s.status === 'cancelada').length,
    totalRevenue: (state) => {
      return state.sales
        .filter(s => s.status === 'concluida')
        .reduce((sum, sale) => sum + sale.total, 0)
    },
    todaySales: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.sales.filter(s => s.date === today && s.status === 'concluida')
    },
    todayRevenue: (state) => {
      return state.todaySales.reduce((sum, sale) => sum + sale.total, 0)
    }
  },
  actions: {
    setStatusFilter(status) {
      this.filters.status = status
    },
    setSearchFilter(search) {
      this.filters.search = search
    },
    addSale(sale) {
      const newSale = {
        id: Date.now(),
        saleNumber: `VND-${String(this.sales.length + 1).padStart(3, '0')}`,
        ...sale,
        status: 'pendente'
      }
      this.sales.push(newSale)
    },
    updateSaleStatus(id, status) {
      const sale = this.sales.find(s => s.id === id)
      if (sale) {
        sale.status = status
      }
    },
    cancelSale(id) {
      const sale = this.sales.find(s => s.id === id)
      if (sale) {
        sale.status = 'cancelada'
      }
    }
  }
})

