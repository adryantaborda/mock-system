<template>
  <div
    :class="[
      'product-card bg-white rounded-lg border-2 p-5 transition-all duration-200 hover:shadow-lg',
      product.color
    ]"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="text-4xl text-gray-600">
        <font-awesome-icon :icon="['fas', product.icon]" />
      </div>
      <div
        :class="[
          'px-2 py-1 rounded text-xs font-medium',
          product.stock > 10 ? 'bg-green-100 text-green-700' : 
          product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
          'bg-red-100 text-red-700'
        ]"
      >
        {{ product.stock > 0 ? `${product.stock} em estoque` : 'Sem estoque' }}
      </div>
    </div>

    <div class="mb-3">
      <div class="text-xs text-gray-500 mb-1">{{ product.brand }}</div>
      <h3 class="font-bold text-lg text-gray-800 mb-1">{{ product.name }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
    </div>

    <div class="flex items-center gap-1 mb-3">
      <div class="flex items-center">
        <i class="pi pi-star-fill text-yellow-400 text-xs"></i>
        <span class="text-sm font-medium text-gray-700 ml-1">{{ product.rating }}</span>
      </div>
      <span class="text-gray-400 text-xs">•</span>
      <span class="text-xs text-gray-500">{{ product.category }}</span>
    </div>

    <div class="flex items-center justify-between pt-3 border-t border-gray-200">
      <div>
        <div class="text-2xl font-bold text-gray-800">{{ formatCurrency(product.price) }}</div>
      </div>
      <button
        @click="$emit('add-to-cart', product)"
        :disabled="product.stock === 0"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-colors',
          product.stock > 0
            ? 'bg-green-500 text-white hover:bg-navy-800 active:bg-navy-900'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
      >
        <i class="pi pi-shopping-cart mr-2"></i>
        Adicionar
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

