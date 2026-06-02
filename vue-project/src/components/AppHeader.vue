<script setup>
const labLinks = [
  { name: 'lab1', label: 'Лабораторна 1' },
  { name: 'lab2', label: 'Лабораторна 2' },
  { name: 'lab3', label: 'Лабораторна 3' },
  { name: 'lab4', label: 'Лабораторна 4' },
]
</script>

<template>
  <header class="app-header">
    <h1 class="app-header__title">PVJS - лабораторні роботи</h1>
    <nav class="app-header__nav">
      <RouterLink
        v-for="link in labLinks"
        :key="link.name"
        :to="{ name: link.name }"
        class="app-header__link"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

.app-header__title {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
}

.app-header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.app-header__link {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  transition:
    background 0.15s,
    color 0.15s;
}

.app-header__link:hover {
  background: #e2e8f0;
}

.app-header__link.router-link-active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}
</style>
