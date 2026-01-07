<template>
  <div class="enhanced-calendar-view">
    <!-- Controles de Visualização -->
    <div class="mb-6 bg-white rounded-lg p-4 border border-gray-200">
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <!-- Navegação e Visualização -->
        <div class="flex items-center gap-3 flex-wrap">
          <div class="flex gap-2">
            <button
              @click="previousPeriod"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <i class="pi pi-chevron-left"></i>
            </button>
            <button
              @click="nextPeriod"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <i class="pi pi-chevron-right"></i>
            </button>
            <button
              @click="goToToday"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Hoje
            </button>
          </div>
          
          <!-- Seletor de Visualização -->
          <div class="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              v-for="view in viewTypes"
              :key="view.value"
              @click="currentView = view.value"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                currentView === view.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              ]"
            >
              <i :class="view.icon + ' mr-2'"></i>
              {{ view.label }}
            </button>
          </div>
        </div>

        <!-- Período Atual -->
        <div class="text-center lg:text-right">
          <h2 class="text-xl font-semibold text-gray-800">{{ currentPeriodLabel }}</h2>
          <p class="text-sm text-gray-500">{{ appointmentsCount }} agendamentos</p>
        </div>
      </div>
    </div>

    <!-- Filtros Avançados -->
    <div class="mb-6 bg-white rounded-lg p-4 border border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-800">Filtros</h3>
        <button
          @click="showFilters = !showFilters"
          class="text-sm text-blue-600 hover:text-blue-700"
        >
          <i :class="showFilters ? 'pi pi-chevron-up' : 'pi pi-chevron-down' + ' mr-1'"></i>
          {{ showFilters ? 'Ocultar' : 'Mostrar' }} Filtros
        </button>
      </div>
      
      <div v-if="showFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Busca -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
          <input
            v-model="filters.search"
            @input="applyFilters"
            type="text"
            placeholder="Cliente, produto..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Filtro por Cliente -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <select
            v-model="filters.client"
            @change="applyFilters"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Clientes</option>
            <option v-for="client in uniqueClients" :key="client" :value="client">
              {{ client }}
            </option>
          </select>
        </div>

        <!-- Filtro por Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            @change="applyFilters"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="agendado">Agendado</option>
            <option value="confirmado">Confirmado</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <!-- Filtro por Valor -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Valor Mínimo</label>
          <input
            v-model.number="filters.minValue"
            @input="applyFilters"
            type="number"
            placeholder="R$ 0,00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Estatísticas Rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 mb-1">Total Agendado</div>
            <div class="text-2xl font-bold text-gray-800">{{ filteredAppointments.length }}</div>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="pi pi-calendar text-blue-600 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 mb-1">Valor Total</div>
            <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalValue) }}</div>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-dollar text-green-600 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 mb-1">Hoje</div>
            <div class="text-2xl font-bold text-purple-600">{{ todayCount }}</div>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <i class="pi pi-clock text-purple-600 text-xl"></i>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500 mb-1">Esta Semana</div>
            <div class="text-2xl font-bold text-amber-600">{{ weekCount }}</div>
          </div>
          <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <i class="pi pi-calendar-plus text-amber-600 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualização Semanal -->
    <div v-if="currentView === 'week'" class="calendar-week-view">
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="grid grid-cols-8 border-b border-gray-200">
          <div class="p-3 border-r border-gray-200 bg-gray-50 font-medium text-gray-700">
            Horário
          </div>
          <div
            v-for="day in weekDays"
            :key="day.date"
            class="p-3 text-center border-r border-gray-200 last:border-r-0"
            :class="day.isToday ? 'bg-blue-50' : 'bg-gray-50'"
          >
            <div class="text-xs text-gray-500 uppercase mb-1">{{ day.dayName }}</div>
            <div
              :class="[
                'text-lg font-bold',
                day.isToday ? 'text-blue-600' : 'text-gray-800'
              ]"
            >
              {{ day.dayNumber }}
            </div>
          </div>
        </div>
        
        <div class="relative" style="height: 600px; overflow-y: auto;">
          <div
            v-for="hour in timeSlots"
            :key="hour"
            class="grid grid-cols-8 border-b border-gray-100 min-h-[60px]"
          >
            <div class="p-2 border-r border-gray-200 text-xs text-gray-500 text-center">
              {{ hour }}
            </div>
            <div
              v-for="day in weekDays"
              :key="`${day.date}-${hour}`"
              class="border-r border-gray-100 last:border-r-0 relative min-h-[60px]"
              @drop="handleDrop(day.date, hour, $event)"
              @dragover.prevent="handleDragOver"
              @dragenter.prevent
            >
              <div class="absolute inset-0 p-1">
                <EnhancedAppointmentCard
                  v-for="apt in getAppointmentsForSlot(day.date, hour)"
                  :key="apt.id"
                  :appointment="apt"
                  @click="openDetailsModal(apt)"
                  @remove="removeAppointment"
                  @drag-start="handleDragStart"
                  @drag-end="handleDragEnd"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualização Mensal -->
    <div v-else-if="currentView === 'month'" class="calendar-month-view">
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="grid grid-cols-7 border-b border-gray-200">
          <div
            v-for="dayName in weekDayNames"
            :key="dayName"
            class="p-3 text-center bg-gray-50 font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {{ dayName }}
          </div>
        </div>
        <div class="grid grid-cols-7">
          <div
            v-for="day in monthDays"
            :key="day.date"
            :class="[
              'min-h-[120px] p-2 border-r border-b border-gray-200',
              day.isToday ? 'bg-blue-50/30' : day.isCurrentMonth ? 'bg-white' : 'bg-gray-50/50'
            ]"
            @drop="handleDrop(day.date, null, $event)"
            @dragover.prevent="handleDragOver"
            @dragenter.prevent
          >
            <div
              :class="[
                'text-sm font-medium mb-1',
                day.isToday ? 'text-blue-600' : day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
              ]"
            >
              {{ day.dayNumber }}
            </div>
            <div class="space-y-1">
              <EnhancedAppointmentCard
                v-for="apt in getAppointmentsForDay(day.date)"
                :key="apt.id"
                :appointment="apt"
                compact
                @click="openDetailsModal(apt)"
                @remove="removeAppointment"
                @drag-start="handleDragStart"
                @drag-end="handleDragEnd"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Visualização de Lista -->
    <div v-else-if="currentView === 'list'" class="calendar-list-view">
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duração</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="apt in sortedAppointments"
              :key="apt.id"
              class="hover:bg-gray-50 transition-colors cursor-pointer"
              @click="openDetailsModal(apt)"
            >
              <td class="px-4 py-3">
                <div class="text-sm font-medium text-gray-900">{{ formatDate(apt.date) }}</div>
                <div class="text-xs text-gray-500">{{ apt.time }}</div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-700">{{ apt.client }}</td>
              <td class="px-4 py-3 text-sm text-gray-700">{{ apt.title }}</td>
              <td class="px-4 py-3 text-sm text-gray-700">{{ apt.duration }}min</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ formatCurrency(apt.value) }}</td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    getStatusClass(apt.status)
                  ]"
                >
                  {{ getStatusLabel(apt.status) }}
                </span>
              </td>
              <td class="px-4 py-3">
                <button
                  @click.stop="removeAppointment(apt.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <AppointmentDetailsModal
      v-if="selectedAppointment"
      :appointment="selectedAppointment"
      @close="selectedAppointment = null"
      @update="updateAppointment"
      @delete="deleteAppointment"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppointmentsStore } from '../stores/appointments'
import EnhancedAppointmentCard from './EnhancedAppointmentCard.vue'
import AppointmentDetailsModal from './AppointmentDetailsModal.vue'

const appointmentsStore = useAppointmentsStore()
const currentView = ref('week')
const currentDate = ref(new Date())
const showFilters = ref(false)
const selectedAppointment = ref(null)
const draggedId = ref(null)

const viewTypes = [
  { value: 'week', label: 'Semana', icon: 'pi pi-calendar' },
  { value: 'month', label: 'Mês', icon: 'pi pi-calendar-plus' },
  { value: 'list', label: 'Lista', icon: 'pi pi-list' }
]

const filters = ref({
  search: '',
  client: 'all',
  status: 'all',
  minValue: 0
})

const weekDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 8 + i
  return `${String(hour).padStart(2, '0')}:00`
})

const weekDays = computed(() => {
  const start = new Date(currentDate.value)
  start.setDate(start.getDate() - start.getDay())
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    return {
      date: dateString,
      dayName: weekDayNames[date.getDay()],
      dayNumber: date.getDate(),
      isToday: dateString === today.toISOString().split('T')[0]
    }
  })
})

const monthDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const days = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    days.push({
      date: dateString,
      dayNumber: date.getDate(),
      isToday: dateString === today.toISOString().split('T')[0],
      isCurrentMonth: date.getMonth() === month
    })
  }
  return days
})

const filteredAppointments = computed(() => {
  let filtered = appointmentsStore.appointments

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(apt =>
      apt.client.toLowerCase().includes(search) ||
      apt.title.toLowerCase().includes(search)
    )
  }

  if (filters.value.client !== 'all') {
    filtered = filtered.filter(apt => apt.client === filters.value.client)
  }

  if (filters.value.status !== 'all') {
    filtered = filtered.filter(apt => apt.status === filters.value.status)
  }

  if (filters.value.minValue > 0) {
    filtered = filtered.filter(apt => apt.value >= filters.value.minValue)
  }

  return filtered
})

const uniqueClients = computed(() => {
  return [...new Set(appointmentsStore.appointments.map(apt => apt.client))]
})

const sortedAppointments = computed(() => {
  return [...filteredAppointments.value].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`)
    const dateB = new Date(`${b.date} ${b.time}`)
    return dateA - dateB
  })
})

const appointmentsCount = computed(() => filteredAppointments.value.length)
const totalValue = computed(() => {
  return filteredAppointments.value.reduce((sum, apt) => sum + apt.value, 0)
})

const todayCount = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return filteredAppointments.value.filter(apt => apt.date === today).length
})

const weekCount = computed(() => {
  const weekStart = new Date(currentDate.value)
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  
  return filteredAppointments.value.filter(apt => {
    const aptDate = new Date(apt.date)
    return aptDate >= weekStart && aptDate <= weekEnd
  }).length
})

const currentPeriodLabel = computed(() => {
  if (currentView.value === 'week') {
    const start = weekDays.value[0]
    const end = weekDays.value[6]
    return `${start.dayNumber} ${getMonthName(start.date)} - ${end.dayNumber} ${getMonthName(end.date)}`
  } else if (currentView.value === 'month') {
    return currentDate.value.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }
  return 'Todos os Agendamentos'
})

const getMonthName = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', { month: 'short' })
}

const getAppointmentsForDay = (date) => {
  return filteredAppointments.value
    .filter(apt => apt.date === date)
    .sort((a, b) => a.time.localeCompare(b.time))
}

const getAppointmentsForSlot = (date, hour) => {
  return filteredAppointments.value.filter(apt => {
    if (apt.date !== date) return false
    const aptHour = parseInt(apt.time.split(':')[0])
    const slotHour = parseInt(hour.split(':')[0])
    return aptHour === slotHour
  })
}

const previousPeriod = () => {
  if (currentView.value === 'week') {
    currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() - 7))
  } else if (currentView.value === 'month') {
    currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1))
  }
}

const nextPeriod = () => {
  if (currentView.value === 'week') {
    currentDate.value = new Date(currentDate.value.setDate(currentDate.value.getDate() + 7))
  } else if (currentView.value === 'month') {
    currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1))
  }
}

const goToToday = () => {
  currentDate.value = new Date()
}

const applyFilters = () => {
  // Filtros são aplicados automaticamente via computed
}

const handleDrop = (date, hour, event) => {
  event.preventDefault()
  const appointmentId = parseInt(event.dataTransfer.getData('appointment-id'))
  if (appointmentId) {
    const appointment = appointmentsStore.getAppointmentById(appointmentId)
    if (appointment) {
      appointment.date = date
      if (hour) {
        appointment.time = hour
      }
    }
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDragStart = (id) => {
  draggedId.value = id
}

const handleDragEnd = () => {
  draggedId.value = null
}

const removeAppointment = (id) => {
  const index = appointmentsStore.appointments.findIndex(apt => apt.id === id)
  if (index > -1) {
    appointmentsStore.appointments.splice(index, 1)
  }
}

const openDetailsModal = (apt) => {
  selectedAppointment.value = apt
}

const updateAppointment = (updatedApt) => {
  const index = appointmentsStore.appointments.findIndex(apt => apt.id === updatedApt.id)
  if (index > -1) {
    appointmentsStore.appointments[index] = { ...updatedApt }
  }
  selectedAppointment.value = null
}

const deleteAppointment = (id) => {
  removeAppointment(id)
  selectedAppointment.value = null
}

const getStatusClass = (status) => {
  const classes = {
    agendado: 'bg-blue-100 text-blue-700',
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
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.calendar-week-view .enhanced-appointment-card {
  position: absolute;
  width: calc(100% - 4px);
  margin: 2px;
}
</style>

