import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        category: 'Smartphones',
        price: 8999.00,
        stock: 15,
        icon: 'mobile',
        description: 'iPhone 15 Pro Max 256GB Titanium',
        brand: 'Apple',
        rating: 4.8,
        color: 'bg-blue-50/80 border-blue-300/60'
      },
      {
        id: 2,
        name: 'MacBook Pro M3',
        category: 'Notebooks',
        price: 18999.00,
        stock: 8,
        icon: 'laptop',
        description: 'MacBook Pro 14" M3 Pro 512GB',
        brand: 'Apple',
        rating: 4.9,
        color: 'bg-purple-50/80 border-purple-300/60'
      },
      {
        id: 3,
        name: 'Samsung Galaxy S24 Ultra',
        category: 'Smartphones',
        price: 7499.00,
        stock: 12,
        icon: 'mobile',
        description: 'Samsung Galaxy S24 Ultra 256GB',
        brand: 'Samsung',
        rating: 4.7,
        color: 'bg-green-50/80 border-green-300/60'
      },
      {
        id: 4,
        name: 'iPad Air 5ª Geração',
        category: 'Tablets',
        price: 4299.00,
        stock: 20,
        icon: 'mobile',
        description: 'iPad Air 5ª Geração 64GB Wi-Fi',
        brand: 'Apple',
        rating: 4.6,
        color: 'bg-amber-50/80 border-amber-300/60'
      },
      {
        id: 5,
        name: 'Notebook Dell XPS 15',
        category: 'Notebooks',
        price: 12999.00,
        stock: 6,
        icon: 'laptop',
        description: 'Dell XPS 15 Intel i7 16GB 512GB SSD',
        brand: 'Dell',
        rating: 4.5,
        color: 'bg-rose-50/80 border-rose-300/60'
      },
      {
        id: 6,
        name: 'AirPods Pro 2',
        category: 'Acessórios',
        price: 2199.00,
        stock: 35,
        icon: 'headphones',
        description: 'AirPods Pro 2ª Geração com Cancelamento de Ruído',
        brand: 'Apple',
        rating: 4.8,
        color: 'bg-cyan-50/80 border-cyan-300/60'
      },
      {
        id: 7,
        name: 'Smart TV Samsung 65"',
        category: 'TVs',
        price: 6999.00,
        stock: 10,
        icon: 'tv',
        description: 'Smart TV Samsung 65" 4K QLED',
        brand: 'Samsung',
        rating: 4.7,
        color: 'bg-pink-50/80 border-pink-300/60'
      },
      {
        id: 8,
        name: 'PlayStation 5',
        category: 'Gaming',
        price: 4499.00,
        stock: 18,
        icon: 'gamepad',
        description: 'PlayStation 5 Console + 1 Controle',
        brand: 'Sony',
        rating: 4.9,
        color: 'bg-indigo-50/80 border-indigo-300/60'
      },
      {
        id: 9,
        name: 'Xbox Series X',
        category: 'Gaming',
        price: 4999.00,
        stock: 14,
        icon: 'gamepad',
        description: 'Xbox Series X 1TB',
        brand: 'Microsoft',
        rating: 4.8,
        color: 'bg-emerald-50/80 border-emerald-300/60'
      },
      {
        id: 10,
        name: 'Monitor LG UltraWide 34"',
        category: 'Monitores',
        price: 3499.00,
        stock: 22,
        icon: 'desktop',
        description: 'Monitor LG UltraWide 34" 4K IPS',
        brand: 'LG',
        rating: 4.6,
        color: 'bg-teal-50/80 border-teal-300/60'
      },
      {
        id: 11,
        name: 'Nintendo Switch OLED',
        category: 'Gaming',
        price: 2499.00,
        stock: 25,
        icon: 'gamepad',
        description: 'Nintendo Switch OLED 64GB',
        brand: 'Nintendo',
        rating: 4.7,
        color: 'bg-red-50/80 border-red-300/60'
      },
      {
        id: 12,
        name: 'Apple Watch Series 9',
        category: 'Wearables',
        price: 3299.00,
        stock: 30,
        icon: 'clock',
        description: 'Apple Watch Series 9 GPS 45mm',
        brand: 'Apple',
        rating: 4.8,
        color: 'bg-blue-50/80 border-blue-300/60'
      },
      {
        id: 13,
        name: 'Notebook Lenovo ThinkPad',
        category: 'Notebooks',
        price: 8999.00,
        stock: 9,
        icon: 'laptop',
        description: 'Lenovo ThinkPad X1 Carbon Intel i7',
        brand: 'Lenovo',
        rating: 4.5,
        color: 'bg-purple-50/80 border-purple-300/60'
      },
      {
        id: 14,
        name: 'Samsung Galaxy Watch 6',
        category: 'Wearables',
        price: 1999.00,
        stock: 28,
        icon: 'clock',
        description: 'Samsung Galaxy Watch 6 44mm',
        brand: 'Samsung',
        rating: 4.6,
        color: 'bg-green-50/80 border-green-300/60'
      },
      {
        id: 15,
        name: 'Teclado Mecânico Logitech',
        category: 'Acessórios',
        price: 899.00,
        stock: 40,
        icon: 'keyboard',
        description: 'Teclado Mecânico Logitech MX Keys',
        brand: 'Logitech',
        rating: 4.7,
        color: 'bg-amber-50/80 border-amber-300/60'
      },
      {
        id: 16,
        name: 'Mouse Logitech MX Master 3',
        category: 'Acessórios',
        price: 699.00,
        stock: 45,
        icon: 'mouse',
        description: 'Mouse Logitech MX Master 3 Sem Fio',
        brand: 'Logitech',
        rating: 4.8,
        color: 'bg-rose-50/80 border-rose-300/60'
      }
    ],
    filters: {
      category: 'all',
      search: ''
    }
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    },
    filteredProducts: (state) => {
      let filtered = state.products

      // Filtrar por categoria
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(product => product.category === state.filters.category)
      }

      // Filtrar por busca
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        )
      }

      return filtered
    },
    categories: (state) => {
      return ['all', ...new Set(state.products.map(product => product.category))]
    }
  },
  actions: {
    setCategoryFilter(category) {
      this.filters.category = category
    },
    setSearchFilter(search) {
      this.filters.search = search
    },
    updateStock(productId, quantity) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.stock = Math.max(0, product.stock - quantity)
      }
    }
  }
})

