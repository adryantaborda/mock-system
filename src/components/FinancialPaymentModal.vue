<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg max-w-md w-full mx-4">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold text-gray-800">
            {{ type === 'payable' ? 'Pagar Conta' : 'Receber Conta' }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div class="mt-4">
          <div class="text-sm text-gray-600 mb-1">{{ account.description }}</div>
          <div class="text-2xl font-bold text-gray-800">
            {{ formatCurrency(account.amount) }}
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Forma de Pagamento</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="method in paymentMethods"
              :key="method.value"
              @click="selectedPaymentMethod = method.value"
              :class="[
                'px-4 py-3 rounded-lg border-2 font-medium transition-all text-sm',
                selectedPaymentMethod === method.value
                  ? 'border-navy-700 bg-navy-50 text-navy-800'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              ]"
            >
              <i :class="method.icon + ' mr-2'"></i>
              {{ method.label }}
            </button>
          </div>
        </div>

        <!-- Amount (caso seja parcial) -->
        <div v-if="account.status === 'pendente'">
          <label class="block text-sm font-medium text-gray-700 mb-2">Valor a {{ type === 'payable' ? 'Pagar' : 'Receber' }}</label>
          <input
            v-model.number="paymentAmount"
            type="number"
            step="0.01"
            :min="0"
            :max="account.amount"
            :placeholder="formatCurrency(account.amount)"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent text-lg font-medium"
          />
          <div v-if="paymentAmount < account.amount" class="mt-2 text-xs text-gray-500">
            Pagamento parcial: restará {{ formatCurrency(account.amount - paymentAmount) }}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
        <button
          @click="confirmPayment"
          :disabled="!canConfirm"
          :class="[
            'w-full py-3 rounded-lg font-medium text-white transition-all',
            canConfirm
              ? type === 'payable'
                ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg'
                : 'bg-navy-700 hover:bg-navy-800 active:bg-navy-900 shadow-md hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          ]"
        >
          <i class="pi pi-check mr-2"></i>
          Confirmar {{ type === 'payable' ? 'Pagamento' : 'Recebimento' }}
        </button>
        <button
          @click="$emit('close')"
          class="w-full py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['payable', 'receivable'].includes(value)
  }
})

const emit = defineEmits(['close', 'confirm'])

const selectedPaymentMethod = ref('PIX')
const paymentAmount = ref(props.account.amount - (props.account.paidAmount || props.account.receivedAmount || 0))

const paymentMethods = [
  { value: 'Dinheiro', label: 'Dinheiro', icon: 'pi pi-money-bill' },
  { value: 'PIX', label: 'PIX', icon: 'pi pi-qrcode' },
  { value: 'Cartão de Débito', label: 'Débito', icon: 'pi pi-credit-card' },
  { value: 'Cartão de Crédito', label: 'Crédito', icon: 'pi pi-credit-card' },
  { value: 'Boleto', label: 'Boleto', icon: 'pi pi-file' },
  { value: 'Transferência', label: 'Transferência', icon: 'pi pi-send' }
]

const canConfirm = computed(() => {
  return selectedPaymentMethod.value && paymentAmount.value > 0 && paymentAmount.value <= props.account.amount
})

const confirmPayment = () => {
  if (!canConfirm.value) return
  
  emit('confirm', {
    paymentMethod: selectedPaymentMethod.value,
    amount: paymentAmount.value
  })
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

