import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_ROUTE_BASE,
  routes
})

router.beforeEach(async (to, from, next) => {
  window.scroll(0, 0)
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  next()
})

export default router
