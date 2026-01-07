<template>
  <div class="appointments-panel bg-white rounded-lg p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Agenda de Vendas</h1>
      <p class="text-gray-500">Organize suas vendas de eletrônicos arrastando os cards entre os dias</p>
    </div>

    <div class="flex gap-3 mb-6">
      <button
        @click="addAppointment"
        class="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors"
      >
        <i class="pi pi-plus mr-2"></i>
        Nova Venda
      </button>
      <button
        @click="clearAll"
        class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        <i class="pi pi-trash mr-2"></i>
        Limpar Tudo
      </button>
    </div>

    <EnhancedCalendarView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppointmentsStore } from '../stores/appointments'
import EnhancedCalendarView from './EnhancedCalendarView.vue'

const appointmentsStore = useAppointmentsStore()

const addAppointment = () => {
  const products = [
    'iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Air M2', 'iPad Pro',
    'Notebook Lenovo', 'Smart TV LG 55"', 'Nintendo Switch', 'AirPods Max',
    'Monitor Dell 27"', 'Teclado Mecânico', 'Mouse Logitech', 'Webcam 4K'
  ]
  
  const clients = [
    'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira',
    'Carlos Mendes', 'Fernanda Lima', 'Roberto Alves', 'Lucas Ferreira',
    'Juliana Rocha', 'Rafael Souza', 'Patricia Gomes', 'Bruno Martins'
  ]
  
  const colors = [
    'bg-blue-50/80 border-blue-300/60 text-blue-800',
    'bg-purple-50/80 border-purple-300/60 text-purple-800',
    'bg-green-50/80 border-green-300/60 text-green-800',
    'bg-amber-50/80 border-amber-300/60 text-amber-800',
    'bg-rose-50/80 border-rose-300/60 text-rose-800',
    'bg-cyan-50/80 border-cyan-300/60 text-cyan-800',
    'bg-indigo-50/80 border-indigo-300/60 text-indigo-800',
    'bg-emerald-50/80 border-emerald-300/60 text-emerald-800'
  ]
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomProduct = products[Math.floor(Math.random() * products.length)]
  const randomClient = clients[Math.floor(Math.random() * clients.length)]
  const hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
  const randomHour = hours[Math.floor(Math.random() * hours.length)]
  const durations = [30, 45, 60]
  const randomDuration = durations[Math.floor(Math.random() * durations.length)]
  const randomValue = Math.floor(Math.random() * 15000) + 1000
  
  // Adicionar ao dia atual
  const today = new Date().toISOString().split('T')[0]
  
  const newAppointment = {
    id: Date.now(),
    title: randomProduct,
    client: randomClient,
    time: randomHour,
    date: today,
    duration: randomDuration,
    value: randomValue,
    color: randomColor,
    status: 'agendado',
    type: 'venda'
  }
  
  appointmentsStore.appointments.push(newAppointment)
}

const clearAll = () => {
  if (confirm('Tem certeza que deseja remover todas as vendas?')) {
    appointmentsStore.appointments = []
  }
}
</script>

<style scoped>
.drop-zone {
  transition: background-color 0.2s;
}

.drop-zone.drag-over {
  background-color: #e5e7eb;
}
</style>

