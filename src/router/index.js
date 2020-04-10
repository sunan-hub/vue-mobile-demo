import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/vue-mobile-demo', // 子服务，需要nginx也需要配置指定路径；名称暂定为最后一个项目名单词
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
