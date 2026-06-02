<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})

function formatDate(iso) {
  return new Date(iso).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <section class="registered">
    <h3 class="registered__title">Зареєстровані учасники ({{ users.length }})</h3>

    <ul v-if="users.length" class="registered__list">
      <li
        v-for="user in users"
        :key="user.id"
        class="registered__item"
        :class="{ 'registered__item--pending': user.pending }"
      >
        <span class="registered__name">{{ user.name }}</span>
        <span class="registered__email">{{ user.email }}</span>
        <span class="registered__phone">{{ user.phone }}</span>
        <span v-if="user.pending" class="registered__badge">Очікує підтвердження...</span>
        <span v-else class="registered__date">{{ formatDate(user.registeredAt) }}</span>
      </li>
    </ul>
    <p v-else class="registered__empty">Поки немає зареєстрованих учасників</p>
  </section>
</template>

<style scoped>
.registered__title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.registered__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.registered__item {
  display: grid;
  gap: 0.125rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: #fff;
}

.registered__item--pending {
  border-color: #fcd34d;
  background: #fffbeb;
}

.registered__name {
  font-weight: 500;
  color: #0f172a;
}

.registered__email,
.registered__phone {
  font-size: 0.8125rem;
  color: #64748b;
}

.registered__badge {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #b45309;
}

.registered__date {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #94a3b8;
}

.registered__empty {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}
</style>
