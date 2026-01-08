<template>
  <div id="app" :class="isLoginPage ? '' : 'flex'">
    <Sidebar v-if="!isLoginPage" ref="sidebarRef" />
    <main 
      :class="[
        isLoginPage ? 'w-full' : 'flex-1 transition-all duration-300 min-h-screen',
      ]"
      :style="isLoginPage ? {} : { marginLeft: sidebarWidth }"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const sidebarRef = ref(null)

const isLoginPage = computed(() => route.path === '/login')

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

