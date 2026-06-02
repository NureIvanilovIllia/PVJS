<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push({ name: 'lab4-events' })
}
</script>

<template>
  <section class="not-found">
    <h2>Сторінку не знайдено</h2>
    <p>Запитаний маршрут не існує.</p>
    <button type="button" class="not-found__btn" @click="goHome">До списку подій</button>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}

.not-found h2 {
  margin: 0 0 0.5rem;
}

.not-found p {
  margin: 0 0 1rem;
  color: #64748b;
}

.not-found__btn {
  padding: 0.5rem 1rem;
  color: #fff;
  background: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
</style>
