<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: #0f172a;
  background: #fff;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app-main {
  min-height: calc(100vh - 5rem);
}
</style>
