<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents.js'
import RegisteredUsersList from '../components/RegisteredUsersList.vue'

const route = useRoute()
const { getEventById, formatEventDate } = useEvents()

const event = computed(() => getEventById(route.params.id))
</script>

<template>
  <section v-if="event" class="event-detail">
    <h2 class="event-detail__title">{{ event.title }}</h2>

    <dl class="event-detail__info">
      <div class="event-detail__row">
        <dt>Дата</dt>
        <dd>{{ formatEventDate(event.date) }}</dd>
      </div>
      <div class="event-detail__row">
        <dt>Час</dt>
        <dd>{{ event.time }}</dd>
      </div>
      <div class="event-detail__row">
        <dt>Місце</dt>
        <dd>{{ event.location }}</dd>
      </div>
      <div class="event-detail__row">
        <dt>Місткість</dt>
        <dd>{{ event.registeredCount }} / {{ event.capacity }} учасників</dd>
      </div>
    </dl>

    <p class="event-detail__description">{{ event.description }}</p>

    <div class="event-detail__actions">
      <RouterLink
        v-if="event.spotsLeft > 0"
        :to="{ name: 'lab4-event-register', params: { id: event.id } }"
        class="event-detail__btn event-detail__btn--primary"
      >
        Зареєструватися
      </RouterLink>
      <span v-else class="event-detail__full">Реєстрація закрита — місць немає</span>
      <RouterLink :to="{ name: 'lab4-events' }" class="event-detail__back">← До списку</RouterLink>
    </div>

    <RegisteredUsersList :users="event.registrations" />
  </section>

  <section v-else class="event-detail event-detail--missing">
    <h2>Подію не знайдено</h2>
    <p>Події з id «{{ route.params.id }}» не існує.</p>
    <RouterLink :to="{ name: 'lab4-events' }" class="event-detail__btn event-detail__btn--primary">
      До списку подій
    </RouterLink>
  </section>
</template>

<style scoped>
.event-detail__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.event-detail__info {
  margin: 0 0 1rem;
}

.event-detail__row {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.event-detail__row dt {
  font-weight: 500;
  color: #64748b;
}

.event-detail__row dd {
  margin: 0;
}

.event-detail__description {
  margin: 0 0 1.5rem;
  line-height: 1.6;
  color: #334155;
}

.event-detail__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.event-detail__btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: 0.375rem;
}

.event-detail__btn--primary {
  color: #fff;
  background: #2563eb;
}

.event-detail__btn--primary:hover {
  background: #1d4ed8;
}

.event-detail__full {
  font-size: 0.875rem;
  color: #b91c1c;
}

.event-detail__back {
  margin-left: auto;
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
}

.event-detail--missing {
  text-align: center;
  padding: 2rem;
}

.event-detail--missing h2 {
  margin: 0 0 0.5rem;
}

.event-detail--missing p {
  margin: 0 0 1rem;
  color: #64748b;
}
</style>
