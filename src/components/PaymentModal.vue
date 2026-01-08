<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-xl font-bold text-gray-800">Finalizar Venda</h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div class="text-2xl font-bold text-navy-800 mt-4">
          {{ formatCurrency(total) }}
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

        <!-- Cash Input -->
        <div v-if="selectedPaymentMethod === 'Dinheiro'">
          <label class="block text-sm font-medium text-gray-700 mb-2">Valor Recebido</label>
          <input
            v-model.number="cashReceived"
            type="number"
            step="0.01"
            min="0"
            :min="total"
            placeholder="0,00"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent text-lg font-medium"
            @input="calculateChange"
          />
          <div v-if="cashReceived > 0 && change >= 0" class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="text-sm text-green-700 mb-1">Troco:</div>
            <div class="text-2xl font-bold text-green-800">{{ formatCurrency(change) }}</div>
          </div>
          <div v-else-if="cashReceived > 0 && change < 0" class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="text-sm text-red-700">Valor insuficiente</div>
          </div>
        </div>

        <!-- Cash Register Status -->
        <div v-if="!cashRegisterOpen" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-start gap-3">
            <i class="pi pi-exclamation-triangle text-yellow-600 mt-0.5"></i>
            <div class="flex-1">
              <div class="text-sm font-medium text-yellow-800 mb-1">Caixa não aberto</div>
              <div class="text-xs text-yellow-700">A venda será registrada, mas não afetará o saldo do caixa.</div>
            </div>
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
              ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          ]"
        >
          <i class="pi pi-check mr-2"></i>
          Confirmar Pagamento
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
import { ref, computed, watch } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  cashRegisterOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'confirm'])

const selectedPaymentMethod = ref('Dinheiro')
const cashReceived = ref(0)
const change = ref(0)

const paymentMethods = [
  { value: 'Dinheiro', label: 'Dinheiro', icon: 'pi pi-money-bill' },
  { value: 'PIX', label: 'PIX', icon: 'pi pi-qrcode' },
  { value: 'Cartão de Débito', label: 'Débito', icon: 'pi pi-credit-card' },
  { value: 'Cartão de Crédito', label: 'Crédito', icon: 'pi pi-credit-card' }
]

const calculateChange = () => {
  if (selectedPaymentMethod.value === 'Dinheiro' && cashReceived.value > 0) {
    change.value = Math.max(0, cashReceived.value - props.total)
  } else {
    change.value = 0
  }
}

const canConfirm = computed(() => {
  if (selectedPaymentMethod.value === 'Dinheiro') {
    return cashReceived.value >= props.total
  }
  return true
})

watch(() => selectedPaymentMethod.value, () => {
  if (selectedPaymentMethod.value !== 'Dinheiro') {
    cashReceived.value = 0
    change.value = 0
  } else {
    calculateChange()
  }
})

watch(() => cashReceived.value, calculateChange)
watch(() => props.total, calculateChange)

const confirmPayment = () => {
  emit('confirm', {
    paymentMethod: selectedPaymentMethod.value,
    cashReceived: cashReceived.value,
    change: change.value
  })
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

