<template>
  <div class="calendar-view">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex gap-2">
        <button
          @click="previousWeek"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          <i class="pi pi-chevron-left"></i>
        </button>
        <button
          @click="nextWeek"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          <i class="pi pi-chevron-right"></i>
        </button>
        <button
          @click="goToToday"
          class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          Hoje
        </button>
      </div>
      <h2 class="text-xl font-semibold text-gray-800">{{ weekRange }}</h2>
    </div>

    <div class="calendar-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
      <div
        v-for="day in weekDays"
        :key="day.date"
        :data-date="day.date"
        :class="[
          'day-column rounded-lg p-3 min-h-[600px]',
          day.isToday ? 'bg-blue-50/30 border-2 border-blue-300' : 'bg-gray-50/50 border border-gray-200'
        ]"
        @drop="handleDrop(day.date, $event)"
        @dragover.prevent="handleDragOver"
        @dragenter.prevent="handleDragEnter"
        @dragleave="handleDragLeave"
      >
        <div class="day-header mb-3">
          <div class="text-sm font-medium text-gray-500 uppercase mb-1">
            {{ day.dayName }}
          </div>
          <div
            :class="[
              'text-lg font-bold',
              day.isToday ? 'text-blue-600' : 'text-gray-800'
            ]"
          >
            {{ day.dayNumber }}
          </div>
        </div>

        <div class="day-appointments space-y-2">
          <AppointmentCard
            v-for="appointment in getAppointmentsForDay(day.date)"
            :key="appointment.id"
            :appointment="appointment"
            @remove="removeAppointment"
            @drag-start="handleDragStart"
            @drag-end="handleDragEnd"
          />
          
          <div
            v-if="getAppointmentsForDay(day.date).length === 0"
            class="text-center text-gray-400 text-sm py-4"
          >
            <i class="pi pi-calendar-plus text-2xl mb-2 block"></i>
            <span>Sem vendas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppointmentsStore } from '../stores/appointments'
import AppointmentCard from './AppointmentCard.vue'

const appointmentsStore = useAppointmentsStore()
const currentWeekStart = ref(new Date())
const draggedId = ref(null)
const dragOverDay = ref(null)

const weekDays = computed(() => {
  const start = new Date(currentWeekStart.value)
  start.setDate(start.getDate() - start.getDay()) // Domingo
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    
    const dateString = date.toISOString().split('T')[0]
    const isToday = dateString === today.toISOString().split('T')[0]
    
    days.push({
      date: dateString,
      dayName: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      dayNumber: date.getDate(),
      isToday
    })
  }
  return days
})

const weekRange = computed(() => {
  const start = weekDays.value[0]
  const end = weekDays.value[6]
  const startDate = new Date(start.date)
  const endDate = new Date(end.date)
  
  return `${startDate.getDate()} ${startDate.toLocaleDateString('pt-BR', { month: 'short' })} - ${endDate.getDate()} ${endDate.toLocaleDateString('pt-BR', { month: 'short' })}`
})

const getAppointmentsForDay = (date) => {
  const appointmentsByDate = appointmentsStore.getAppointmentsByDate
  const dayAppointments = appointmentsByDate[date] || []
  // Ordenar por horário
  return [...dayAppointments].sort((a, b) => a.time.localeCompare(b.time))
}

const previousWeek = () => {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  currentWeekStart.value = newDate
}

const nextWeek = () => {
  const newDate = new Date(currentWeekStart.value)
  newDate.setDate(newDate.getDate() + 7)
  currentWeekStart.value = newDate
}

const goToToday = () => {
  currentWeekStart.value = new Date()
}

const handleDragStart = (id) => {
  draggedId.value = id
}

const handleDragEnd = () => {
  draggedId.value = null
  dragOverDay.value = null
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDragEnter = (event) => {
  const dayColumn = event.currentTarget
  if (dayColumn && dayColumn.classList.contains('day-column')) {
    dragOverDay.value = dayColumn
    dayColumn.classList.add('drag-over')
  }
}

const handleDragLeave = (event) => {
  const dayColumn = event.currentTarget
  if (dayColumn.classList.contains('day-column')) {
    dayColumn.classList.remove('drag-over')
  }
}

const handleDrop = (targetDate, event) => {
  event.preventDefault()
  const dayColumn = event.currentTarget
  if (dayColumn) {
    dayColumn.classList.remove('drag-over')
  }
  
  const appointmentId = parseInt(event.dataTransfer.getData('appointment-id'))
  if (appointmentId) {
    const appointment = appointmentsStore.getAppointmentById(appointmentId)
    if (appointment && appointment.date !== targetDate) {
      appointment.date = targetDate
    }
  }
  draggedId.value = null
  dragOverDay.value = null
}

const removeAppointment = (id) => {
  const index = appointmentsStore.appointments.findIndex(apt => apt.id === id)
  if (index > -1) {
    appointmentsStore.appointments.splice(index, 1)
  }
}
</script>

<style scoped>
.calendar-grid {
  min-height: 600px;
}

.day-column {
  transition: all 0.2s;
}

.day-column.drag-over {
  background-color: #dbeafe;
  border-color: #60a5fa;
}

.day-appointments {
  min-height: 500px;
}
</style>

