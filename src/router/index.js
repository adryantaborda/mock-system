import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import ClientsView from '../views/ClientsView.vue'
import SalesView from '../views/SalesView.vue'
import ReportsView from '../views/ReportsView.vue'
import InventoryView from '../views/InventoryView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: HomeView
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: ProductsView
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientsView
    },
    {
      path: '/vendas',
      name: 'vendas',
      component: SalesView
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: ReportsView
    },
    {
      path: '/estoque',
      name: 'estoque',
      component: InventoryView
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: SettingsView
    }
  ]
})

export default router

