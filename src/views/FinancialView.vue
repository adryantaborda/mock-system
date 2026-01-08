<template>
  <div class="financial-view bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Financeiro</h1>
      <p class="text-gray-500">Gestão de contas a pagar e receber</p>
    </div>

    <!-- Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Contas a Pagar</span>
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <i class="pi pi-arrow-down text-red-600"></i>
          </div>
        </div>
        <p class="text-2xl font-bold text-red-600">{{ formatCurrency(totalPayable) }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ overduePayable.length }} vencidas</p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Contas a Receber</span>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-arrow-up text-green-600"></i>
          </div>
        </div>
        <p class="text-2xl font-bold text-green-600">{{ formatCurrency(totalReceivable) }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ overdueReceivable.length }} vencidas</p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Total Pago</span>
          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <i class="pi pi-check-circle text-gray-600"></i>
          </div>
        </div>
        <p class="text-2xl font-bold text-gray-800">{{ formatCurrency(totalPaid) }}</p>
        <p class="text-xs text-gray-500 mt-1">Este mês</p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">Fluxo de Caixa</span>
          <div class="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
            <i class="pi pi-chart-line text-navy-700"></i>
          </div>
        </div>
        <p :class="[
          'text-2xl font-bold',
          netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
        ]">
          {{ formatCurrency(netCashFlow) }}
        </p>
        <p class="text-xs text-gray-500 mt-1">Recebido - Pago</p>
      </div>
    </div>

    <!-- Alertas de Vencimento -->
    <div v-if="overduePayable.length > 0 || overdueReceivable.length > 0" class="mb-6">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold text-red-800">Contas Vencidas</h2>
          <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            {{ overduePayable.length + overdueReceivable.length }} vencidas
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-if="overduePayable.length > 0">
            <div class="text-sm font-medium text-red-800 mb-2">
              Contas a Pagar: {{ overduePayable.length }}
            </div>
            <div class="space-y-2">
              <div
                v-for="account in overduePayable.slice(0, 3)"
                :key="account.id"
                class="flex items-center justify-between p-2 bg-white rounded border border-red-200"
              >
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-800">{{ account.description }}</div>
                  <div class="text-xs text-gray-500">{{ formatCurrency(account.amount) }}</div>
                </div>
                <button
                  @click="handlePayAccount(account.id)"
                  class="px-3 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600"
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
          <div v-if="overdueReceivable.length > 0">
            <div class="text-sm font-medium text-red-800 mb-2">
              Contas a Receber: {{ overdueReceivable.length }}
            </div>
            <div class="space-y-2">
              <div
                v-for="account in overdueReceivable.slice(0, 3)"
                :key="account.id"
                class="flex items-center justify-between p-2 bg-white rounded border border-red-200"
              >
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-800">{{ account.description }}</div>
                  <div class="text-xs text-gray-500">{{ formatCurrency(account.amount) }}</div>
                </div>
                <button
                  @click="handleReceiveAccount(account.id)"
                  class="px-3 py-1 bg-navy-700 text-white rounded text-xs font-medium hover:bg-navy-800"
                >
                  Receber
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs de Navegação -->
    <div class="bg-white rounded-lg border border-gray-200 mb-6">
      <div class="flex border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 px-6 py-4 font-medium transition-colors border-b-2',
            activeTab === tab.id
              ? 'border-navy-700 text-navy-800 bg-navy-50'
              : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          ]"
        >
          <i :class="tab.icon + ' mr-2'"></i>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Busca -->
        <div class="flex-1">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="financialStore.filters.search"
              @input="financialStore.setSearchFilter(financialStore.filters.search)"
              type="text"
              placeholder="Buscar por descrição, cliente ou categoria..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
        </div>

        <!-- Filtro por Status -->
        <div class="md:w-48">
          <select
            v-model="financialStore.filters.status"
            @change="financialStore.setStatusFilter(financialStore.filters.status)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendente</option>
            <option value="paga">Paga</option>
            <option value="recebida">Recebida</option>
          </select>
        </div>

        <!-- Filtro por Categoria -->
        <div class="md:w-48">
          <select
            v-model="financialStore.filters.category"
            @change="financialStore.setCategoryFilter(financialStore.filters.category)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
          >
            <option value="all">Todas as Categorias</option>
            <option
              v-for="category in (activeTab === 'payable' ? categoriesPayable : categoriesReceivable)"
              :key="category"
              :value="category"
              v-if="category !== 'all'"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Botão Adicionar -->
        <button
          @click="showAddModal = true"
          class="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 active:bg-green-700 transition-colors whitespace-nowrap"
        >
          <i class="pi pi-plus mr-2"></i>
          {{ activeTab === 'payable' ? 'Nova Conta a Pagar' : 'Nova Conta a Receber' }}
        </button>
      </div>
    </div>

    <!-- Lista de Contas a Pagar -->
    <div v-if="activeTab === 'payable'">
      <div v-if="filteredPayable.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FinancialCard
          v-for="account in filteredPayable"
          :key="account.id"
          :account="account"
          type="payable"
          @pay="handlePayAccount"
          @delete="handleDeletePayable"
        />
      </div>
      <div
        v-else
        class="bg-white rounded-lg p-12 text-center border border-gray-200"
      >
        <i class="pi pi-file text-6xl text-gray-400 mb-4"></i>
        <p class="text-gray-600 text-lg">Nenhuma conta a pagar encontrada</p>
        <p class="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
      </div>
    </div>

    <!-- Lista de Contas a Receber -->
    <div v-if="activeTab === 'receivable'">
      <div v-if="filteredReceivable.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FinancialCard
          v-for="account in filteredReceivable"
          :key="account.id"
          :account="account"
          type="receivable"
          @pay="handleReceiveAccount"
        />
      </div>
      <div
        v-else
        class="bg-white rounded-lg p-12 text-center border border-gray-200"
      >
        <i class="pi pi-file text-6xl text-gray-400 mb-4"></i>
        <p class="text-gray-600 text-lg">Nenhuma conta a receber encontrada</p>
        <p class="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
      </div>
    </div>

    <!-- Modal de Pagamento/Recebimento -->
    <FinancialPaymentModal
      v-if="selectedAccount && showPaymentModal"
      :account="selectedAccount"
      :type="activeTab"
      @close="showPaymentModal = false; selectedAccount = null"
      @confirm="handleConfirmPayment"
    />

    <!-- Modal de Adicionar Conta -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showAddModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            {{ activeTab === 'payable' ? 'Nova Conta a Pagar' : 'Nova Conta a Receber' }}
          </h2>
          <button
            @click="showAddModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <p class="text-gray-600 mb-4">Funcionalidade de adicionar conta será implementada em breve.</p>
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
import { ref, computed } from 'vue'
import { useFinancialStore } from '../stores/financial'
import FinancialCard from '../components/FinancialCard.vue'
import FinancialPaymentModal from '../components/FinancialPaymentModal.vue'

const financialStore = useFinancialStore()
const activeTab = ref('payable')
const showAddModal = ref(false)
const showPaymentModal = ref(false)
const selectedAccount = ref(null)

const tabs = [
  { id: 'payable', label: 'Contas a Pagar', icon: 'pi pi-arrow-down' },
  { id: 'receivable', label: 'Contas a Receber', icon: 'pi pi-arrow-up' }
]

const totalPayable = computed(() => financialStore.totalPayable)
const totalReceivable = computed(() => financialStore.totalReceivable)
const totalPaid = computed(() => financialStore.totalPaid)
const totalReceived = computed(() => financialStore.totalReceived)
const netCashFlow = computed(() => financialStore.netCashFlow)
const overduePayable = computed(() => financialStore.overduePayable)
const overdueReceivable = computed(() => financialStore.overdueReceivable)
const filteredPayable = computed(() => financialStore.filteredPayable)
const filteredReceivable = computed(() => financialStore.filteredReceivable)
const categoriesPayable = computed(() => financialStore.categoriesPayable)
const categoriesReceivable = computed(() => financialStore.categoriesReceivable)

const handlePayAccount = (accountId) => {
  const account = financialStore.accountsPayable.find(a => a.id === accountId)
  if (account) {
    selectedAccount.value = account
    showPaymentModal.value = true
  }
}

const handleReceiveAccount = (accountId) => {
  const account = financialStore.accountsReceivable.find(a => a.id === accountId)
  if (account) {
    selectedAccount.value = account
    showPaymentModal.value = true
  }
}

const handleConfirmPayment = (paymentData) => {
  if (activeTab.value === 'payable') {
    financialStore.payAccount(selectedAccount.value.id, {
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      paidAt: new Date().toISOString().split('T')[0]
    })
  } else {
    financialStore.receiveAccount(selectedAccount.value.id, {
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      receivedAt: new Date().toISOString().split('T')[0]
    })
  }
  showPaymentModal.value = false
  selectedAccount.value = null
}

const handleDeletePayable = (accountId) => {
  if (confirm('Tem certeza que deseja excluir esta conta?')) {
    financialStore.deletePayable(accountId)
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
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

