import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ParcheggioView from '../views/ParcheggioView.vue'
import DettagliParkView from '../views/DettagliParkView.vue'
import RicercaView from '../views/RicercaView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/parcheggio',
      name: 'parcheggio',
      component: ParcheggioView
    },
    {
      path: '/parcheggio/:parcheggioId',
      name: 'dettaglipark',
      component: DettagliParkView,
      props: true
    },
    {
      path: '/parcheggio/ricerca',
      name: 'ricerca',
      component: RicercaView,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
