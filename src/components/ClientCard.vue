<template>
  <div
    class="client-card bg-white rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-lg"
    :class="[
      client.status === 'ativo' 
        ? 'border-green-200 bg-green-50/30' 
        : 'border-gray-200 bg-gray-50/30'
    ]"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div
          :class="[
            'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg',
            client.status === 'ativo' ? 'bg-green-500' : 'bg-gray-400'
          ]"
        >
          {{ getInitials(client.name) }}
        </div>
        <div>
          <h3 class="font-bold text-lg text-gray-800">{{ client.name }}</h3>
          <div
            :class="[
              'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mt-1',
              client.status === 'ativo' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            ]"
          >
            <i :class="client.status === 'ativo' ? 'pi pi-check-circle' : 'pi pi-times-circle'"></i>
            {{ client.status === 'ativo' ? 'Ativo' : 'Inativo' }}
          </div>
        </div>
      </div>
      <button
        @click.stop="$emit('delete', client.id)"
        class="text-gray-400 hover:text-red-600 transition-colors p-1"
        aria-label="Excluir cliente"
      >
        <i class="pi pi-trash text-sm"></i>
      </button>
    </div>

    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="pi pi-envelope text-xs"></i>
        <span class="truncate">{{ client.email }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="pi pi-phone text-xs"></i>
        <span>{{ client.phone }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="pi pi-map-marker text-xs"></i>
        <span>{{ client.city }}, {{ client.state }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
      <div>
        <div class="text-xs text-gray-500 mb-1">Compras</div>
        <div class="text-lg font-bold text-gray-800">{{ client.totalPurchases }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">Total Gasto</div>
        <div class="text-lg font-bold text-gray-800">{{ formatCurrency(client.totalSpent) }}</div>
      </div>
    </div>

    <div class="mt-3 pt-3 border-t border-gray-200">
      <div class="text-xs text-gray-500">Última compra</div>
      <div class="text-sm font-medium text-gray-700">{{ formatDate(client.lastPurchase) }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  client: {
    type: Object,
    required: true
  }
})

defineEmits(['delete'])

const getInitials = (name) => {
  const names = name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
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
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

