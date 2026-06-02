<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useEvents } from '../composables/useEvents.js'
import { useRegistrationForm } from '../composables/useRegistration.js'
import StatusToast from '../components/StatusToast.vue'

const route = useRoute()
const router = useRouter()
const { getEventById } = useEvents()

const {
  form,
  errors,
  isSubmitting,
  submitError,
  submitSuccess,
  clearSubmitState,
  registerForEvent,
} = useRegistrationForm()

const event = computed(() => getEventById(route.params.id))

const toastMessage = ref('')
const toastType = ref('info')

watch(submitSuccess, (value) => {
  if (value) {
    toastMessage.value = 'Реєстрацію успішно підтверджено!'
    toastType.value = 'success'
    setTimeout(() => {
      router.push({ name: 'lab4-event-detail', params: { id: route.params.id } })
    }, 1500)
  }
})

watch(submitError, (value) => {
  if (value) {
    toastMessage.value = value
    toastType.value = 'error'
  }
})

function closeToast() {
  toastMessage.value = ''
  clearSubmitState()
}

async function handleSubmit() {
  if (!event.value) return
  toastMessage.value = ''
  await registerForEvent(event.value.id, event.value.capacity)
}
</script>

<template>
  <section v-if="event" class="registration">
    <h2 class="registration__title">Реєстрація на подію</h2>
    <p class="registration__event-name">{{ event.title }}</p>

    <form class="registration__form" @submit.prevent="handleSubmit">
      <label class="registration__field">
        <span>Ім'я *</span>
        <input
          v-model="form.name"
          type="text"
          class="registration__input"
          :class="{ 'registration__input--error': errors.name }"
          :disabled="isSubmitting"
        />
        <span v-if="errors.name" class="registration__error">{{ errors.name }}</span>
      </label>

      <label class="registration__field">
        <span>Email *</span>
        <input
          v-model="form.email"
          type="email"
          class="registration__input"
          :class="{ 'registration__input--error': errors.email }"
          :disabled="isSubmitting"
        />
        <span v-if="errors.email" class="registration__error">{{ errors.email }}</span>
      </label>

      <label class="registration__field">
        <span>Телефон *</span>
        <input
          v-model="form.phone"
          type="tel"
          class="registration__input"
          placeholder="+380..."
          :class="{ 'registration__input--error': errors.phone }"
          :disabled="isSubmitting"
        />
        <span v-if="errors.phone" class="registration__error">{{ errors.phone }}</span>
      </label>

      <p v-if="isSubmitting" class="registration__hint">
        Відправлення даних на сервер... (оптимістичне оновлення вже застосовано)
      </p>

      <div class="registration__actions">
        <button
          type="submit"
          class="registration__btn registration__btn--primary"
          :disabled="isSubmitting || event.spotsLeft === 0"
        >
          {{ isSubmitting ? 'Реєстрація...' : 'Зареєструватися' }}
        </button>
        <RouterLink
          :to="{ name: 'lab4-event-detail', params: { id: event.id } }"
          class="registration__btn"
        >
          Скасувати
        </RouterLink>
      </div>
    </form>

    <StatusToast :message="toastMessage" :type="toastType" @close="closeToast" />
  </section>

  <section v-else class="registration registration--missing">
    <h2>Подію не знайдено</h2>
    <RouterLink :to="{ name: 'lab4-events' }" class="registration__btn registration__btn--primary">
      До списку
    </RouterLink>
  </section>
</template>

<style scoped>
.registration__title {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.registration__event-name {
  margin: 0 0 1.25rem;
  color: #64748b;
}

.registration__form {
  max-width: 28rem;
}

.registration__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.registration__field span:first-child {
  font-size: 0.875rem;
  font-weight: 500;
}

.registration__input {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
}

.registration__input--error {
  border-color: #ef4444;
}

.registration__input:disabled {
  background: #f1f5f9;
}

.registration__error {
  font-size: 0.8125rem;
  color: #b91c1c;
}

.registration__hint {
  margin: 0 0 1rem;
  font-size: 0.8125rem;
  color: #b45309;
}

.registration__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.registration__btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  text-decoration: none;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  cursor: pointer;
}

.registration__btn--primary {
  color: #fff;
  background: #2563eb;
  border-color: #2563eb;
}

.registration__btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.registration--missing {
  text-align: center;
  padding: 2rem;
}
</style>
