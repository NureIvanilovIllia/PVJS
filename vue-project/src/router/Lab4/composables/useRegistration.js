import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

const STORAGE_KEY = 'lab4-registrations'
const SIMULATED_DELAY_MS = 1200
const FAILURE_RATE = 0.25

const { data: registrationsMap } = useLocalStorage(STORAGE_KEY, {})

const form = ref({
  name: '',
  email: '',
  phone: '',
})

const errors = ref({})
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

function getRegistrationsForEvent(eventId) {
  const list = registrationsMap.value[String(eventId)]
  return Array.isArray(list) ? list : []
}

function setRegistrationsForEvent(eventId, list) {
  registrationsMap.value = {
    ...registrationsMap.value,
    [String(eventId)]: list,
  }
}

function validateForm() {
  const nextErrors = {}

  const name = form.value.name.trim()
  if (!name) {
    nextErrors.name = "Ім'я є обов'язковим"
  } else if (name.length < 2) {
    nextErrors.name = "Ім'я має містити щонайменше 2 символи"
  }

  const email = form.value.email.trim()
  if (!email) {
    nextErrors.email = 'Email є обов\'язковим'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'Некоректний формат email'
  }

  const phone = form.value.phone.trim()
  if (!phone) {
    nextErrors.phone = 'Телефон є обов\'язковим'
  } else if (!/^\+?[\d\s()-]{10,}$/.test(phone)) {
    nextErrors.phone = 'Некоректний формат телефону'
  }

  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

function resetForm() {
  form.value = { name: '', email: '', phone: '' }
  errors.value = {}
}

function clearSubmitState() {
  submitError.value = null
  submitSuccess.value = false
}

function simulateServerRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Сервер тимчасово недоступний. Спробуйте пізніше.'))
      } else {
        resolve({ ok: true })
      }
    }, SIMULATED_DELAY_MS)
  })
}

async function registerForEvent(eventId, eventCapacity) {
  submitError.value = null
  submitSuccess.value = false

  if (!validateForm()) {
    return { success: false }
  }

  const current = getRegistrationsForEvent(eventId)

  if (current.length >= eventCapacity) {
    submitError.value = 'На подію немає вільних місць'
    return { success: false }
  }

  const email = form.value.email.trim().toLowerCase()
  if (current.some((r) => r.email.toLowerCase() === email)) {
    submitError.value = 'Цей email вже зареєстрований на подію'
    return { success: false }
  }

  const optimisticEntry = {
    id: `temp-${Date.now()}`,
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    phone: form.value.phone.trim(),
    registeredAt: new Date().toISOString(),
    pending: true,
  }

  const snapshot = [...current]
  setRegistrationsForEvent(eventId, [...current, optimisticEntry])
  isSubmitting.value = true

  try {
    await simulateServerRequest()

    const confirmedEntry = {
      ...optimisticEntry,
      id: `reg-${Date.now()}`,
      pending: false,
    }

    const withoutTemp = getRegistrationsForEvent(eventId).filter(
      (r) => r.id !== optimisticEntry.id,
    )
    setRegistrationsForEvent(eventId, [...withoutTemp, confirmedEntry])
    resetForm()
    submitSuccess.value = true
    return { success: true }
  } catch (err) {
    setRegistrationsForEvent(eventId, snapshot)
    submitError.value =
      err instanceof Error ? err.message : 'Помилка реєстрації'
    return { success: false }
  } finally {
    isSubmitting.value = false
  }
}

export function useRegistrations() {
  return {
    registrationsMap,
    getRegistrationsForEvent,
  }
}

export function useRegistrationForm() {
  return {
    form,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    validateForm,
    resetForm,
    clearSubmitState,
    registerForEvent,
  }
}
