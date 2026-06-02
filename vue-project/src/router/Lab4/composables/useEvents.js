import { computed } from 'vue'
import { EVENTS, formatEventDate } from '../data/events.js'
import { useRegistrations } from './useRegistration.js'

export function useEvents() {
  const { getRegistrationsForEvent } = useRegistrations()

  const events = computed(() =>
    EVENTS.map((event) => ({
      ...event,
      registeredCount: getRegistrationsForEvent(event.id).length,
      spotsLeft: event.capacity - getRegistrationsForEvent(event.id).length,
    })),
  )

  function getEventById(id) {
    const event = EVENTS.find((item) => String(item.id) === String(id))
    if (!event) return null
    const registered = getRegistrationsForEvent(event.id)
    return {
      ...event,
      registeredCount: registered.length,
      spotsLeft: event.capacity - registered.length,
      registrations: registered,
    }
  }

  return {
    events,
    getEventById,
    formatEventDate,
  }
}
