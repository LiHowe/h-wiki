import { createApp } from 'vue'
import App from './App.vue'

import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory,
  createMemoryHistory
} from 'vue-router'
const app = createApp(App)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./components/HelloWorld.vue')
  }
]

const history = createWebHashHistory()
debugger
const router = createRouter({
  history,
  routes
})

app.use(router)

app.mount('#app')
