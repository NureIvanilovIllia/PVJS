<script setup>
import { RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents.js'

defineOptions({
  name: 'EventListView',
})

const { events, formatEventDate } = useEvents()
</script>

<template>
  <section class="event-list">
    <h2 class="event-list__title">Список подій</h2>

    <ul class="event-list__items">
      <li v-for="event in events" :key="event.id" class="event-list__item">
        <RouterLink :to="{ name: 'lab4-event-detail', params: { id: event.id } }" class="event-list__link">
          <h3 class="event-list__name">{{ event.title }}</h3>
          <p class="event-list__meta">
            {{ formatEventDate(event.date) }} · {{ event.time }} · {{ event.location }}
          </p>
          <p class="event-list__spots">
            Зареєстровано: {{ event.registeredCount }} / {{ event.capacity }}
            <span v-if="event.spotsLeft === 0" class="event-list__full"> (місць немає)</span>
          </p>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.event-list__title {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.event-list__items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.event-list__item {
  margin-bottom: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #fff;
}

.event-list__link {
  display: block;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: inherit;
}

.event-list__link:hover {
  background: #f8fafc;
}

.event-list__name {
  margin: 0 0 0.375rem;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #0f172a;
}

.event-list__meta {
  margin: 0 0 0.375rem;
  font-size: 0.8125rem;
  color: #64748b;
}

.event-list__spots {
  margin: 0;
  font-size: 0.8125rem;
  color: #475569;
}

.event-list__full {
  color: #b91c1c;
  font-weight: 500;
}
</style>
