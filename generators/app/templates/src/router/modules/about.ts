import { RouteRecordRaw } from 'vue-router'

const aboutRoute: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@views/AboutView.vue')
  }
]

export default aboutRoute
