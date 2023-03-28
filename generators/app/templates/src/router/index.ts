import { createRouter, createWebHistory } from 'vue-router'
import { homeRoute, aboutRoute } from './modules'

const routes = [...homeRoute, ...aboutRoute]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
