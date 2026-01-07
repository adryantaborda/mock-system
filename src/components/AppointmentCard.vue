<template>
  <div
    :draggable="true"
    :class="[
      'appointment-card',
      appointment.color,
      'border-2 rounded-lg p-4 cursor-move transition-all duration-200',
      isDragging ? 'opacity-50 scale-95' : 'hover:border-opacity-60'
    ]"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="flex items-start justify-between mb-2">
      <div class="flex-1">
        <h3 class="font-semibold text-base mb-1">{{ appointment.title }}</h3>
        <div class="flex items-center gap-1 text-xs text-gray-600">
          <i class="pi pi-user text-xs"></i>
          <span>{{ appointment.client }}</span>
        </div>
      </div>
      <button
        @click.stop="$emit('remove', appointment.id)"
        class="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-white/50 flex-shrink-0"
        aria-label="Remover venda"
      >
        <i class="pi pi-times text-sm"></i>
      </button>
    </div>
    
    <div class="flex items-center gap-2 text-sm mb-2">
      <i class="pi pi-clock text-xs"></i>
      <span>{{ appointment.time }}</span>
      <span class="text-gray-400">•</span>
      <span>{{ appointment.duration }}min</span>
    </div>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <i class="pi pi-calendar text-xs"></i>
        <span>{{ formatDate(appointment.date) }}</span>
      </div>
      <div class="text-sm font-bold">
        {{ formatCurrency(appointment.value) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove', 'drag-start', 'drag-end'])

const isDragging = ref(false)

const handleDragStart = (event) => {
  isDragging.value = true
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('appointment-id', props.appointment.id.toString())
  emit('drag-start', props.appointment.id)
}

const handleDragEnd = () => {
  isDragging.value = false
  emit('drag-end', props.appointment.id)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  })
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<style scoped>
.appointment-card {
  user-select: none;
}
</style>

