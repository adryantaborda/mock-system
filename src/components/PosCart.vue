<template>
  <div class="pos-cart bg-white rounded-lg border border-gray-200 flex flex-col h-full">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-lg font-bold text-gray-800">Carrinho</h2>
        <button
          v-if="cart.length > 0"
          @click="$emit('clear-cart')"
          class="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Limpar
        </button>
      </div>
      <div class="text-sm text-gray-500">{{ cartItemsCount }} item(s)</div>
    </div>

    <!-- Cart Items -->
    <div class="flex-1 overflow-y-auto p-4 space-y-2">
      <div
        v-if="cart.length === 0"
        class="text-center py-12 text-gray-400"
      >
        <i class="pi pi-shopping-cart text-4xl mb-2"></i>
        <p class="text-sm">Carrinho vazio</p>
      </div>

      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
      >
        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm text-gray-800 truncate">{{ item.name }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ formatCurrency(item.price) }} cada</div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="$emit('decrease-quantity', item.id)"
            class="w-7 h-7 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
          >
            -
          </button>
          <input
            :value="item.quantity"
            @input="$emit('update-quantity', item.id, parseInt($event.target.value) || 1)"
            type="number"
            min="1"
            :max="item.stock"
            class="w-12 text-center text-sm font-medium border border-gray-300 rounded px-1 py-1"
          />
          <button
            @click="$emit('increase-quantity', item.id)"
            class="w-7 h-7 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
          >
            +
          </button>
        </div>
        <div class="text-right min-w-[80px]">
          <div class="font-bold text-gray-800">{{ formatCurrency(item.price * item.quantity) }}</div>
        </div>
        <button
          @click="$emit('remove-item', item.id)"
          class="text-red-500 hover:text-red-700 p-1"
        >
          <i class="pi pi-trash text-sm"></i>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 space-y-4 bg-gray-50">
      <!-- Subtotal -->
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600">Subtotal:</span>
        <span class="font-medium text-gray-800">{{ formatCurrency(cartTotal) }}</span>
      </div>

      <!-- Total -->
      <div class="flex items-center justify-between text-lg font-bold border-t border-gray-200 pt-3">
        <span class="text-gray-800">Total:</span>
        <span class="text-navy-800 text-xl">{{ formatCurrency(cartTotal) }}</span>
      </div>

      <!-- Finalizar Venda -->
      <button
        @click="$emit('checkout')"
        :disabled="cart.length === 0"
        :class="[
          'w-full py-3 rounded-lg font-medium text-white transition-all',
          cart.length === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg'
        ]"
      >
        <i class="pi pi-check mr-2"></i>
        Finalizar Venda
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cart: {
    type: Array,
    required: true
  },
  cartTotal: {
    type: Number,
    required: true
  },
  cartItemsCount: {
    type: Number,
    required: true
  }
})

defineEmits(['clear-cart', 'checkout', 'remove-item', 'increase-quantity', 'decrease-quantity', 'update-quantity'])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<style scoped>
.pos-cart {
  min-height: 600px;
  max-height: calc(100vh - 200px);
}
</style>

