<template>
  <div
    :draggable="!compact"
    :class="[
      'enhanced-appointment-card',
      appointment.color,
      'border-2 rounded-lg cursor-pointer transition-all duration-200',
      compact ? 'p-2 text-xs' : 'p-3',
      isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md'
    ]"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between mb-1">
      <div class="flex-1 min-w-0">
        <h4 :class="[compact ? 'text-xs font-semibold' : 'text-sm font-bold', 'truncate']">
          {{ appointment.title }}
        </h4>
        <div v-if="!compact" class="flex items-center gap-1 text-xs text-gray-600 mt-1">
          <i class="pi pi-user text-xs"></i>
          <span class="truncate">{{ appointment.client }}</span>
        </div>
      </div>
      <button
        v-if="!compact"
        @click.stop="$emit('remove', appointment.id)"
        class="text-gray-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
        aria-label="Remover"
      >
        <i class="pi pi-times text-xs"></i>
      </button>
    </div>
    
    <div v-if="!compact" class="flex items-center gap-2 text-xs mb-1">
      <i class="pi pi-clock text-xs"></i>
      <span>{{ appointment.time }}</span>
      <span class="text-gray-400">•</span>
      <span>{{ appointment.duration }}min</span>
    </div>
    
    <div v-if="!compact" class="flex items-center justify-between mt-2">
      <span
        :class="[
          'px-2 py-0.5 rounded text-xs font-medium',
          getStatusClass(appointment.status)
        ]"
      >
        {{ getStatusLabel(appointment.status) }}
      </span>
      <span class="text-xs font-bold">
        {{ formatCurrency(appointment.value) }}
      </span>
    </div>
    <div v-else class="text-xs font-medium mt-1">
      {{ appointment.time }} • {{ formatCurrency(appointment.value) }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

defineEmits(['remove', 'drag-start', 'drag-end', 'click'])

const isDragging = ref(false)

const handleDragStart = (event) => {
  if (props.compact) return
  isDragging.value = true
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('appointment-id', props.appointment.id.toString())
}

const handleDragEnd = () => {
  isDragging.value = false
}

const getStatusClass = (status) => {
  const classes = {
    agendado: 'bg-green-100 text-navy-900',
    confirmado: 'bg-green-100 text-green-700',
    concluido: 'bg-purple-100 text-purple-700',
    cancelado: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const getStatusLabel = (status) => {
  const labels = {
    agendado: 'Agendado',
    confirmado: 'Confirmado',
    concluido: 'Concluído',
    cancelado: 'Cancelado'
  }
  return labels[status] || status
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
.enhanced-appointment-card {
  user-select: none;
}
</style>

