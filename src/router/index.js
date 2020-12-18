import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import filmrouter from "@/router/routers/films"
import cinrouter from "@/router/routers/cinms"
import cenrouter from "@/router/routers/center"

const routes = [
  filmrouter,
  cinrouter,
  cenrouter,
  {path:'/',redirect: "/film"}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
