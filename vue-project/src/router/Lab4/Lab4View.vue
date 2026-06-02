<script setup>
import Lab4Nav from './components/Lab4Nav.vue'
</script>

<template>
  <div class="lab4">
    <h2 class="lab4__heading">Лабораторна 4 - реєстрація на події</h2>
    <Lab4Nav />
    <RouterView v-slot="{ Component }">
      <KeepAlive include="EventListView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<style scoped>
.lab4 {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.lab4__heading {
  margin: 0 0 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #64748b;
}
</style>
