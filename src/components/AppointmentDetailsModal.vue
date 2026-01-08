<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">Detalhes do Agendamento</h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Informações Básicas -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Informações Básicas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Produto</label>
              <input
                v-model="editedAppointment.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input
                v-model="editedAppointment.client"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input
                v-model="editedAppointment.date"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <input
                v-model="editedAppointment.time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duração (minutos)</label>
              <input
                v-model.number="editedAppointment.duration"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Valor</label>
              <input
                v-model.number="editedAppointment.value"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="editedAppointment.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              >
                <option value="agendado">Agendado</option>
                <option value="confirmado">Confirmado</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Resumo -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Resumo</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-sm text-gray-500">Data e Hora</div>
              <div class="font-medium text-gray-800">
                {{ formatDate(editedAppointment.date) }} às {{ editedAppointment.time }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Duração Total</div>
              <div class="font-medium text-gray-800">{{ editedAppointment.duration }} minutos</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Valor Total</div>
              <div class="font-bold text-lg text-navy-800">
                {{ formatCurrency(editedAppointment.value) }}
              </div>
            </div>
            <div>
              <div class="text-sm text-gray-500">Status</div>
              <span
                :class="[
                  'inline-block px-3 py-1 rounded text-sm font-medium',
                  getStatusClass(editedAppointment.status)
                ]"
              >
                {{ getStatusLabel(editedAppointment.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ações -->
      <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
        <button
          @click="saveChanges"
          class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
        >
          <i class="pi pi-check mr-2"></i>
          Salvar Alterações
        </button>
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          <i class="pi pi-trash mr-2"></i>
          Excluir
        </button>
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update', 'delete'])

const editedAppointment = ref({ ...props.appointment })

watch(() => props.appointment, (newVal) => {
  editedAppointment.value = { ...newVal }
}, { deep: true })

const saveChanges = () => {
  emit('update', editedAppointment.value)
}

const confirmDelete = () => {
  if (confirm('Tem certeza que deseja excluir este agendamento?')) {
    emit('delete', props.appointment.id)
  }
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
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

