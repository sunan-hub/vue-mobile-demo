import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { authCodeHandle } from '@/utils/auth'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: process.env.VUE_APP_MODE,
  base: process.env.VUE_APP_ROUTE_BASE,
  routes
})

// 不需要处理authcode路由白名单
const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title
  window.scroll(0, 0)
  if (!store.state.auth.isFirstRouter || !store.state.auth.token) {
    await authCodeHandle(to, whiteList)
  }

  next()
})

export default router
