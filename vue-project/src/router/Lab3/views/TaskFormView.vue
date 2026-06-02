<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  useTaskStore,
  CATEGORIES,
  PRIORITIES,
  isDeadlineInPast,
} from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditMode = computed(() => route.name === 'lab3-task-edit')
const taskId = computed(() => route.params.id)

const title = ref('')
const description = ref('')
const category = ref('work')
const priority = ref('medium')
const deadline = ref('')

const errors = ref({})

function todayInputValue() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function loadTaskData() {
  if (!isEditMode.value) {
    deadline.value = todayInputValue()
    return
  }

  const task = taskStore.getTaskById(taskId.value)
  if (!task) {
    router.replace({ name: 'lab3-tasks' })
    return
  }

  title.value = task.title
  description.value = task.description
  category.value = task.category
  priority.value = task.priority
  deadline.value = task.deadline
}

function validate() {
  const nextErrors = {}

  if (!title.value.trim()) {
    nextErrors.title = 'Назва є обов\'язковою'
  }

  if (!deadline.value) {
    nextErrors.deadline = 'Вкажіть дедлайн'
  } else if (!isEditMode.value && isDeadlineInPast(deadline.value)) {
    nextErrors.deadline = 'Дедлайн не може бути у минулому'
  }

  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

function handleSubmit() {
  if (!validate()) return

  const payload = {
    title: title.value,
    description: description.value,
    category: category.value,
    priority: priority.value,
    deadline: deadline.value,
  }

  if (isEditMode.value) {
    taskStore.updateTask(taskId.value, payload)
    router.push({ name: 'lab3-task-detail', params: { id: taskId.value } })
  } else {
    const created = taskStore.addTask(payload)
    router.push({ name: 'lab3-task-detail', params: { id: created.id } })
  }
}

function handleCancel() {
  if (isEditMode.value) {
    router.push({ name: 'lab3-task-detail', params: { id: taskId.value } })
  } else {
    router.push({ name: 'lab3-tasks' })
  }
}

onMounted(loadTaskData)
</script>

<template>
  <section class="task-form">
    <h2 class="task-form__title">
      {{ isEditMode ? 'Редагування задачі' : 'Нова задача' }}
    </h2>

    <form class="task-form__form" @submit.prevent="handleSubmit">
      <label class="task-form__field">
        <span>Назва *</span>
        <input v-model="title" type="text" class="task-form__input" :class="{ 'task-form__input--error': errors.title }" />
        <span v-if="errors.title" class="task-form__error">{{ errors.title }}</span>
      </label>

      <label class="task-form__field">
        <span>Опис</span>
        <textarea v-model="description" rows="3" class="task-form__input task-form__textarea" />
      </label>

      <label class="task-form__field">
        <span>Категорія</span>
        <select v-model="category" class="task-form__input">
          <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>
      </label>

      <label class="task-form__field">
        <span>Пріоритет</span>
        <select v-model="priority" class="task-form__input">
          <option v-for="pri in PRIORITIES" :key="pri.value" :value="pri.value">
            {{ pri.label }}
          </option>
        </select>
      </label>

      <label class="task-form__field">
        <span>Дедлайн *</span>
        <input
          v-model="deadline"
          type="date"
          class="task-form__input"
          :class="{ 'task-form__input--error': errors.deadline }"
          :min="isEditMode ? undefined : todayInputValue()"
        />
        <span v-if="errors.deadline" class="task-form__error">{{ errors.deadline }}</span>
      </label>

      <div class="task-form__actions">
        <button type="submit" class="task-form__btn task-form__btn--primary">
          Зберегти
        </button>
        <button type="button" class="task-form__btn" @click="handleCancel">
          Скасувати
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.task-form__title {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.task-form__form {
  max-width: 28rem;
}

.task-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.task-form__field span:first-child {
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
}

.task-form__input {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
}

.task-form__input--error {
  border-color: #ef4444;
}

.task-form__textarea {
  resize: vertical;
  font-family: inherit;
}

.task-form__error {
  font-size: 0.8125rem;
  color: #b91c1c;
}

.task-form__actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.task-form__btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  background: #fff;
  cursor: pointer;
}

.task-form__btn--primary {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}
</style>
