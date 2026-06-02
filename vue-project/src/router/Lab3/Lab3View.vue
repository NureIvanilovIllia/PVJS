<script setup>
import Lab3Nav from './components/Lab3Nav.vue'
</script>

<template>
  <div class="lab3">
    <h2 class="lab3__heading">Лабораторна 3 — менеджер задач</h2>
    <Lab3Nav />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.lab3 {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.lab3__heading {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #64748b;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
