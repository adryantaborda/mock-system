<template>
  <div class="products-view bg-gray-50 min-h-screen p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Produtos Eletrônicos</h1>
      <p class="text-gray-500">Gerencie seu catálogo de produtos</p>
    </div>

    <!-- Filtros e Busca -->
    <div class="bg-white rounded-lg p-4 mb-6 border border-gray-200">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Busca -->
        <div class="flex-1">
          <div class="relative">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Buscar produtos..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            />
          </div>
        </div>

        <!-- Filtro por Categoria -->
        <div class="md:w-64">
          <select
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
          >
            <option value="all">Todas as Categorias</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Total de Produtos</div>
        <div class="text-2xl font-bold text-gray-800">{{ products.length }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Categorias</div>
        <div class="text-2xl font-bold text-gray-800">{{ categories.length - 1 }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Em Estoque</div>
        <div class="text-2xl font-bold text-green-600">{{ productsInStock }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-sm text-gray-500 mb-1">Sem Estoque</div>
        <div class="text-2xl font-bold text-red-600">{{ productsOutOfStock }}</div>
      </div>
    </div>

    <!-- Grid de Produtos -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Mensagem quando não há produtos -->
    <div
      v-else
      class="bg-white rounded-lg p-12 text-center border border-gray-200"
    >
      <i class="pi pi-box text-6xl text-gray-400 mb-4"></i>
      <p class="text-gray-600 text-lg">Nenhum produto encontrado</p>
      <p class="text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const productsStore = useProductsStore()
const searchQuery = ref('')
const selectedCategory = ref('all')

const products = computed(() => productsStore.products)
const filteredProducts = computed(() => productsStore.filteredProducts)
const categories = computed(() => productsStore.categories)

const productsInStock = computed(() => {
  return products.value.filter(p => p.stock > 0).length
})

const productsOutOfStock = computed(() => {
  return products.value.filter(p => p.stock === 0).length
})

const handleSearch = () => {
  productsStore.setSearchFilter(searchQuery.value)
}

const handleCategoryChange = () => {
  productsStore.setCategoryFilter(selectedCategory.value)
}

const handleAddToCart = (product) => {
  if (product.stock > 0) {
    productsStore.updateStock(product.id, 1)
    // Aqui você pode adicionar lógica para adicionar ao carrinho
    alert(`${product.name} adicionado ao carrinho!`)
  }
}

onMounted(() => {
  // Inicializar filtros
  productsStore.setCategoryFilter('all')
  productsStore.setSearchFilter('')
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

