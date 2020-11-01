import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/event',
    name: 'EventDetails',
    component: () => import('../components/eventview/Event')
  },
  {
    path: '/events/new',
    name: 'NewEvent',
    component: () => import('../components/eventview/NewEvent')
  },
  {
    path: '/person/new',
    name: 'NewPerson',
    component: () => import('../components/eventview/NewPerson')
  },
  {
    path: '/person/add',
    name: 'AddExistingPerson',
    component: () => import('../components/eventview/AddExistingPerson')
  },
  {
    path: '/person/list',
    name: 'Personlist',
    component: () => import('../components/eventview/Personlist')
  },
  {
    path: '/event/edit',
    name: 'EditEvent',
    component: () => import('../components/eventview/EditEvent')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
