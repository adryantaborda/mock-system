<template>
  <div class="clients-view bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Clientes</h1>
      <p class="text-gray-500">Gerencie seu cadastro de clientes</p>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Total de Clientes</div>
        <div class="text-2xl font-bold text-gray-800">{{ totalClients }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Clientes Ativos</div>
        <div class="text-2xl font-bold text-green-600">{{ activeClients }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Clientes Inativos</div>
        <div class="text-2xl font-bold text-gray-600">{{ inactiveClients }}</div>
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
              placeholder="Buscar clientes por nome, email, telefone ou cidade..."
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
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>
        </div>

        <!-- Botão Adicionar -->
        <button
          @click="showAddModal = true"
          class="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-navy-800 active:bg-navy-900 transition-colors whitespace-nowrap"
        >
          <i class="pi pi-plus mr-2"></i>
          Novo Cliente
        </button>
      </div>
    </div>

    <!-- Grid de Clientes -->
    <div v-if="filteredClients.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ClientCard
        v-for="client in filteredClients"
        :key="client.id"
        :client="client"
        @delete="handleDelete"
      />
    </div>

    <!-- Mensagem quando não há clientes -->
    <div
      v-else
      class="bg-white rounded-lg p-12 text-center border border-gray-200"
    >
      <i class="pi pi-users text-6xl text-gray-400 mb-4"></i>
      <p class="text-gray-600 text-lg">Nenhum cliente encontrado</p>
      <p class="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
    </div>

    <!-- Modal de Adicionar Cliente (simplificado) -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showAddModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Novo Cliente</h2>
          <button
            @click="showAddModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <p class="text-gray-600 mb-4">Funcionalidade de adicionar cliente será implementada em breve.</p>
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
import { useClientsStore } from '../stores/clients'
import ClientCard from '../components/ClientCard.vue'

const clientsStore = useClientsStore()
const searchQuery = ref('')
const selectedStatus = ref('all')
const showAddModal = ref(false)

const filteredClients = computed(() => clientsStore.filteredClients)
const totalClients = computed(() => clientsStore.totalClients)
const activeClients = computed(() => clientsStore.activeClients)
const inactiveClients = computed(() => clientsStore.inactiveClients)
const totalRevenue = computed(() => clientsStore.totalRevenue)

const handleSearch = () => {
  clientsStore.setSearchFilter(searchQuery.value)
}

const handleStatusChange = () => {
  clientsStore.setStatusFilter(selectedStatus.value)
}

const handleDelete = (id) => {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    clientsStore.deleteClient(id)
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
  clientsStore.setStatusFilter('all')
  clientsStore.setSearchFilter('')
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

