import { createRouter, createWebHistory } from 'vue-router'
import Lab1View from './Lab1/Lab1View.vue'
import Lab2View from './Lab2/Lab2View.vue'
import Lab3View from './Lab3/Lab3View.vue'
import Lab4View from './Lab4/Lab4View.vue'
import { lab3Routes } from './Lab3/router.js'
import { lab4Routes } from './Lab4/router.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'lab1' },
    },
    {
      path: '/lab1',
      name: 'lab1',
      component: Lab1View,
    },
    {
      path: '/lab2',
      name: 'lab2',
      component: Lab2View,
    },
    {
      path: '/lab3',
      name: 'lab3',
      component: Lab3View,
      redirect: { name: 'lab3-tasks' },
      children: lab3Routes,
    },
    {
      path: '/lab4',
      name: 'lab4',
      component: Lab4View,
      redirect: { name: 'lab4-events' },
      children: lab4Routes,
    },
  ],
})

export default router
