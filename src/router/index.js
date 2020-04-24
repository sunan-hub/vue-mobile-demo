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
  try {
    // userinfo
    if (
      to.query &&
      to.query.authCode &&
      !(store.state.auth && store.state.auth.token)
    ) {
      await store.dispatch('auth/getAuthCodeInfo', {
        authCode: to.query.authCode
      })
    }

    // source
    if (to.query.source) {
      await store.dispatch('auth/getSource', to.query.source)
    }
  } catch (error) {
    next()
  }

  next()
})

export default router
