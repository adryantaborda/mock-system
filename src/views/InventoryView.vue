<template>
  <div class="inventory-view bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Estoque</h1>
      <p class="text-gray-500">Controle completo de inventário e produtos</p>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Total de Produtos</span>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-box text-navy-800"></i>
          </div>
        </div>
        <div class="text-2xl font-bold text-gray-800">{{ totalProducts }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Valor Total</span>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-dollar text-green-600"></i>
          </div>
        </div>
        <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalInventoryValue) }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Estoque OK</span>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-check-circle text-green-600"></i>
          </div>
        </div>
        <div class="text-2xl font-bold text-green-600">{{ okStockProducts }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Estoque Baixo</span>
          <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <i class="pi pi-exclamation-triangle text-yellow-600"></i>
          </div>
        </div>
        <div class="text-2xl font-bold text-yellow-600">{{ lowStockProducts }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Estoque Crítico</span>
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <i class="pi pi-times-circle text-red-600"></i>
          </div>
        </div>
        <div class="text-2xl font-bold text-red-600">{{ criticalStockProducts }}</div>
      </div>
    </div>

    <!-- Alertas de Estoque Baixo -->
    <div v-if="lowStockProducts > 0 || criticalStockProducts > 0" class="mb-6">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Alertas de Estoque</h2>
          <span
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              criticalStockProducts > 0
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            ]"
          >
            {{ criticalStockProducts + lowStockProducts }} alertas
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="product in alertProducts"
            :key="product.id"
            :class="[
              'p-3 rounded-lg border-2',
              product.status === 'critical'
                ? 'bg-red-50 border-red-200'
                : 'bg-yellow-50 border-yellow-200'
            ]"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-gray-800">{{ product.name }}</div>
                <div class="text-sm text-gray-600">
                  Estoque: {{ product.currentStock }} / Mín: {{ product.minStock }}
                </div>
              </div>
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  product.status === 'critical'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                ]"
              >
                {{ product.status === 'critical' ? 'Crítico' : 'Baixo' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros e Busca -->
    <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Busca -->
        <div class="flex-1">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Buscar por nome, SKU ou fornecedor..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
        </div>

        <!-- Filtro por Categoria -->
        <div class="md:w-48">
          <select
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
          >
            <option value="all">Todas as Categorias</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Filtro por Status -->
        <div class="md:w-48">
          <select
            v-model="selectedStatus"
            @change="handleStatusChange"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
          >
            <option value="all">Todos os Status</option>
            <option value="ok">OK</option>
            <option value="low">Baixo</option>
            <option value="critical">Crítico</option>
          </select>
        </div>

        <!-- Botão Adicionar -->
        <button
          @click="showAddModal = true"
          class="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-navy-800 active:bg-navy-900 transition-colors whitespace-nowrap"
        >
          <i class="pi pi-plus mr-2"></i>
          Novo Produto
        </button>
      </div>
    </div>

    <!-- Grid de Produtos -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <InventoryCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @edit="handleEdit"
        @add-stock="handleAddStock"
        @remove-stock="handleRemoveStock"
      />
    </div>

    <!-- Mensagem quando não há produtos -->
    <div
      v-else
      class="bg-white rounded-lg p-12 text-center border border-gray-200"
    >
      <i class="pi pi-box text-6xl text-gray-400 mb-4"></i>
      <p class="text-gray-600 text-lg">Nenhum produto encontrado</p>
      <p class="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
    </div>

    <!-- Modal de Entrada/Saída -->
    <StockMovementModal
      v-if="selectedProductForMovement"
      :product="selectedProductForMovement"
      :movement-type="movementType"
      @close="selectedProductForMovement = null"
      @confirm="handleStockMovement"
    />

    <!-- Modal de Adicionar Produto -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showAddModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Novo Produto</h2>
          <button
            @click="showAddModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <p class="text-gray-600 mb-4">Funcionalidade de adicionar produto será implementada em breve.</p>
        <button
          @click="showAddModal = false"
          class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInventoryStore } from '../stores/inventory'
import InventoryCard from '../components/InventoryCard.vue'
import StockMovementModal from '../components/StockMovementModal.vue'

const inventoryStore = useInventoryStore()
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedStatus = ref('all')
const showAddModal = ref(false)
const selectedProductForMovement = ref(null)
const movementType = ref('entrada')

const filteredProducts = computed(() => inventoryStore.filteredProducts)
const categories = computed(() => inventoryStore.categories)
const totalProducts = computed(() => inventoryStore.totalProducts)
const lowStockProducts = computed(() => inventoryStore.lowStockProducts)
const criticalStockProducts = computed(() => inventoryStore.criticalStockProducts)
const okStockProducts = computed(() => inventoryStore.okStockProducts)
const totalInventoryValue = computed(() => inventoryStore.totalInventoryValue)

const alertProducts = computed(() => {
  return inventoryStore.products
    .filter(p => p.status === 'low' || p.status === 'critical')
    .sort((a, b) => {
      if (a.status === 'critical' && b.status !== 'critical') return -1
      if (a.status !== 'critical' && b.status === 'critical') return 1
      return a.currentStock - b.currentStock
    })
})

const handleSearch = () => {
  inventoryStore.setSearchFilter(searchQuery.value)
}

const handleCategoryChange = () => {
  inventoryStore.setCategoryFilter(selectedCategory.value)
}

const handleStatusChange = () => {
  inventoryStore.setStatusFilter(selectedStatus.value)
}

const handleEdit = (id) => {
  const product = inventoryStore.getProductById(id)
  if (product) {
    alert(`Editar produto: ${product.name}\n\nFuncionalidade de edição será implementada em breve.`)
  }
}

const handleAddStock = (id) => {
  const product = inventoryStore.getProductById(id)
  if (product) {
    selectedProductForMovement.value = product
    movementType.value = 'entrada'
  }
}

const handleRemoveStock = (id) => {
  const product = inventoryStore.getProductById(id)
  if (product) {
    selectedProductForMovement.value = product
    movementType.value = 'saida'
  }
}

const handleStockMovement = (data) => {
  inventoryStore.updateStock(data.productId, data.quantity, data.type)
  inventoryStore.addMovement({
    productId: data.productId,
    productName: data.productName,
    type: data.type,
    quantity: data.quantity,
    reason: data.reason || 'Ajuste manual',
    user: 'Sistema'
  })
  selectedProductForMovement.value = null
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

onMounted(() => {
  inventoryStore.setCategoryFilter('all')
  inventoryStore.setStatusFilter('all')
  inventoryStore.setSearchFilter('')
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

