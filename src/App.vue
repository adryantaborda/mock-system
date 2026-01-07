<template>
  <div id="app" class="flex">
    <Sidebar ref="sidebarRef" />
    <main 
      class="flex-1 transition-all duration-300 min-h-screen" 
      :style="{ marginLeft: sidebarWidth }"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from './components/Sidebar.vue'

const sidebarRef = ref(null)

const sidebarWidth = computed(() => {
  return sidebarRef.value?.isCollapsed ? '4rem' : '16rem'
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-height: 100vh;
}
</style>

