import EventListView from './views/EventListView.vue'
import EventDetailView from './views/EventDetailView.vue'
import RegistrationView from './views/RegistrationView.vue'
import NotFoundView from './views/NotFoundView.vue'

export const lab4Routes = [
  {
    path: '',
    name: 'lab4-events',
    component: EventListView,
  },
  {
    path: 'events/:id/register',
    name: 'lab4-event-register',
    component: RegistrationView,
  },
  {
    path: 'events/:id',
    name: 'lab4-event-detail',
    component: EventDetailView,
  },
  {
    path: ':pathMatch(.*)*',
    name: 'lab4-not-found',
    component: NotFoundView,
  },
]
