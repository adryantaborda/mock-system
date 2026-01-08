import { defineStore } from 'pinia'

export const useAppointmentsStore = defineStore('appointments', {
  state: () => {
    const today = new Date()
    const getDateString = (daysOffset) => {
      const date = new Date(today)
      date.setDate(date.getDate() + daysOffset)
      return date.toISOString().split('T')[0]
    }

    return {
      appointments: [
        {
          id: 1,
          title: 'iPhone 15 Pro Max',
          client: 'João Silva',
          time: '09:00',
          date: getDateString(0),
          duration: 60,
          value: 8999.00,
          color: 'bg-green-50/80 border-green-300/60 text-navy-900',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 2,
          title: 'Notebook Dell XPS 15',
          client: 'Maria Santos',
          time: '10:30',
          date: getDateString(0),
          duration: 90,
          value: 12999.00,
          color: 'bg-purple-50/80 border-purple-300/60 text-purple-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 3,
          title: 'Samsung Galaxy S24',
          client: 'Pedro Costa',
          time: '14:00',
          date: getDateString(0),
          duration: 45,
          value: 5499.00,
          color: 'bg-green-50/80 border-green-300/60 text-green-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 4,
          title: 'iPad Air 5ª Geração',
          client: 'Ana Oliveira',
          time: '15:30',
          date: getDateString(1),
          duration: 30,
          value: 4299.00,
          color: 'bg-amber-50/80 border-amber-300/60 text-amber-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 5,
          title: 'MacBook Pro M3',
          client: 'Carlos Mendes',
          time: '16:00',
          date: getDateString(1),
          duration: 60,
          value: 18999.00,
          color: 'bg-rose-50/80 border-rose-300/60 text-rose-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 6,
          title: 'AirPods Pro 2',
          client: 'Fernanda Lima',
          time: '11:00',
          date: getDateString(1),
          duration: 20,
          value: 2199.00,
          color: 'bg-cyan-50/80 border-cyan-300/60 text-cyan-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 7,
          title: 'Monitor LG UltraWide',
          client: 'Roberto Alves',
          time: '09:30',
          date: getDateString(2),
          duration: 40,
          value: 3499.00,
          color: 'bg-indigo-50/80 border-indigo-300/60 text-indigo-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 8,
          title: 'PlayStation 5',
          client: 'Lucas Ferreira',
          time: '13:00',
          date: getDateString(2),
          duration: 45,
          value: 4499.00,
          color: 'bg-emerald-50/80 border-emerald-300/60 text-emerald-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 9,
          title: 'Smart TV Samsung 65"',
          client: 'Juliana Rocha',
          time: '10:00',
          date: getDateString(3),
          duration: 60,
          value: 6999.00,
          color: 'bg-pink-50/80 border-pink-300/60 text-pink-800',
          status: 'agendado',
          type: 'venda'
        },
        {
          id: 10,
          title: 'Xbox Series X',
          client: 'Rafael Souza',
          time: '14:30',
          date: getDateString(3),
          duration: 45,
          value: 4999.00,
          color: 'bg-teal-50/80 border-teal-300/60 text-teal-800',
          status: 'agendado',
          type: 'venda'
        }
      ]
    }
  },
  getters: {
    getAppointmentById: (state) => (id) => {
      return state.appointments.find(apt => apt.id === id)
    },
    getAppointmentsByDate: (state) => {
      const grouped = {}
      state.appointments.forEach(apt => {
        if (!grouped[apt.date]) {
          grouped[apt.date] = []
        }
        grouped[apt.date].push(apt)
      })
      // Ordenar por horário dentro de cada dia
      Object.keys(grouped).forEach(date => {
        grouped[date].sort((a, b) => a.time.localeCompare(b.time))
      })
      return grouped
    },
    getSortedDates: (state) => {
      const dates = [...new Set(state.appointments.map(apt => apt.date))]
      return dates.sort()
    }
  },
  actions: {
    updateAppointmentPosition(appointmentId, newPosition) {
      const appointment = this.appointments.find(apt => apt.id === appointmentId)
      if (appointment) {
        // Atualizar posição do agendamento
        Object.assign(appointment, newPosition)
      }
    },
    reorderAppointments(newOrder) {
      this.appointments = newOrder
    }
  }
})

