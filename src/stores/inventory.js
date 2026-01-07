import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        sku: 'IPH-15PM-256',
        category: 'Smartphones',
        currentStock: 15,
        minStock: 10,
        maxStock: 50,
        unitPrice: 8999.00,
        totalValue: 134985.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Apple Brasil'
      },
      {
        id: 2,
        name: 'MacBook Pro M3',
        sku: 'MBP-M3-512',
        category: 'Notebooks',
        currentStock: 8,
        minStock: 5,
        maxStock: 30,
        unitPrice: 18999.00,
        totalValue: 151992.00,
        status: 'low',
        lastMovement: '2024-01-14',
        supplier: 'Apple Brasil'
      },
      {
        id: 3,
        name: 'Samsung Galaxy S24 Ultra',
        sku: 'SGS24U-256',
        category: 'Smartphones',
        currentStock: 12,
        minStock: 10,
        maxStock: 40,
        unitPrice: 7499.00,
        totalValue: 89988.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Samsung Brasil'
      },
      {
        id: 4,
        name: 'iPad Air 5ª Geração',
        sku: 'IPA-5G-64',
        category: 'Tablets',
        currentStock: 20,
        minStock: 15,
        maxStock: 60,
        unitPrice: 4299.00,
        totalValue: 85980.00,
        status: 'ok',
        lastMovement: '2024-01-13',
        supplier: 'Apple Brasil'
      },
      {
        id: 5,
        name: 'Notebook Dell XPS 15',
        sku: 'DXP-15-I7',
        category: 'Notebooks',
        currentStock: 6,
        minStock: 5,
        maxStock: 25,
        unitPrice: 12999.00,
        totalValue: 77994.00,
        status: 'low',
        lastMovement: '2024-01-12',
        supplier: 'Dell Brasil'
      },
      {
        id: 6,
        name: 'AirPods Pro 2',
        sku: 'APP-2-GEN',
        category: 'Acessórios',
        currentStock: 35,
        minStock: 20,
        maxStock: 100,
        unitPrice: 2199.00,
        totalValue: 76965.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Apple Brasil'
      },
      {
        id: 7,
        name: 'Smart TV Samsung 65"',
        sku: 'STV-S65-4K',
        category: 'TVs',
        currentStock: 10,
        minStock: 8,
        maxStock: 30,
        unitPrice: 6999.00,
        totalValue: 69990.00,
        status: 'ok',
        lastMovement: '2024-01-14',
        supplier: 'Samsung Brasil'
      },
      {
        id: 8,
        name: 'PlayStation 5',
        sku: 'PS5-STD-1TB',
        category: 'Gaming',
        currentStock: 18,
        minStock: 15,
        maxStock: 50,
        unitPrice: 4499.00,
        totalValue: 80982.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Sony Brasil'
      },
      {
        id: 9,
        name: 'Xbox Series X',
        sku: 'XBX-SX-1TB',
        category: 'Gaming',
        currentStock: 14,
        minStock: 12,
        maxStock: 40,
        unitPrice: 4999.00,
        totalValue: 69986.00,
        status: 'ok',
        lastMovement: '2024-01-13',
        supplier: 'Microsoft Brasil'
      },
      {
        id: 10,
        name: 'Monitor LG UltraWide 34"',
        sku: 'MLG-UW34-4K',
        category: 'Monitores',
        currentStock: 22,
        minStock: 10,
        maxStock: 50,
        unitPrice: 3499.00,
        totalValue: 76978.00,
        status: 'ok',
        lastMovement: '2024-01-14',
        supplier: 'LG Brasil'
      },
      {
        id: 11,
        name: 'Nintendo Switch OLED',
        sku: 'NSW-OLED-64',
        category: 'Gaming',
        currentStock: 25,
        minStock: 20,
        maxStock: 60,
        unitPrice: 2499.00,
        totalValue: 62475.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Nintendo Brasil'
      },
      {
        id: 12,
        name: 'Apple Watch Series 9',
        sku: 'AW-S9-45GPS',
        category: 'Wearables',
        currentStock: 30,
        minStock: 25,
        maxStock: 80,
        unitPrice: 3299.00,
        totalValue: 98970.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Apple Brasil'
      },
      {
        id: 13,
        name: 'Notebook Lenovo ThinkPad',
        sku: 'LTP-X1-I7',
        category: 'Notebooks',
        currentStock: 9,
        minStock: 5,
        maxStock: 30,
        unitPrice: 8999.00,
        totalValue: 80991.00,
        status: 'ok',
        lastMovement: '2024-01-12',
        supplier: 'Lenovo Brasil'
      },
      {
        id: 14,
        name: 'Samsung Galaxy Watch 6',
        sku: 'SGW-6-44MM',
        category: 'Wearables',
        currentStock: 28,
        minStock: 20,
        maxStock: 70,
        unitPrice: 1999.00,
        totalValue: 55972.00,
        status: 'ok',
        lastMovement: '2024-01-14',
        supplier: 'Samsung Brasil'
      },
      {
        id: 15,
        name: 'Teclado Mecânico Logitech',
        sku: 'TCL-LMX-KEYS',
        category: 'Acessórios',
        currentStock: 40,
        minStock: 30,
        maxStock: 150,
        unitPrice: 899.00,
        totalValue: 35960.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Logitech Brasil'
      },
      {
        id: 16,
        name: 'Mouse Logitech MX Master 3',
        sku: 'MSL-MX-M3',
        category: 'Acessórios',
        currentStock: 45,
        minStock: 35,
        maxStock: 200,
        unitPrice: 699.00,
        totalValue: 31455.00,
        status: 'ok',
        lastMovement: '2024-01-15',
        supplier: 'Logitech Brasil'
      },
      {
        id: 17,
        name: 'MacBook Air M2',
        sku: 'MBA-M2-256',
        category: 'Notebooks',
        currentStock: 3,
        minStock: 5,
        maxStock: 25,
        unitPrice: 10999.00,
        totalValue: 32997.00,
        status: 'critical',
        lastMovement: '2024-01-10',
        supplier: 'Apple Brasil'
      },
      {
        id: 18,
        name: 'iPad Pro 12.9"',
        sku: 'IPP-129-256',
        category: 'Tablets',
        currentStock: 4,
        minStock: 8,
        maxStock: 30,
        unitPrice: 8999.00,
        totalValue: 35996.00,
        status: 'critical',
        lastMovement: '2024-01-11',
        supplier: 'Apple Brasil'
      }
    ],
    movements: [
      {
        id: 1,
        productId: 1,
        productName: 'iPhone 15 Pro Max',
        type: 'entrada',
        quantity: 10,
        date: '2024-01-15',
        reason: 'Compra',
        user: 'Sistema'
      },
      {
        id: 2,
        productId: 2,
        productName: 'MacBook Pro M3',
        type: 'saida',
        quantity: 2,
        date: '2024-01-14',
        reason: 'Venda',
        user: 'Sistema'
      }
    ],
    filters: {
      category: 'all',
      status: 'all',
      search: ''
    }
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    filteredProducts: (state) => {
      let filtered = state.products

      if (state.filters.category !== 'all') {
        filtered = filtered.filter(product => product.category === state.filters.category)
      }

      if (state.filters.status !== 'all') {
        filtered = filtered.filter(product => product.status === state.filters.status)
      }

      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.supplier.toLowerCase().includes(searchLower)
        )
      }

      return filtered
    },
    categories: (state) => {
      return ['all', ...new Set(state.products.map(product => product.category))]
    },
    totalProducts: (state) => state.products.length,
    lowStockProducts: (state) => state.products.filter(p => p.status === 'low').length,
    criticalStockProducts: (state) => state.products.filter(p => p.status === 'critical').length,
    totalInventoryValue: (state) => {
      return state.products.reduce((sum, product) => sum + product.totalValue, 0)
    },
    okStockProducts: (state) => state.products.filter(p => p.status === 'ok').length
  },
  actions: {
    setCategoryFilter(category) {
      this.filters.category = category
    },
    setStatusFilter(status) {
      this.filters.status = status
    },
    setSearchFilter(search) {
      this.filters.search = search
    },
    updateStock(productId, quantity, type) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        if (type === 'entrada') {
          product.currentStock += quantity
        } else if (type === 'saida') {
          product.currentStock = Math.max(0, product.currentStock - quantity)
        }
        
        product.totalValue = product.currentStock * product.unitPrice
        product.lastMovement = new Date().toISOString().split('T')[0]
        
        // Atualizar status
        if (product.currentStock <= 0) {
          product.status = 'critical'
        } else if (product.currentStock < product.minStock) {
          product.status = 'critical'
        } else if (product.currentStock <= product.minStock * 1.2) {
          product.status = 'low'
        } else {
          product.status = 'ok'
        }
      }
    },
    addMovement(movement) {
      this.movements.unshift({
        id: Date.now(),
        ...movement,
        date: new Date().toISOString().split('T')[0]
      })
    }
  }
})

