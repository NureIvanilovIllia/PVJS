<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  useTaskStore,
  CATEGORIES,
  PRIORITIES,
  getCategoryLabel,
  getPriorityLabel,
  getPriorityOrder,
  isTaskOverdue,
  formatDeadline,
} from '../stores/taskStore'

const taskStore = useTaskStore()

const filterCategory = ref('')
const filterPriority = ref('')
const searchQuery = ref('')
const sortBy = ref('deadline')

const filteredTasks = computed(() => {
  let result = [...taskStore.tasks]

  if (filterCategory.value) {
    result = result.filter((task) => task.category === filterCategory.value)
  }

  if (filterPriority.value) {
    result = result.filter((task) => task.priority === filterPriority.value)
  }

  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    result = result.filter((task) => task.title.toLowerCase().includes(query))
  }

  if (sortBy.value === 'priority') {
    result.sort(
      (a, b) => getPriorityOrder(b.priority) - getPriorityOrder(a.priority),
    )
  } else {
    result.sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline),
    )
  }

  return result
})
</script>

<template>
  <section class="task-list">
    <div class="task-list__header">
      <h2 class="task-list__title">Список задач</h2>
      <RouterLink :to="{ name: 'lab3-task-new' }" class="task-list__create">
        + Нова задача
      </RouterLink>
    </div>

    <div class="task-list__filters">
      <input
        v-model="searchQuery"
        type="search"
        class="task-list__search"
        placeholder="Пошук за назвою..."
      />
      <select v-model="filterCategory" class="task-list__select">
        <option value="">Усі категорії</option>
        <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
          {{ cat.label }}
        </option>
      </select>
      <select v-model="filterPriority" class="task-list__select">
        <option value="">Усі пріоритети</option>
        <option v-for="pri in PRIORITIES" :key="pri.value" :value="pri.value">
          {{ pri.label }}
        </option>
      </select>
      <select v-model="sortBy" class="task-list__select">
        <option value="deadline">Сортування: дедлайн</option>
        <option value="priority">Сортування: пріоритет</option>
      </select>
    </div>

    <ul v-if="filteredTasks.length" class="task-list__items">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-list__item"
        :class="{
          'task-list__item--overdue': isTaskOverdue(task),
          'task-list__item--done': task.completed,
        }"
      >
        <RouterLink :to="{ name: 'lab3-task-detail', params: { id: task.id } }" class="task-list__link">
          <span class="task-list__name">{{ task.title }}</span>
          <span class="task-list__meta">
            {{ getCategoryLabel(task.category) }} ·
            {{ getPriorityLabel(task.priority) }} ·
            {{ formatDeadline(task.deadline) }}
          </span>
          <span v-if="task.completed" class="task-list__badge task-list__badge--done">Виконано</span>
          <span v-else-if="isTaskOverdue(task)" class="task-list__badge task-list__badge--overdue">
            Прострочено
          </span>
        </RouterLink>
      </li>
    </ul>
    <p v-else class="task-list__empty">Задач не знайдено</p>
  </section>
</template>

<style scoped>
.task-list__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.task-list__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.task-list__create {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  background: #2563eb;
  border-radius: 0.375rem;
}

.task-list__create:hover {
  background: #1d4ed8;
}

.task-list__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.task-list__search,
.task-list__select {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
}

.task-list__search {
  flex: 1;
  min-width: 10rem;
}

.task-list__items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.task-list__item {
  margin-bottom: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: #fff;
}

.task-list__item--overdue {
  border-color: #fca5a5;
  background: #fef2f2;
}

.task-list__item--done {
  opacity: 0.75;
}

.task-list__item--done .task-list__name {
  text-decoration: line-through;
  color: #94a3b8;
}

.task-list__link {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: inherit;
}

.task-list__link:hover {
  background: #f8fafc;
}

.task-list__name {
  display: block;
  font-weight: 500;
  color: #0f172a;
}

.task-list__meta {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: #64748b;
}

.task-list__badge {
  display: inline-block;
  margin-top: 0.375rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}

.task-list__badge--overdue {
  color: #b91c1c;
  background: #fee2e2;
}

.task-list__badge--done {
  color: #15803d;
  background: #dcfce7;
}

.task-list__empty {
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: #64748b;
}
</style>
