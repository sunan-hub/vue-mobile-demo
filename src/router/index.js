import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: process.env.VUE_APP_MODE,
  base: process.env.VUE_APP_ROUTE_BASE,
  routes
})

// 白名单页面（不需要登录权限的页面）
const WHITE_LIST = ['/not-found', '/no-login']

router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title
  window.scroll(0, 0)

  // 记录第一次进入页面，app返回第页时用到
  if (store.state.auth && !store.state.auth.isFirstRouter) {
    await store.dispatch('auth/getIsFirstRouter', to.path)
  }

  // 是否开启authcode验证，开发环境默认不开启
  // 如果调用接口，需要开启authcode验证，获取token，在请求接口
  // 如果需要生成authcode，可以通过访问【https://onecode-integration-test.digitalhainan.com.cn/navwithauth】输入当前开发环境地址，点击跳转获取authcode
  if (process.env.NODE_ENV !== 'development') {
    // userinfo
    if (to.query && to.query.authCode && !(store.state.auth && store.state.auth.token)) {
      await store.dispatch('auth/getAuthCodeInfo', {
        authCode: to.query.authCode
      })
    }

    // source
    if (to.query.source) {
      await store.dispatch('auth/getSource', to.query.source)
    }

    // token是否为空，重定位
    if (!WHITE_LIST.includes(to.path)) {
      if ((store.state.auth && !store.state.auth.token) && !to.query.authCode) {
        next('/no-login')
      }
    }
  }

  next()
})

export default router
