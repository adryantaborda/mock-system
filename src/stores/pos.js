import { defineStore } from 'pinia'
import { useProductsStore } from './products'
import { useSalesStore } from './sales'
import { useInventoryStore } from './inventory'

export const usePosStore = defineStore('pos', {
  state: () => ({
    cart: [],
    searchQuery: '',
    selectedCategory: 'all',
    paymentMethod: 'Dinheiro',
    cashReceived: 0,
    cashRegister: {
      isOpen: false,
      openingBalance: 0,
      currentBalance: 0,
      openedAt: null,
      closedAt: null
    }
  }),
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    cartItemsCount: (state) => {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    change: (state) => {
      if (state.paymentMethod === 'Dinheiro' && state.cashReceived > 0) {
        return Math.max(0, state.cashReceived - state.cartTotal)
      }
      return 0
    },
    filteredProducts: (state) => {
      const productsStore = useProductsStore()
      let filtered = productsStore.products.filter(p => p.stock > 0)

      if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === state.selectedCategory)
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        )
      }

      return filtered
    },
    categories: (state) => {
      const productsStore = useProductsStore()
      return ['all', ...new Set(productsStore.products.map(p => p.category))]
    }
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id)
      const productsStore = useProductsStore()
      const productInStore = productsStore.products.find(p => p.id === product.id)

      if (productInStore && productInStore.stock <= 0) {
        return false
      }

      if (existingItem) {
        if (existingItem.quantity < productInStore.stock) {
          existingItem.quantity++
        } else {
          return false // Sem estoque suficiente
        }
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: productInStore?.stock || 0
        })
      }
      return true
    },
    removeFromCart(productId) {
      const index = this.cart.findIndex(item => item.id === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
    updateQuantity(productId, quantity) {
      const item = this.cart.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else if (quantity <= item.stock) {
          item.quantity = quantity
        }
      }
    },
    clearCart() {
      this.cart = []
      this.cashReceived = 0
      this.paymentMethod = 'Dinheiro'
    },
    setSearchQuery(query) {
      this.searchQuery = query
    },
    setCategory(category) {
      this.selectedCategory = category
    },
    setPaymentMethod(method) {
      this.paymentMethod = method
      if (method !== 'Dinheiro') {
        this.cashReceived = 0
      }
    },
    setCashReceived(amount) {
      this.cashReceived = amount
    },
    openCashRegister(balance = 0) {
      this.cashRegister.isOpen = true
      this.cashRegister.openingBalance = balance
      this.cashRegister.currentBalance = balance
      this.cashRegister.openedAt = new Date()
      this.cashRegister.closedAt = null
    },
    closeCashRegister() {
      this.cashRegister.isOpen = false
      this.cashRegister.closedAt = new Date()
    },
    async completeSale() {
      if (this.cart.length === 0) return false

      const salesStore = useSalesStore()
      const inventoryStore = useInventoryStore()

      // Criar venda
      const sale = {
        clientName: 'Cliente Balcão',
        clientId: null,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        items: this.cart.map(item => ({
          product: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: this.cartTotal,
        status: 'concluida',
        paymentMethod: this.paymentMethod,
        discount: 0
      }

      salesStore.addSale(sale)

      // Atualizar estoque
      this.cart.forEach(item => {
        inventoryStore.updateStock(item.id, item.quantity, 'saida')
      })

      // Atualizar saldo do caixa se for dinheiro
      if (this.paymentMethod === 'Dinheiro' && this.cashReceived > 0) {
        this.cashRegister.currentBalance += this.cartTotal
      }

      // Limpar carrinho
      this.clearCart()

      return true
    }
  }
})

