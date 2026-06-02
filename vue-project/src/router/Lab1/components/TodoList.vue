<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <ul v-if="tasks.length" class="todo-list">
    <TodoItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
  <p v-else class="todo-list__empty">Задач немає</p>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list__empty {
  margin: 0;
  padding: 1rem;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
}
</style>
