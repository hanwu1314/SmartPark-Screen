import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BigScreen from '../views/BigScreen/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/big-screen'
    },
    {
      path: '/big-screen',
      name: 'bigScreen',
      component: BigScreen
    }
  ]
})

export default router
