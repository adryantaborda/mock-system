<template>
  <div class="sales-view bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Vendas</h1>
      <p class="text-gray-500">Gerencie todas as vendas realizadas</p>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Total de Vendas</div>
        <div class="text-2xl font-bold text-gray-800">{{ totalSales }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Concluídas</div>
        <div class="text-2xl font-bold text-green-600">{{ completedSales }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Pendentes</div>
        <div class="text-2xl font-bold text-yellow-600">{{ pendingSales }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Canceladas</div>
        <div class="text-2xl font-bold text-red-600">{{ cancelledSales }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Receita Total</div>
        <div class="text-2xl font-bold text-navy-800">{{ formatCurrency(totalRevenue) }}</div>
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
              placeholder="Buscar por número da venda, cliente ou produto..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
        </div>

        <!-- Filtro por Status -->
        <div class="md:w-48">
          <select
            v-model="selectedStatus"
            @change="handleStatusChange"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
          >
            <option value="all">Todos os Status</option>
            <option value="concluida">Concluídas</option>
            <option value="pendente">Pendentes</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </div>

        <!-- Botão Nova Venda -->
        <button
          @click="showNewSaleModal = true"
          class="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-navy-800 active:bg-navy-900 transition-colors whitespace-nowrap"
        >
          <i class="pi pi-plus mr-2"></i>
          Nova Venda
        </button>
      </div>
    </div>

    <!-- Grid de Vendas -->
    <div v-if="filteredSales.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SaleCard
        v-for="sale in filteredSales"
        :key="sale.id"
        :sale="sale"
        @complete="handleComplete"
        @cancel="handleCancel"
        @view="handleView"
      />
    </div>

    <!-- Mensagem quando não há vendas -->
    <div
      v-else
      class="bg-white rounded-lg p-12 text-center border border-gray-200"
    >
      <i class="pi pi-shopping-cart text-6xl text-gray-400 mb-4"></i>
      <p class="text-gray-600 text-lg">Nenhuma venda encontrada</p>
      <p class="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
    </div>

    <!-- Modal de Nova Venda (simplificado) -->
    <div
      v-if="showNewSaleModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showNewSaleModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Nova Venda</h2>
          <button
            @click="showNewSaleModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <p class="text-gray-600 mb-4">Funcionalidade de criar nova venda será implementada em breve.</p>
        <button
          @click="showNewSaleModal = false"
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
import { useSalesStore } from '../stores/sales'
import SaleCard from '../components/SaleCard.vue'

const salesStore = useSalesStore()
const searchQuery = ref('')
const selectedStatus = ref('all')
const showNewSaleModal = ref(false)

const filteredSales = computed(() => salesStore.filteredSales)
const totalSales = computed(() => salesStore.totalSales)
const completedSales = computed(() => salesStore.completedSales)
const pendingSales = computed(() => salesStore.pendingSales)
const cancelledSales = computed(() => salesStore.cancelledSales)
const totalRevenue = computed(() => salesStore.totalRevenue)

const handleSearch = () => {
  salesStore.setSearchFilter(searchQuery.value)
}

const handleStatusChange = () => {
  salesStore.setStatusFilter(selectedStatus.value)
}

const handleComplete = (id) => {
  if (confirm('Deseja marcar esta venda como concluída?')) {
    salesStore.updateSaleStatus(id, 'concluida')
  }
}

const handleCancel = (id) => {
  if (confirm('Tem certeza que deseja cancelar esta venda?')) {
    salesStore.cancelSale(id)
  }
}

const handleView = (id) => {
  const sale = salesStore.getSaleById(id)
  if (sale) {
    alert(`Detalhes da venda ${sale.saleNumber}\n\nCliente: ${sale.clientName}\nTotal: ${formatCurrency(sale.total)}\nStatus: ${sale.status}`)
  }
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
  salesStore.setStatusFilter('all')
  salesStore.setSearchFilter('')
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

