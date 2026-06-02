<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import {
  useTaskStore,
  getCategoryLabel,
  getPriorityLabel,
  isTaskOverdue,
  formatDeadline,
} from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const task = computed(() => taskStore.getTaskById(route.params.id))

function handleDelete() {
  if (!task.value) return
  if (confirm('Видалити цю задачу?')) {
    taskStore.deleteTask(task.value.id)
    router.push({ name: 'lab3-tasks' })
  }
}

function toggleCompleted() {
  if (task.value) {
    taskStore.toggleCompleted(task.value.id)
  }
}
</script>

<template>
  <section v-if="task" class="task-detail">
    <h2 class="task-detail__title">{{ task.title }}</h2>

    <dl class="task-detail__fields">
      <div class="task-detail__row">
        <dt>Опис</dt>
        <dd>{{ task.description || '—' }}</dd>
      </div>
      <div class="task-detail__row">
        <dt>Категорія</dt>
        <dd>{{ getCategoryLabel(task.category) }}</dd>
      </div>
      <div class="task-detail__row">
        <dt>Пріоритет</dt>
        <dd>{{ getPriorityLabel(task.priority) }}</dd>
      </div>
      <div class="task-detail__row">
        <dt>Дедлайн</dt>
        <dd :class="{ 'task-detail__overdue': isTaskOverdue(task) }">
          {{ formatDeadline(task.deadline) }}
          <span v-if="isTaskOverdue(task)" class="task-detail__badge">Прострочено</span>
        </dd>
      </div>
      <div class="task-detail__row">
        <dt>Статус</dt>
        <dd>{{ task.completed ? 'Виконано' : 'Активна' }}</dd>
      </div>
    </dl>

    <div class="task-detail__actions">
      <button type="button" class="task-detail__btn" @click="toggleCompleted">
        {{ task.completed ? 'Позначити активною' : 'Позначити виконаною' }}
      </button>
      <RouterLink
        :to="{ name: 'lab3-task-edit', params: { id: task.id } }"
        class="task-detail__btn task-detail__btn--primary"
      >
        Редагувати
      </RouterLink>
      <button type="button" class="task-detail__btn task-detail__btn--danger" @click="handleDelete">
        Видалити
      </button>
      <RouterLink :to="{ name: 'lab3-tasks' }" class="task-detail__back">← До списку</RouterLink>
    </div>
  </section>

  <section v-else class="task-detail task-detail--missing">
    <h2>Задачу не знайдено</h2>
    <p>Задачі з id «{{ route.params.id }}» не існує.</p>
    <RouterLink :to="{ name: 'lab3-tasks' }" class="task-detail__btn task-detail__btn--primary">
      До списку задач
    </RouterLink>
  </section>
</template>

<style scoped>
.task-detail__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.task-detail__fields {
  margin: 0 0 1.5rem;
}

.task-detail__row {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 0.5rem 1rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.task-detail__row dt {
  font-weight: 500;
  color: #64748b;
}

.task-detail__row dd {
  margin: 0;
  color: #0f172a;
}

.task-detail__overdue {
  color: #b91c1c;
}

.task-detail__badge {
  margin-left: 0.5rem;
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
  background: #fee2e2;
  border-radius: 0.25rem;
}

.task-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.task-detail__btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  cursor: pointer;
}

.task-detail__btn--primary {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

.task-detail__btn--danger {
  color: #b91c1c;
  border-color: #fecaca;
}

.task-detail__btn--danger:hover {
  background: #fef2f2;
}

.task-detail__back {
  margin-left: auto;
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
}

.task-detail--missing {
  text-align: center;
  padding: 2rem;
}

.task-detail--missing h2 {
  margin: 0 0 0.5rem;
}

.task-detail--missing p {
  margin: 0 0 1rem;
  color: #64748b;
}
</style>
