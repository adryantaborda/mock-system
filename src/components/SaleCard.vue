<template>
  <div
    class="sale-card bg-white rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-lg"
    :class="[
      statusClass.border,
      statusClass.bg
    ]"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-lg text-gray-800">{{ sale.saleNumber }}</span>
          <span
            :class="[
              'px-2 py-1 rounded text-xs font-medium',
              statusClass.badge
            ]"
          >
            {{ statusLabel }}
          </span>
        </div>
        <div class="text-sm text-gray-600">
          <i class="pi pi-user mr-1"></i>
          {{ sale.clientName }}
        </div>
      </div>
      <div class="text-right">
        <div class="text-xs text-gray-500 mb-1">{{ formatDate(sale.date) }}</div>
        <div class="text-sm font-medium text-gray-700">{{ sale.time }}</div>
      </div>
    </div>

    <div class="mb-4">
      <div class="text-xs text-gray-500 mb-2">Produtos:</div>
      <div class="space-y-1">
        <div
          v-for="(item, index) in sale.items"
          :key="index"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-gray-700">
            {{ item.quantity }}x {{ item.product }}
          </span>
          <span class="font-medium text-gray-800">
            {{ formatCurrency(item.price * item.quantity) }}
          </span>
        </div>
      </div>
    </div>

    <div class="space-y-2 pt-4 border-t border-gray-200">
      <div v-if="sale.discount > 0" class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Desconto:</span>
        <span class="text-red-600 font-medium">- {{ formatCurrency(sale.discount) }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">Forma de Pagamento:</span>
        <span class="text-sm font-medium text-gray-700">{{ sale.paymentMethod }}</span>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <span class="text-lg font-bold text-gray-800">Total:</span>
        <span class="text-2xl font-bold text-navy-800">{{ formatCurrency(sale.total) }}</span>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-200 flex gap-2">
      <button
        v-if="sale.status === 'pendente'"
        @click="$emit('complete', sale.id)"
        class="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
      >
        <i class="pi pi-check mr-1"></i>
        Concluir
      </button>
      <button
        v-if="sale.status !== 'cancelada'"
        @click="$emit('cancel', sale.id)"
        class="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
      >
        <i class="pi pi-times mr-1"></i>
        Cancelar
      </button>
      <button
        @click="$emit('view', sale.id)"
        class="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        <i class="pi pi-eye mr-1"></i>
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  sale: {
    type: Object,
    required: true
  }
})

defineEmits(['complete', 'cancel', 'view'])

const statusClass = computed(() => {
  const classes = {
    concluida: {
      border: 'border-green-200',
      bg: 'bg-green-50/30',
      badge: 'bg-green-100 text-green-700'
    },
    pendente: {
      border: 'border-yellow-200',
      bg: 'bg-yellow-50/30',
      badge: 'bg-yellow-100 text-yellow-700'
    },
    cancelada: {
      border: 'border-red-200',
      bg: 'bg-red-50/30',
      badge: 'bg-red-100 text-red-700'
    }
  }
  return classes[props.sale.status] || classes.pendente
})

const statusLabel = computed(() => {
  const labels = {
    concluida: 'Concluída',
    pendente: 'Pendente',
    cancelada: 'Cancelada'
  }
  return labels[props.sale.status] || props.sale.status
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString) => {
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

