<template>
  <div
    class="inventory-card bg-white rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-lg"
    :class="[
      statusClass.border,
      statusClass.bg
    ]"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-bold text-lg text-gray-800">{{ product.name }}</h3>
          <span
            :class="[
              'px-2 py-1 rounded text-xs font-medium',
              statusClass.badge
            ]"
          >
            {{ statusLabel }}
          </span>
        </div>
        <div class="text-xs text-gray-500 mb-2">
          SKU: {{ product.sku }} • {{ product.category }}
        </div>
        <div class="text-xs text-gray-600">
          <i class="pi pi-building mr-1"></i>
          {{ product.supplier }}
        </div>
      </div>
      <button
        @click.stop="$emit('edit', product.id)"
        class="text-gray-400 hover:text-navy-800 transition-colors p-1"
        aria-label="Editar produto"
      >
        <i class="pi pi-pencil text-sm"></i>
      </button>
    </div>

    <!-- Estoque -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-gray-700">Estoque Atual</span>
        <span
          :class="[
            'text-lg font-bold',
            statusClass.text
          ]"
        >
          {{ product.currentStock }} unidades
        </span>
      </div>
      
      <!-- Barra de Progresso -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          :class="[
            'h-2 rounded-full transition-all',
            statusClass.progress
          ]"
          :style="{ width: stockPercentage + '%' }"
        ></div>
      </div>
      
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span>Mín: {{ product.minStock }}</span>
        <span>Máx: {{ product.maxStock }}</span>
      </div>
    </div>

    <!-- Informações Financeiras -->
    <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 mb-3">
      <div>
        <div class="text-xs text-gray-500 mb-1">Preço Unitário</div>
        <div class="text-sm font-bold text-gray-800">{{ formatCurrency(product.unitPrice) }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">Valor Total</div>
        <div class="text-sm font-bold text-navy-800">{{ formatCurrency(product.totalValue) }}</div>
      </div>
    </div>

    <!-- Última Movimentação -->
    <div class="text-xs text-gray-500 mb-3">
      <i class="pi pi-calendar mr-1"></i>
      Última movimentação: {{ formatDate(product.lastMovement) }}
    </div>

    <!-- Ações -->
    <div class="flex gap-2 pt-3 border-t border-gray-200">
      <button
        @click="$emit('add-stock', product.id)"
        class="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
      >
        <i class="pi pi-plus mr-1"></i>
        Entrada
      </button>
      <button
        @click="$emit('remove-stock', product.id)"
        :disabled="product.currentStock === 0"
        :class="[
          'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          product.currentStock > 0
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        <i class="pi pi-minus mr-1"></i>
        Saída
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'add-stock', 'remove-stock'])

const statusClass = computed(() => {
  const classes = {
    ok: {
      border: 'border-green-200',
      bg: 'bg-green-50/30',
      badge: 'bg-green-100 text-green-700',
      text: 'text-green-600',
      progress: 'bg-green-500'
    },
    low: {
      border: 'border-yellow-200',
      bg: 'bg-yellow-50/30',
      badge: 'bg-yellow-100 text-yellow-700',
      text: 'text-yellow-600',
      progress: 'bg-yellow-500'
    },
    critical: {
      border: 'border-red-200',
      bg: 'bg-red-50/30',
      badge: 'bg-red-100 text-red-700',
      text: 'text-red-600',
      progress: 'bg-red-500'
    }
  }
  return classes[props.product.status] || classes.ok
})

const statusLabel = computed(() => {
  const labels = {
    ok: 'OK',
    low: 'Baixo',
    critical: 'Crítico'
  }
  return labels[props.product.status] || 'OK'
})

const stockPercentage = computed(() => {
  const range = props.product.maxStock - props.product.minStock
  const current = props.product.currentStock - props.product.minStock
  return Math.min(100, Math.max(0, (current / range) * 100))
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
    month: 'short'
  })
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

