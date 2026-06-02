<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="todo-item" :class="{ 'todo-item--done': task.completed }">
    <label class="todo-item__label">
      <input
        type="checkbox"
        class="todo-item__checkbox"
        :checked="task.completed"
        @change="emit('toggle', task.id)"
      />
      <span class="todo-item__text">{{ task.text }}</span>
    </label>
    <button type="button" class="todo-item__remove" @click="emit('remove', task.id)">
      Видалити
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: #fff;
}

.todo-item--done .todo-item__text {
  text-decoration: line-through;
  color: #94a3b8;
}

.todo-item__label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  cursor: pointer;
}

.todo-item__text {
  word-break: break-word;
}

.todo-item__remove {
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  font-size: 0.8125rem;
  color: #b91c1c;
  background: transparent;
  border: 1px solid #fecaca;
  border-radius: 0.25rem;
  cursor: pointer;
}

.todo-item__remove:hover {
  background: #fef2f2;
}
</style>
