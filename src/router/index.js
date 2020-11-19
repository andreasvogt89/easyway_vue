import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    name: 'Events',
    component: () => import('../views/Events')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
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
