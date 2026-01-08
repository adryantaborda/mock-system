<template>
  <div class="login-view min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card de Login -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Logo e Título -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <img src="/atlas.svg" alt="Atlas Vendas ERP" class="w-16 h-16 object-contain" />
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Atlas Vendas ERP</h1>
          <p class="text-gray-500">Faça login para acessar o sistema</p>
        </div>

        <!-- Formulário de Login -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Campo Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="pi pi-envelope mr-2"></i>
              E-mail
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="seu@email.com"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition-all"
            />
          </div>

          <!-- Campo Senha -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="pi pi-lock mr-2"></i>
              Senha
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Digite sua senha"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
              </button>
            </div>
          </div>

          <!-- Lembrar-me e Esqueci a senha -->
          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 text-navy-800 border-gray-300 rounded focus:ring-navy-700"
              />
              <span class="ml-2 text-sm text-gray-600">Lembrar-me</span>
            </label>
            <a href="#" class="text-sm text-navy-800 hover:text-navy-900 font-medium">
              Esqueci minha senha
            </a>
          </div>

          <!-- Mensagem de Erro -->
          <div
            v-if="error"
            class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2"
          >
            <i class="pi pi-exclamation-triangle"></i>
            {{ error }}
          </div>

          <!-- Botão de Login -->
          <button
            type="submit"
            :disabled="loading"
            :class="[
              'w-full py-3 rounded-lg font-medium text-white transition-all',
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-navy-800 active:bg-navy-900 shadow-md hover:shadow-lg'
            ]"
          >
            <span v-if="!loading" class="flex items-center justify-center gap-2">
              <i class="pi pi-sign-in"></i>
              Entrar
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <i class="pi pi-spin pi-spinner"></i>
              Entrando...
            </span>
          </button>
        </form>

        <!-- Divisor -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-200"></div>
          <span class="px-4 text-sm text-gray-500">ou</span>
          <div class="flex-1 border-t border-gray-200"></div>
        </div>

        <!-- Botões OAuth -->
        <div class="space-y-3 mb-6">
          <button
            @click="handleOAuthLogin('google')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continuar com Google</span>
          </button>

          <button
            @click="handleOAuthLogin('microsoft')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" viewBox="0 0 23 23" fill="none">
              <path fill="#F25022" d="M0 0h11v11H0z"/>
              <path fill="#7FBA00" d="M12 0h11v11H12z"/>
              <path fill="#00A4EF" d="M0 12h11v11H0z"/>
              <path fill="#FFB900" d="M12 12h11v11H12z"/>
            </svg>
            <span>Continuar com Microsoft</span>
          </button>

          <button
            @click="handleOAuthLogin('github')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 border-2 border-gray-900 rounded-lg font-medium text-white hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.464-1.184-1.134-1.498-1.134-1.498-.927-.635.07-.622.07-.622 1.025.072 1.564 1.052 1.564 1.052.911 1.561 2.389 1.111 2.971.849.092-.66.356-1.111.649-1.367-2.226-.253-4.567-1.113-4.567-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
            </svg>
            <span>Continuar com GitHub</span>
          </button>
        </div>

        <!-- Informações de Demo -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="pi pi-info-circle text-navy-800 mt-0.5"></i>
            <div class="flex-1">
              <div class="text-sm font-medium text-navy-900 mb-1">Acesso de Demonstração</div>
              <div class="text-xs text-navy-900">
                <p class="mb-1">E-mail: <span class="font-mono font-semibold">admin@atlas.com</span></p>
                <p>Senha: <span class="font-mono font-semibold">admin123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6 text-sm text-gray-600">
        <p>© 2024 Atlas Vendas ERP. Todos os direitos reservados.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const form = ref({
  email: '',
  password: '',
  remember: false
})
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  // Simular delay de autenticação
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Validação usando a store
  const success = authStore.login(form.value.email, form.value.password)
  
  if (success) {
    router.push('/')
  } else {
    error.value = 'E-mail ou senha incorretos. Tente novamente.'
    loading.value = false
  }
}

const handleOAuthLogin = async (provider) => {
  error.value = ''
  loading.value = true

  // Simular delay de autenticação OAuth
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Simular login OAuth bem-sucedido
  // Em produção, isso redirecionaria para o provedor OAuth
  const mockEmail = `${provider}@atlas.com`
  const success = authStore.login(mockEmail, 'oauth')
  
  if (success) {
    router.push('/')
  } else {
    error.value = `Erro ao autenticar com ${provider}. Tente novamente.`
    loading.value = false
  }
}
</script>

<style scoped>
.login-view {
  background: linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%);
}
</style>

