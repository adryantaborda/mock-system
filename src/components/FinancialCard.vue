<template>
  <div
    :class="[
      'financial-card bg-white rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-lg',
      cardClass
    ]"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-bold text-base text-gray-800">{{ account.description }}</h3>
          <span
            :class="[
              'px-2 py-1 rounded text-xs font-medium',
              statusClass
            ]"
          >
            {{ statusLabel }}
          </span>
        </div>
        <div v-if="account.clientName" class="text-sm text-gray-600 mb-1">
          <i class="pi pi-user mr-1"></i>
          {{ account.clientName }}
        </div>
        <div class="text-xs text-gray-500 mb-2">
          <i class="pi pi-tag mr-1"></i>
          {{ account.category }}
        </div>
        <div class="text-xs text-gray-600">
          <i class="pi pi-calendar mr-1"></i>
          Vencimento: {{ formatDate(account.dueDate) }}
        </div>
        <div v-if="isOverdue" class="text-xs text-red-600 font-medium mt-1">
          <i class="pi pi-exclamation-triangle mr-1"></i>
          Vencida
        </div>
      </div>
      <button
        v-if="type === 'payable'"
        @click.stop="$emit('delete', account.id)"
        class="text-gray-400 hover:text-red-600 transition-colors p-1"
        aria-label="Excluir conta"
      >
        <i class="pi pi-trash text-sm"></i>
      </button>
    </div>

    <div class="flex items-center justify-between pt-3 border-t border-gray-200">
      <div>
        <div class="text-xs text-gray-500 mb-1">Valor Total</div>
        <div class="text-lg font-bold text-gray-800">{{ formatCurrency(account.amount) }}</div>
      </div>
      <div v-if="account.status === 'pendente'" class="text-right">
        <div class="text-xs text-gray-500 mb-1">
          {{ type === 'payable' ? 'Pago' : 'Recebido' }}
        </div>
        <div class="text-sm font-medium text-gray-600">
          {{ formatCurrency(type === 'payable' ? account.paidAmount : account.receivedAmount) }}
        </div>
      </div>
      <div v-else class="text-right">
        <div class="text-xs text-gray-500 mb-1">Data de Pagamento</div>
        <div class="text-sm font-medium text-green-600">
          {{ formatDate(type === 'payable' ? account.paidAt : account.receivedAt) }}
        </div>
      </div>
    </div>

    <div v-if="account.status === 'pendente'" class="mt-4 pt-3 border-t border-gray-200">
      <button
        @click="$emit('pay', account.id)"
        :class="[
          'w-full px-4 py-2 rounded-lg font-medium transition-colors text-sm',
          type === 'payable'
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-navy-700 text-white hover:bg-navy-800'
        ]"
      >
        <i :class="(type === 'payable' ? 'pi pi-check' : 'pi pi-dollar') + ' mr-2'"></i>
        {{ type === 'payable' ? 'Marcar como Pago' : 'Marcar como Recebido' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['payable', 'receivable'].includes(value)
  }
})

defineEmits(['pay', 'delete'])

const isOverdue = computed(() => {
  if (props.account.status !== 'pendente') return false
  const today = new Date().toISOString().split('T')[0]
  return props.account.dueDate < today
})

const statusClass = computed(() => {
  if (isOverdue.value) {
    return 'bg-red-100 text-red-700'
  }
  return props.account.status === 'pendente'
    ? 'bg-yellow-100 text-yellow-700'
    : 'bg-green-100 text-green-700'
})

const statusLabel = computed(() => {
  if (isOverdue.value) {
    return 'Vencida'
  }
  return props.account.status === 'pendente'
    ? 'Pendente'
    : props.type === 'payable' ? 'Paga' : 'Recebida'
})

const cardClass = computed(() => {
  if (isOverdue.value) {
    return 'border-red-200 bg-red-50/30'
  }
  if (props.account.status === 'pendente') {
    return 'border-yellow-200 bg-yellow-50/30'
  }
  return 'border-green-200 bg-green-50/30'
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

