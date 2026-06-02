<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import {
  useTaskStore,
  CATEGORIES,
  getCategoryLabel,
  formatDeadline,
} from '../stores/taskStore'

const taskStore = useTaskStore()

const {
  totalCount,
  activeCount,
  completedCount,
  overdueCount,
  completionPercent,
  upcomingDeadlines,
  tasksByCategory,
} = storeToRefs(taskStore)
</script>

<template>
  <section class="stats">
    <h2 class="stats__title">Статистика</h2>

    <div class="stats__summary">
      <div class="stats__card">
        <span class="stats__value">{{ totalCount }}</span>
        <span class="stats__label">Усього задач</span>
      </div>
      <div class="stats__card">
        <span class="stats__value">{{ activeCount }}</span>
        <span class="stats__label">Активних</span>
      </div>
      <div class="stats__card">
        <span class="stats__value">{{ completedCount }}</span>
        <span class="stats__label">Виконаних</span>
      </div>
      <div class="stats__card stats__card--danger">
        <span class="stats__value">{{ overdueCount }}</span>
        <span class="stats__label">Прострочених</span>
      </div>
    </div>

    <div class="stats__progress-block">
      <div class="stats__progress-header">
        <span>Прогрес виконання</span>
        <span>{{ completionPercent }}%</span>
      </div>
      <div class="stats__progress-bar">
        <div class="stats__progress-fill" :style="{ width: `${completionPercent}%` }" />
      </div>
    </div>

    <div class="stats__section">
      <h3>Задачі за категоріями</h3>
      <ul class="stats__category-list">
        <li v-for="cat in CATEGORIES" :key="cat.value">
          {{ cat.label }}: {{ tasksByCategory[cat.value] }}
        </li>
      </ul>
    </div>

    <div class="stats__section">
      <h3>Найближчі дедлайни (3 дні)</h3>
      <ul v-if="upcomingDeadlines.length" class="stats__deadline-list">
        <li v-for="task in upcomingDeadlines" :key="task.id">
          <RouterLink :to="{ name: 'lab3-task-detail', params: { id: task.id } }">
            {{ task.title }}
          </RouterLink>
          <span class="stats__deadline-meta">
            {{ getCategoryLabel(task.category) }} · {{ formatDeadline(task.deadline) }}
          </span>
        </li>
      </ul>
      <p v-else class="stats__empty">Немає задач із дедлайном протягом 3 днів</p>
    </div>
  </section>
</template>

<style scoped>
.stats__title {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.stats__summary {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.stats__card {
  padding: 1rem;
  text-align: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.stats__card--danger {
  background: #fef2f2;
  border-color: #fecaca;
}

.stats__card--danger .stats__value {
  color: #b91c1c;
}

.stats__value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
}

.stats__label {
  font-size: 0.8125rem;
  color: #64748b;
}

.stats__progress-block {
  margin-bottom: 1.5rem;
}

.stats__progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.stats__progress-bar {
  height: 0.75rem;
  background: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
}

.stats__progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.stats__section {
  margin-bottom: 1.5rem;
}

.stats__section h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.stats__category-list,
.stats__deadline-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.stats__category-list li,
.stats__deadline-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.stats__deadline-list a {
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
}

.stats__deadline-meta {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: #64748b;
}

.stats__empty {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}
</style>
