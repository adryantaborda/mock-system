<template>
  <div class="pos-view bg-gray-50 min-h-screen p-4">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 mb-1">Terminal de Vendas</h1>
        <p class="text-gray-500 text-sm">Sistema de ponto de venda</p>
      </div>
      
      <!-- Cash Register Status -->
      <div class="flex items-center gap-3">
        <div
          :class="[
            'px-4 py-2 rounded-lg flex items-center gap-2',
            cashRegister.isOpen
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          ]"
        >
          <i :class="cashRegister.isOpen ? 'pi pi-check-circle' : 'pi pi-times-circle'"></i>
          <span class="font-medium text-sm">
            {{ cashRegister.isOpen ? 'Caixa Aberto' : 'Caixa Fechado' }}
          </span>
        </div>
        <button
          v-if="!cashRegister.isOpen"
          @click="openCashRegisterModal = true"
          class="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <i class="pi pi-plus mr-2"></i>
          Abrir Caixa
        </button>
        <button
          v-else
          @click="closeCashRegister"
          class="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          <i class="pi pi-times mr-2"></i>
          Fechar Caixa
        </button>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
      <!-- Products Section -->
      <div class="lg:col-span-2 flex flex-col">
        <!-- Search and Filters -->
        <div class="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <div class="flex flex-col md:flex-row gap-3">
            <!-- Search -->
            <div class="flex-1">
              <div class="relative">
                <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  v-model="posStore.searchQuery"
                  @input="posStore.setSearchQuery(posStore.searchQuery)"
                  type="text"
                  placeholder="Buscar produto por nome, marca ou categoria..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
                />
              </div>
            </div>
            
            <!-- Category Filter -->
            <div class="md:w-48">
              <select
                v-model="posStore.selectedCategory"
                @change="posStore.setCategory(posStore.selectedCategory)"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              >
                <option value="all">Todas as Categorias</option>
                <option
                  v-for="category in posStore.categories"
                  :key="category"
                  :value="category"
                  v-if="category !== 'all'"
                >
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="flex-1 bg-white rounded-lg p-4 border border-gray-200 overflow-y-auto">
          <div
            v-if="posStore.filteredProducts.length === 0"
            class="text-center py-12 text-gray-400"
          >
            <i class="pi pi-box text-5xl mb-3"></i>
            <p class="text-lg">Nenhum produto encontrado</p>
            <p class="text-sm mt-1">Tente ajustar os filtros de busca</p>
          </div>
          
          <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <PosProductCard
              v-for="product in posStore.filteredProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="handleAddToCart"
            />
          </div>
        </div>
      </div>

      <!-- Cart Section -->
      <div class="lg:col-span-1">
        <PosCart
          :cart="posStore.cart"
          :cart-total="posStore.cartTotal"
          :cart-items-count="posStore.cartItemsCount"
          @clear-cart="handleClearCart"
          @checkout="handleCheckout"
          @remove-item="handleRemoveItem"
          @increase-quantity="handleIncreaseQuantity"
          @decrease-quantity="handleDecreaseQuantity"
          @update-quantity="handleUpdateQuantity"
        />
      </div>
    </div>

    <!-- Payment Modal -->
    <PaymentModal
      v-if="showPaymentModal"
      :total="posStore.cartTotal"
      :cash-register-open="cashRegister.isOpen"
      @close="showPaymentModal = false"
      @confirm="handleConfirmPayment"
    />

    <!-- Open Cash Register Modal -->
    <div
      v-if="openCashRegisterModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="openCashRegisterModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Abrir Caixa</h2>
          <button
            @click="openCashRegisterModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Saldo Inicial</label>
          <input
            v-model.number="openingBalance"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 text-lg font-medium"
          />
        </div>
        <div class="flex gap-3">
          <button
            @click="handleOpenCashRegister"
            class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Abrir Caixa
          </button>
          <button
            @click="openCashRegisterModal = false"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="showSuccessMessage"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
    >
      <i class="pi pi-check-circle text-xl"></i>
      <div>
        <div class="font-bold">Venda realizada com sucesso!</div>
        <div class="text-sm text-green-100">Total: {{ formatCurrency(lastSaleTotal) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePosStore } from '../stores/pos'
import PosProductCard from '../components/PosProductCard.vue'
import PosCart from '../components/PosCart.vue'
import PaymentModal from '../components/PaymentModal.vue'

const posStore = usePosStore()
const showPaymentModal = ref(false)
const openCashRegisterModal = ref(false)
const openingBalance = ref(0)
const showSuccessMessage = ref(false)
const lastSaleTotal = ref(0)

const cashRegister = computed(() => posStore.cashRegister)

const handleAddToCart = (product) => {
  const success = posStore.addToCart(product)
  if (!success) {
    alert('Produto sem estoque disponível!')
  }
}

const handleClearCart = () => {
  if (confirm('Deseja limpar o carrinho?')) {
    posStore.clearCart()
  }
}

const handleCheckout = () => {
  if (posStore.cart.length === 0) return
  showPaymentModal.value = true
}

const handleConfirmPayment = async (paymentData) => {
  posStore.setPaymentMethod(paymentData.paymentMethod)
  if (paymentData.paymentMethod === 'Dinheiro') {
    posStore.setCashReceived(paymentData.cashReceived)
  }

  const success = await posStore.completeSale()
  
  if (success) {
    lastSaleTotal.value = paymentData.total || posStore.cartTotal
    showPaymentModal.value = false
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }
}

const handleRemoveItem = (productId) => {
  posStore.removeFromCart(productId)
}

const handleIncreaseQuantity = (productId) => {
  const item = posStore.cart.find(item => item.id === productId)
  if (item) {
    posStore.updateQuantity(productId, item.quantity + 1)
  }
}

const handleDecreaseQuantity = (productId) => {
  const item = posStore.cart.find(item => item.id === productId)
  if (item) {
    posStore.updateQuantity(productId, item.quantity - 1)
  }
}

const handleUpdateQuantity = (productId, quantity) => {
  posStore.updateQuantity(productId, quantity)
}

const handleOpenCashRegister = () => {
  posStore.openCashRegister(openingBalance.value || 0)
  openCashRegisterModal.value = false
  openingBalance.value = 0
}

const closeCashRegister = () => {
  if (confirm('Deseja fechar o caixa? O saldo atual será mantido.')) {
    posStore.closeCashRegister()
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<style scoped>
.pos-view {
  max-width: 100%;
}
</style>

