<script setup>
const navLinks = [
  { name: 'lab3-tasks', label: 'Список задач' },
  { name: 'lab3-task-new', label: 'Нова задача' },
  { name: 'lab3-stats', label: 'Статистика' },
]
</script>

<template>
  <nav class="lab3-nav">
    <RouterLink
      v-for="link in navLinks"
      :key="link.name"
      :to="{ name: link.name }"
      class="lab3-nav__link"
    >
      {{ link.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.lab3-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.lab3-nav__link {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  transition:
    background 0.15s,
    color 0.15s;
}

.lab3-nav__link:hover {
  background: #e2e8f0;
}

.lab3-nav__link.router-link-active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}
</style>
