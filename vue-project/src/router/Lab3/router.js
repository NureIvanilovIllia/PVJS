import TaskListView from './views/TaskListView.vue'
import TaskDetailView from './views/TaskDetailView.vue'
import TaskFormView from './views/TaskFormView.vue'
import StatsView from './views/StatsView.vue'
import NotFoundView from './views/NotFoundView.vue'

export const lab3Routes = [
  {
    path: '',
    name: 'lab3-tasks',
    component: TaskListView,
  },
  {
    path: 'tasks/new',
    name: 'lab3-task-new',
    component: TaskFormView,
  },
  {
    path: 'tasks/:id/edit',
    name: 'lab3-task-edit',
    component: TaskFormView,
  },
  {
    path: 'tasks/:id',
    name: 'lab3-task-detail',
    component: TaskDetailView,
  },
  {
    path: 'stats',
    name: 'lab3-stats',
    component: StatsView,
  },
  {
    path: ':pathMatch(.*)*',
    name: 'lab3-not-found',
    component: NotFoundView,
  },
]
