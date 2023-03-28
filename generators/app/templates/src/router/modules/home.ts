import { RouteRecordRaw } from 'vue-router'
import HomeView from '@views/HomeView.vue'

const homeRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]

export default homeRoute
