<template>
  <aside
    :class="[
      'sidebar fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 flex items-center justify-between">
        <div v-if="!isCollapsed" class="flex items-center gap-2 flex-1">
          <img src="/logo.png" alt="JD Eletronicos" class="w-8 h-8 object-contain" />
          <span class="font-bold text-gray-800">JD Eletronicos</span>
        </div>
        <div v-else class="flex justify-center flex-1">
          <img src="/logo.png" alt="JD Eletronicos" class="w-8 h-8 object-contain" />
        </div>
        <button
          @click="toggleCollapse"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <font-awesome-icon :icon="isCollapsed ? chevronRightIcon : chevronLeftIcon" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4">
        <ul class="space-y-1 px-2">
          <li v-for="item in menuItems" :key="item.id">
            <router-link
              :to="item.path"
              :class="[
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isCollapsed ? 'justify-center' : '',
                isActive(item.path) 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-50'
              ]"
              :title="isCollapsed ? item.label : ''"
            >
              <font-awesome-icon :icon="item.icon" class="text-lg flex-shrink-0" />
              <span v-if="!isCollapsed" class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200">
        <div v-if="!isCollapsed" class="flex items-center gap-3 px-4 py-2">
          <img src="/logo.png" alt="JD Eletronicos" class="w-8 h-8 object-contain" />
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-800">JD Eletronicos</p>
            <p class="text-xs text-gray-500">Sistema de Vendas</p>
          </div>
        </div>
        <div v-else class="flex justify-center">
          <img src="/logo.png" alt="JD Eletronicos" class="w-8 h-8 object-contain" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  faChartLine,
  faCalendarAlt,
  faBox,
  faUsers,
  faShoppingCart,
  faFileAlt,
  faWarehouse,
  faCog,
  faStore,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const route = useRoute()
const isCollapsed = ref(false)

const storeIcon = faStore
const chevronLeftIcon = faChevronLeft
const chevronRightIcon = faChevronRight

const menuItems = [
  {
    id: 1,
    label: 'Dashboard',
    icon: faChartLine,
    path: '/'
  },
  {
    id: 2,
    label: 'Agenda de Vendas',
    icon: faCalendarAlt,
    path: '/agenda'
  },
  {
    id: 3,
    label: 'Produtos',
    icon: faBox,
    path: '/produtos'
  },
  {
    id: 4,
    label: 'Clientes',
    icon: faUsers,
    path: '/clientes'
  },
  {
    id: 5,
    label: 'Vendas',
    icon: faShoppingCart,
    path: '/vendas'
  },
  {
    id: 6,
    label: 'Relatórios',
    icon: faFileAlt,
    path: '/relatorios'
  },
  {
    id: 7,
    label: 'Estoque',
    icon: faWarehouse,
    path: '/estoque'
  },
  {
    id: 8,
    label: 'Configurações',
    icon: faCog,
    path: '/configuracoes'
  }
]

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const isActive = (path) => {
  return route.path === path
}

// Expor isCollapsed para o componente pai se necessário
defineExpose({
  isCollapsed
})
</script>

<style scoped>
.sidebar {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}
</style>
