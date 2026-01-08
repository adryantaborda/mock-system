import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import ClientsView from '../views/ClientsView.vue'
import SalesView from '../views/SalesView.vue'
import ReportsView from '../views/ReportsView.vue'
import InventoryView from '../views/InventoryView.vue'
import SettingsView from '../views/SettingsView.vue'
import PosView from '../views/PosView.vue'
import FinancialView from '../views/FinancialView.vue'
import LoginView from '../views/LoginView.vue'
import { requireAuth, requireGuest } from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: requireGuest
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: requireAuth
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: ProductsView,
      beforeEnter: requireAuth
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientsView,
      beforeEnter: requireAuth
    },
    {
      path: '/pos',
      name: 'pos',
      component: PosView,
      beforeEnter: requireAuth
    },
    {
      path: '/vendas',
      name: 'vendas',
      component: SalesView,
      beforeEnter: requireAuth
    },
    {
      path: '/financeiro',
      name: 'financeiro',
      component: FinancialView,
      beforeEnter: requireAuth
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: ReportsView,
      beforeEnter: requireAuth
    },
    {
      path: '/estoque',
      name: 'estoque',
      component: InventoryView,
      beforeEnter: requireAuth
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: SettingsView,
      beforeEnter: requireAuth
    }
  ]
})

export default router

