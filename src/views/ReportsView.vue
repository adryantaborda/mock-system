<template>
  <div class="reports-view bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Relatórios</h1>
      <p class="text-gray-500">Análise completa de vendas, produtos e clientes</p>
    </div>

    <!-- Filtros de Período -->
    <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="flex items-center gap-4 flex-wrap">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
            <input
              v-model="dateRange.start"
              type="date"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
            <input
              v-model="dateRange.end"
              type="date"
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
          <div class="flex items-end gap-2">
            <button
              @click="applyDateRange"
              class="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
            >
              Aplicar
            </button>
            <button
              @click="resetDateRange"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
        <button
          @click="exportReport"
          class="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <i class="pi pi-download mr-2"></i>
          Exportar Relatório
        </button>
      </div>
    </div>

    <!-- Resumo Executivo -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Total de Vendas</span>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-shopping-cart text-navy-800"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ reportData.totalSales }}</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="pi pi-arrow-up text-xs"></i> +{{ reportData.salesGrowth }}% vs período anterior
        </p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Receita Total</span>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="pi pi-dollar text-green-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ formatCurrency(reportData.totalRevenue) }}</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="pi pi-arrow-up text-xs"></i> +{{ reportData.revenueGrowth }}% vs período anterior
        </p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Ticket Médio</span>
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <i class="pi pi-chart-line text-purple-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ formatCurrency(reportData.averageTicket) }}</p>
        <p class="text-sm text-red-600 mt-1">
          <i class="pi pi-arrow-down text-xs"></i> -{{ reportData.ticketChange }}% vs período anterior
        </p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Clientes Ativos</span>
          <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <i class="pi pi-users text-amber-600"></i>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-800">{{ reportData.activeClients }}</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="pi pi-arrow-up text-xs"></i> +{{ reportData.clientsGrowth }}% vs período anterior
        </p>
      </div>
    </div>

    <!-- Gráficos Principais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Vendas ao Longo do Tempo -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Vendas ao Longo do Tempo</h2>
        <v-chart 
          class="chart" 
          :option="salesOverTimeOption" 
          :style="{ height: '300px' }"
        />
      </div>

      <!-- Vendas por Categoria -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Vendas por Categoria</h2>
        <v-chart 
          class="chart" 
          :option="categorySalesOption" 
          :style="{ height: '300px' }"
        />
      </div>
    </div>

    <!-- Gráficos Secundários -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Top 10 Produtos -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Top 10 Produtos Mais Vendidos</h2>
        <v-chart 
          class="chart" 
          :option="topProductsOption" 
          :style="{ height: '350px' }"
        />
      </div>

      <!-- Vendas por Cliente -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Top 10 Clientes</h2>
        <v-chart 
          class="chart" 
          :option="topClientsOption" 
          :style="{ height: '350px' }"
        />
      </div>
    </div>

    <!-- Tabelas de Dados -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Vendas por Dia da Semana -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Vendas por Dia da Semana</h2>
        <div class="space-y-3">
          <div
            v-for="day in weeklySales"
            :key="day.day"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-navy-800 font-bold text-sm">{{ day.day[0] }}</span>
              </div>
              <div>
                <div class="font-medium text-gray-800">{{ day.day }}</div>
                <div class="text-sm text-gray-500">{{ day.count }} vendas</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-gray-800">{{ formatCurrency(day.revenue) }}</div>
              <div class="text-xs text-gray-500">{{ day.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Métricas de Performance -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Métricas de Performance</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-medium text-gray-800">Taxa de Conversão</div>
              <div class="text-sm text-gray-500">Agendamentos convertidos em vendas</div>
            </div>
            <div class="text-2xl font-bold text-navy-800">{{ reportData.conversionRate }}%</div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-medium text-gray-800">Vendas por Cliente</div>
              <div class="text-sm text-gray-500">Média de vendas por cliente</div>
            </div>
            <div class="text-2xl font-bold text-green-600">{{ reportData.salesPerClient }}</div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-medium text-gray-800">Produtos Únicos Vendidos</div>
              <div class="text-sm text-gray-500">Quantidade de produtos diferentes</div>
            </div>
            <div class="text-2xl font-bold text-purple-600">{{ reportData.uniqueProducts }}</div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div class="font-medium text-gray-800">Dias com Vendas</div>
              <div class="text-sm text-gray-500">Dias únicos com vendas realizadas</div>
            </div>
            <div class="text-2xl font-bold text-amber-600">{{ reportData.activeDays }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráfico de Tendência -->
    <div class="bg-white rounded-lg p-6 border border-gray-200 mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Tendência de Receita (Últimos 6 Meses)</h2>
      <v-chart 
        class="chart" 
        :option="revenueTrendOption" 
        :style="{ height: '400px' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const dateRange = ref({
  start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
  end: new Date().toISOString().split('T')[0]
})

const reportData = ref({
  totalSales: 342,
  salesGrowth: 12.5,
  totalRevenue: 1254500.00,
  revenueGrowth: 15.3,
  averageTicket: 3670.00,
  ticketChange: 2.1,
  activeClients: 89,
  clientsGrowth: 8.3,
  conversionRate: 78.5,
  salesPerClient: 3.8,
  uniqueProducts: 16,
  activeDays: 28
})

const weeklySales = ref([
  { day: 'Segunda', count: 52, revenue: 191080.00, percentage: 15.2 },
  { day: 'Terça', count: 48, revenue: 176160.00, percentage: 14.0 },
  { day: 'Quarta', count: 55, revenue: 201850.00, percentage: 16.1 },
  { day: 'Quinta', count: 51, revenue: 187170.00, percentage: 14.9 },
  { day: 'Sexta', count: 62, revenue: 227540.00, percentage: 18.1 },
  { day: 'Sábado', count: 45, revenue: 165150.00, percentage: 13.2 },
  { day: 'Domingo', count: 29, revenue: 106350.00, percentage: 8.5 }
])

const salesOverTimeOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value) => `R$ ${(value / 1000).toFixed(0)}k`
    }
  },
  series: [{
    name: 'Vendas',
    type: 'line',
    smooth: true,
    data: [280000, 310000, 295000, 369500],
    itemStyle: { color: '#00699b' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(0, 105, 155, 0.3)' },
          { offset: 1, color: 'rgba(0, 105, 155, 0.05)' }
        ]
      }
    }
  }]
}))

const categorySalesOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: R$ {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: 'middle'
  },
  series: [{
    name: 'Vendas por Categoria',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: { show: false },
    emphasis: {
      label: { show: true, fontSize: 16, fontWeight: 'bold' }
    },
    labelLine: { show: false },
    data: [
      { value: 450000, name: 'Smartphones', itemStyle: { color: '#00699b' } },
      { value: 350000, name: 'Notebooks', itemStyle: { color: '#8b5cf6' } },
      { value: 280000, name: 'Tablets', itemStyle: { color: '#10b981' } },
      { value: 175000, name: 'Acessórios', itemStyle: { color: '#f59e0b' } }
    ]
  }]
}))

const topProductsOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['iPhone 15 Pro', 'MacBook Pro', 'Samsung S24', 'iPad Air', 'Dell XPS', 'AirPods Pro', 'PlayStation 5', 'Smart TV', 'Xbox Series X', 'Monitor LG']
  },
  series: [{
    name: 'Quantidade',
    type: 'bar',
    data: [45, 38, 32, 28, 25, 35, 18, 10, 14, 22],
    itemStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [
          { offset: 0, color: '#8b5cf6' },
          { offset: 1, color: '#a78bfa' }
        ]
      }
    }
  }]
}))

const topClientsOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value) => `R$ ${(value / 1000).toFixed(0)}k`
    }
  },
  yAxis: {
    type: 'category',
    data: ['Ana Oliveira', 'Patricia Gomes', 'Maria Santos', 'Rafael Souza', 'Carlos Mendes', 'João Silva', 'Lucas Ferreira', 'Roberto Alves', 'Pedro Costa', 'Fernanda Lima']
  },
  series: [{
    name: 'Total Gasto',
    type: 'bar',
    data: [125400, 134850, 78900, 76989, 56994, 45250, 40491, 24493, 22497, 8796],
    itemStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [
          { offset: 0, color: '#10b981' },
          { offset: 1, color: '#34d399' }
        ]
      }
    }
  }]
}))

const revenueTrendOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {
    data: ['Receita', 'Meta']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value) => `R$ ${(value / 1000).toFixed(0)}k`
    }
  },
  series: [
    {
      name: 'Receita',
      type: 'line',
      smooth: true,
      data: [980000, 1050000, 1120000, 1180000, 1200000, 1254500],
      itemStyle: { color: '#3b82f6' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ]
        }
      }
    },
    {
      name: 'Meta',
      type: 'line',
      smooth: true,
      data: [1000000, 1000000, 1100000, 1150000, 1200000, 1200000],
      itemStyle: { color: '#10b981' },
      lineStyle: { type: 'dashed' }
    }
  ]
}))

const applyDateRange = () => {
  // Lógica para aplicar filtro de data
  console.log('Aplicando filtro de data:', dateRange.value)
}

const resetDateRange = () => {
  dateRange.value = {
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  }
}

const exportReport = () => {
  alert('Funcionalidade de exportação será implementada em breve!')
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

onMounted(() => {
  // Inicialização
})
</script>

<style scoped>
.chart {
  width: 100%;
}
</style>

