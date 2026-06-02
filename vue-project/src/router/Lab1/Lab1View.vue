<script setup>
import { computed, ref } from 'vue'
import TodoList from './components/TodoList.vue'

const tasks = ref([])
const inputValue = ref('')
const filterMode = ref('all')

let nextId = 1

const filteredTasks = computed(() => {
  if (filterMode.value === 'active') {
    return tasks.value.filter((task) => !task.completed)
  }
  if (filterMode.value === 'completed') {
    return tasks.value.filter((task) => task.completed)
  }
  return tasks.value
})

function addTask() {
  const text = inputValue.value.trim()
  if (!text) {
    return
  }

  tasks.value.push({
    id: nextId++,
    text,
    completed: false,
  })
  inputValue.value = ''
}

function toggleTask(id) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) {
    task.completed = !task.completed
  }
}

function removeTask(id) {
  tasks.value = tasks.value.filter((item) => item.id !== id)
}

function setFilter(mode) {
  filterMode.value = mode
}
</script>

<template>
  <section class="lab1">
    <h2 class="lab1__title">Список задач</h2>

    <form class="lab1__form" @submit.prevent="addTask">
      <input
        v-model="inputValue"
        type="text"
        class="lab1__input"
        placeholder="Нова задача..."
        autocomplete="off"
      />
      <button type="submit" class="lab1__submit">Додати</button>
    </form>

    <div class="lab1__filters">
      <button
        type="button"
        class="lab1__filter"
        :class="{ 'lab1__filter--active': filterMode === 'all' }"
        @click="setFilter('all')"
      >
        Усі
      </button>
      <button
        type="button"
        class="lab1__filter"
        :class="{ 'lab1__filter--active': filterMode === 'active' }"
        @click="setFilter('active')"
      >
        Активні
      </button>
      <button
        type="button"
        class="lab1__filter"
        :class="{ 'lab1__filter--active': filterMode === 'completed' }"
        @click="setFilter('completed')"
      >
        Виконані
      </button>
    </div>

    <TodoList :tasks="filteredTasks" @toggle="toggleTask" @remove="removeTask" />
  </section>
</template>

<style scoped>
.lab1 {
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.lab1__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
}

.lab1__form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.lab1__input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
}

.lab1__input:focus {
  outline: 2px solid #2563eb;
  outline-offset: 0;
}

.lab1__submit {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.lab1__submit:hover {
  background: #1d4ed8;
}

.lab1__filters {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.lab1__filter {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  cursor: pointer;
}

.lab1__filter--active {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}
</style>
