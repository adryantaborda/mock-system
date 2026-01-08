<template>
  <div class="dashboard bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p class="text-gray-500">Visão geral das vendas e métricas</p>
    </div>

    <!-- Cards de Métricas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Total de Vendas</span>
          <font-awesome-icon :icon="['fas', 'shopping-cart']" class="text-green-500" />
        </div>
        <p class="text-2xl font-bold text-gray-800">R$ 125.450,00</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="pi pi-arrow-up text-xs"></i> +12.5% vs mês anterior
        </p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Produtos Vendidos</span>
          <font-awesome-icon :icon="['fas', 'box']" class="text-purple-500" />
        </div>
        <p class="text-2xl font-bold text-gray-800">342</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="pi pi-arrow-up text-xs"></i> +8.3% vs mês anterior
        </p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Novos Clientes</span>
          <font-awesome-icon :icon="['fas', 'users']" class="text-green-500" />
        </div>
        <p class="text-2xl font-bold text-gray-800">89</p>
        <p class="text-sm text-green-600 mt-1">
          <i class="pi pi-arrow-up text-xs"></i> +15.2% vs mês anterior
        </p>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-500 text-sm">Ticket Médio</span>
          <font-awesome-icon :icon="['fas', 'chart-line']" class="text-amber-500" />
        </div>
        <p class="text-2xl font-bold text-gray-800">R$ 367,00</p>
        <p class="text-sm text-red-600 mt-1">
          <i class="pi pi-arrow-down text-xs"></i> -2.1% vs mês anterior
        </p>
      </div>
    </div>

    <!-- Gráficos Principais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Gráfico de Vendas ao Longo do Tempo -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Vendas ao Longo do Tempo</h2>
        <v-chart 
          class="chart" 
          :option="salesChartOption" 
          :style="{ height: '300px' }"
        />
      </div>

      <!-- Gráfico de Produtos Mais Vendidos -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Produtos Mais Vendidos</h2>
        <v-chart 
          class="chart" 
          :option="productsChartOption" 
          :style="{ height: '300px' }"
        />
      </div>
    </div>

    <!-- Gráficos Secundários -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico de Pizza - Categorias -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Vendas por Categoria</h2>
        <v-chart 
          class="chart" 
          :option="categoryChartOption" 
          :style="{ height: '300px' }"
        />
      </div>

      <!-- Gráfico de Área - Receita Mensal -->
      <div class="bg-white rounded-lg p-6 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Receita Mensal</h2>
        <v-chart 
          class="chart" 
          :option="revenueChartOption" 
          :style="{ height: '300px' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
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

// Registrar componentes do ECharts
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

// Opções do gráfico de vendas ao longo do tempo
const salesChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
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
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value) => `R$ ${(value / 1000).toFixed(0)}k`
    }
  },
  series: [
    {
      name: 'Vendas',
      type: 'line',
      smooth: true,
      data: [32000, 35000, 28000, 42000, 38000, 45000, 52000, 48000, 55000, 60000, 58000, 65000],
      itemStyle: {
        color: '#00699b'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0, 105, 155, 0.3)' },
            { offset: 1, color: 'rgba(0, 105, 155, 0.05)' }
          ]
        }
      }
    }
  ]
}

// Opções do gráfico de produtos mais vendidos
const productsChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
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
    data: ['iPhone 15', 'MacBook Pro', 'iPad Air', 'Samsung S24', 'Notebook Dell', 'Smart TV']
  },
  series: [
    {
      name: 'Quantidade',
      type: 'bar',
      data: [45, 38, 32, 28, 25, 22],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#a78bfa' }
          ]
        }
      }
    }
  ]
}

// Opções do gráfico de pizza - categorias
const categoryChartOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: R$ {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: 'middle'
  },
  series: [
    {
      name: 'Vendas por Categoria',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 45000, name: 'Smartphones', itemStyle: { color: '#00699b' } },
        { value: 35000, name: 'Notebooks', itemStyle: { color: '#8b5cf6' } },
        { value: 28000, name: 'Tablets', itemStyle: { color: '#10b981' } },
        { value: 17500, name: 'Acessórios', itemStyle: { color: '#f59e0b' } }
      ]
    }
  ]
}

// Opções do gráfico de área - receita mensal
const revenueChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
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
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
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
      data: [28000, 32000, 25000, 38000, 35000, 42000],
      itemStyle: {
        color: '#10b981'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
            { offset: 1, color: 'rgba(16, 185, 129, 0.05)' }
          ]
        }
      }
    }
  ]
}
</script>

<style scoped>
.chart {
  width: 100%;
}
</style>

