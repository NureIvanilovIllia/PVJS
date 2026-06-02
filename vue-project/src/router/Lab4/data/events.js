export const EVENTS = [
  {
    id: '1',
    title: 'Vue.js Meetup Kharkiv',
    date: '2026-06-15',
    time: '18:00',
    location: 'ХНУРЕ, ауд. 401',
    description:
      'Зустріч розробників Vue.js: Composition API, Pinia та найкращі практики фронтенд-розробки.',
    capacity: 50,
  },
  {
    id: '2',
    title: 'Frontend Hackathon',
    date: '2026-07-02',
    time: '10:00',
    location: 'IT-кластер, Харків',
    description:
      '24-годинний хакатон для студентів. Команди до 4 осіб, призи за найкращий UI та інтеграцію з API.',
    capacity: 30,
  },
  {
    id: '3',
    title: 'Workshop: TypeScript для Vue',
    date: '2026-06-28',
    time: '14:00',
    location: 'Онлайн (Zoom)',
    description:
      'Практичний воркшоп з типізації компонентів Vue 3, composables та інтеграції з Vite.',
    capacity: 100,
  },
  {
    id: '4',
    title: 'Career Day IT',
    date: '2026-05-20',
    time: '11:00',
    location: 'ХНУРЕ, актова зала',
    description:
      'Презентації IT-компаній, стажування та кар\'єрні консультації для студентів.',
    capacity: 200,
  },
]

export function formatEventDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
