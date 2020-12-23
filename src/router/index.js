import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import filmrouter from "./routers/fims"
import cinrouter from "./routers/cinms"
import cenrouter from "./routers/center"
import cityfilm from "./routers/city"

const routes = [
  ...filmrouter,
  cinrouter,
  ...cenrouter,
  cityfilm,
  {path:'/',redirect: "/films"}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
