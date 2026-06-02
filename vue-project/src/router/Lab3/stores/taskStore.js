import { defineStore } from 'pinia'

const STORAGE_KEY = 'lab3-task-store'

export const CATEGORIES = [
  { value: 'work', label: 'Робота' },
  { value: 'personal', label: 'Особисте' },
  { value: 'study', label: 'Навчання' },
  { value: 'other', label: 'Інше' },
]

export const PRIORITIES = [
  { value: 'low', label: 'Низький' },
  { value: 'medium', label: 'Середній' },
  { value: 'high', label: 'Високий' },
]

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 }

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.tasks)) {
        return { tasks: parsed.tasks, nextId: parsed.nextId ?? 1 }
      }
    }
  } catch {
    /* ignore invalid storage */
  }
  return { tasks: [], nextId: 1 }
}

function saveState(state) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ tasks: state.tasks, nextId: state.nextId }),
  )
}

function parseDeadline(deadline) {
  const date = new Date(deadline)
  date.setHours(0, 0, 0, 0)
  return date
}

function startOfToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

function isOverdue(task) {
  if (task.completed) return false
  return parseDeadline(task.deadline) < startOfToday()
}

function daysUntilDeadline(deadline) {
  const diff = parseDeadline(deadline) - startOfToday()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const useTaskStore = defineStore('tasks', {
  state: () => {
    const saved = loadState()
    return {
      tasks: saved.tasks,
      nextId: saved.nextId,
    }
  },

  getters: {
    activeTasks: (state) => state.tasks.filter((task) => !task.completed),

    completedTasks: (state) => state.tasks.filter((task) => task.completed),

    overdueTasks: (state) => state.tasks.filter((task) => isOverdue(task)),

    overdueCount() {
      return this.overdueTasks.length
    },

    tasksByCategory: (state) => {
      const counts = {}
      for (const cat of CATEGORIES) {
        counts[cat.value] = 0
      }
      for (const task of state.tasks) {
        if (counts[task.category] !== undefined) {
          counts[task.category] += 1
        }
      }
      return counts
    },

    totalCount: (state) => state.tasks.length,

    completedCount() {
      return this.completedTasks.length
    },

    activeCount() {
      return this.activeTasks.length
    },

    completionPercent() {
      if (this.totalCount === 0) return 0
      return Math.round((this.completedCount / this.totalCount) * 100)
    },

    upcomingDeadlines() {
      return this.activeTasks
        .filter((task) => {
          const days = daysUntilDeadline(task.deadline)
          return days >= 0 && days <= 3
        })
        .sort(
          (a, b) => parseDeadline(a.deadline) - parseDeadline(b.deadline),
        )
    },

    getTaskById: (state) => (id) =>
      state.tasks.find((task) => String(task.id) === String(id)),
  },

  actions: {
    persist() {
      saveState({ tasks: this.tasks, nextId: this.nextId })
    },

    addTask(payload) {
      const task = {
        id: this.nextId++,
        title: payload.title.trim(),
        description: payload.description?.trim() ?? '',
        category: payload.category,
        priority: payload.priority,
        deadline: payload.deadline,
        completed: false,
      }
      this.tasks.push(task)
      this.persist()
      return task
    },

    updateTask(id, payload) {
      const task = this.getTaskById(id)
      if (!task) return null
      task.title = payload.title.trim()
      task.description = payload.description?.trim() ?? ''
      task.category = payload.category
      task.priority = payload.priority
      task.deadline = payload.deadline
      if (payload.completed !== undefined) {
        task.completed = payload.completed
      }
      this.persist()
      return task
    },

    deleteTask(id) {
      const index = this.tasks.findIndex((task) => String(task.id) === String(id))
      if (index === -1) return false
      this.tasks.splice(index, 1)
      this.persist()
      return true
    },

    toggleCompleted(id) {
      const task = this.getTaskById(id)
      if (!task) return
      task.completed = !task.completed
      this.persist()
    },
  },
})

export function getCategoryLabel(value) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function getPriorityLabel(value) {
  return PRIORITIES.find((p) => p.value === value)?.label ?? value
}

export function getPriorityOrder(value) {
  return PRIORITY_ORDER[value] ?? 0
}

export function isTaskOverdue(task) {
  return isOverdue(task)
}

export function formatDeadline(deadline) {
  return new Date(deadline).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function isDeadlineInPast(deadline) {
  return parseDeadline(deadline) < startOfToday()
}
