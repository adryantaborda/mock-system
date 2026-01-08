<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-lg max-w-md w-full mx-4">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            {{ movementType === 'entrada' ? 'Entrada de Estoque' : 'Saída de Estoque' }}
          </h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <div class="mb-4 p-4 bg-gray-50 rounded-lg">
          <div class="font-medium text-gray-800 mb-1">{{ product.name }}</div>
          <div class="text-sm text-gray-600">SKU: {{ product.sku }}</div>
          <div class="text-sm text-gray-600 mt-1">
            Estoque atual: <span class="font-medium">{{ product.currentStock }} unidades</span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Quantidade {{ movementType === 'entrada' ? '(entrada)' : '(saída)' }}
            </label>
            <input
              v-model.number="quantity"
              type="number"
              min="1"
              :max="movementType === 'saida' ? product.currentStock : undefined"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              placeholder="Digite a quantidade"
            />
            <p v-if="movementType === 'saida' && quantity > product.currentStock" class="text-xs text-red-600 mt-1">
              Quantidade não pode ser maior que o estoque atual
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
            <select
              v-model="reason"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
            >
              <option value="Compra">Compra</option>
              <option value="Venda">Venda</option>
              <option value="Ajuste">Ajuste de Inventário</option>
              <option value="Devolução">Devolução</option>
              <option value="Perda">Perda/Dano</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div v-if="movementType === 'entrada'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
            <textarea
              v-model="notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700"
              placeholder="Adicione observações sobre esta movimentação..."
            ></textarea>
          </div>

          <div v-if="movementType === 'entrada'" class="p-3 bg-green-50 rounded-lg">
            <div class="text-sm text-gray-600 mb-1">Novo estoque após entrada:</div>
            <div class="text-lg font-bold text-navy-800">
              {{ product.currentStock + (quantity || 0) }} unidades
            </div>
          </div>

          <div v-else class="p-3 bg-red-50 rounded-lg">
            <div class="text-sm text-gray-600 mb-1">Novo estoque após saída:</div>
            <div class="text-lg font-bold text-red-600">
              {{ Math.max(0, product.currentStock - (quantity || 0)) }} unidades
            </div>
            <div v-if="(product.currentStock - (quantity || 0)) < product.minStock" class="text-xs text-red-600 mt-1">
              ⚠️ Estoque ficará abaixo do mínimo recomendado
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
        <button
          @click="confirmMovement"
          :disabled="!quantity || quantity <= 0 || (movementType === 'saida' && quantity > product.currentStock)"
          :class="[
            'flex-1 px-4 py-2 rounded-lg font-medium transition-colors',
            movementType === 'entrada'
              ? 'bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300'
              : 'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300'
          ]"
        >
          <i :class="(movementType === 'entrada' ? 'pi pi-plus' : 'pi pi-minus') + ' mr-2'"></i>
          Confirmar {{ movementType === 'entrada' ? 'Entrada' : 'Saída' }}
        </button>
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  movementType: {
    type: String,
    required: true,
    validator: (value) => ['entrada', 'saida'].includes(value)
  }
})

const emit = defineEmits(['close', 'confirm'])

const quantity = ref(1)
const reason = ref('Compra')
const notes = ref('')

const confirmMovement = () => {
  if (!quantity.value || quantity.value <= 0) return
  if (props.movementType === 'saida' && quantity.value > props.product.currentStock) return

  emit('confirm', {
    productId: props.product.id,
    productName: props.product.name,
    type: props.movementType,
    quantity: quantity.value,
    reason: reason.value,
    notes: notes.value
  })
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

