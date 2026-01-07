<template>
  <div class="home bg-white min-h-screen">
    <div class="container mx-auto max-w-7xl">
      <AppointmentsPanel />
    </div>
  </div>
</template>

<script setup>
import AppointmentsPanel from '../components/AppointmentsPanel.vue'
</script>

<style scoped>
.home {
  padding: 2rem 1rem;
}
</style>

