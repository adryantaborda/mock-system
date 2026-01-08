<template>
  <button
    @click="$emit('add-to-cart', product)"
    :disabled="product.stock === 0"
    :class="[
      'pos-product-card bg-white rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-lg text-left w-full',
      product.stock === 0 
        ? 'border-gray-200 opacity-50 cursor-not-allowed' 
        : 'border-green-200 hover:border-green-300 cursor-pointer'
    ]"
  >
    <div class="flex items-start gap-3">
      <div class="text-3xl text-gray-400 flex-shrink-0">
        <font-awesome-icon :icon="['fas', product.icon]" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-1">
          <h3 class="font-bold text-sm text-gray-800 truncate">{{ product.name }}</h3>
          <span
            v-if="product.stock > 0 && product.stock < 10"
            class="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700 flex-shrink-0"
          >
            {{ product.stock }} restantes
          </span>
        </div>
        <div class="text-xs text-gray-500 mb-2">{{ product.brand }}</div>
        <div class="flex items-center justify-between">
          <div class="text-lg font-bold text-gray-800">
            {{ formatCurrency(product.price) }}
          </div>
          <div
            v-if="product.stock === 0"
            class="text-xs text-red-600 font-medium"
          >
            Sem estoque
          </div>
          <div
            v-else
            class="text-xs text-green-600 font-medium"
          >
            Estoque: {{ product.stock }}
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>

<style scoped>
.pos-product-card:active:not(:disabled) {
  transform: scale(0.98);
}
</style>

