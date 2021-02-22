import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search-results/:searchTerm',
    name: 'Search Results',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchResults.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
