import store from '@/store'
import Toast from '@/assets/toast'

/**
 * auth 处理
 * @param {*} to 路由
 * @param {*} whiteList 白名单
 */
export const authCodeHandle = async (to, whiteList) => {
  // 记录第一次进入页面，app返回第页时用到
  if (store.state.auth && !store.state.auth.isFirstRouter) {
    await store.dispatch('auth/getIsFirstRouter', to.path)
  }
  // source
  if (to.query.source) {
    await store.dispatch('auth/getSource', to.query.source)
  }

  // 是否开启authcode验证，开发环境默认不开启
  // 如果调用接口，需要开启authcode验证，获取token，在请求接口
  // 如果需要生成authcode，可以通过访问【https://onecode-integration-test.digitalhainan.com.cn/navwithauth】输入当前开发环境地址，点击跳转获取authcode
  try {
    // 白名单页面不需要处理authcode
    if (!whiteList.includes(to.path)) {
      // 如果是app，直接调用app的jsapi获取用户信息
      // 否则如果跳转接口带有authCode，请求接口获取用户信息
      if (to.query && to.query.source === 'hnymt') {
        await store.dispatch('auth/getAuthUserInfo')
      } else if (
        // 当前为非app的h5，并且存在authCode；并且当前地址栏的authCode不等于存储过的authCode时请求接口获取用户信息
        to.query.authCode &&
        (to.query.authCode !== store.state.auth.authCode)
      ) {
        await store.dispatch('auth/getAuthCodeInfo', {
          authCode: to.query.authCode
        })
      }
    }
  } catch (error) {
    // app环境下没有找到AlipayJSBridge
    if (to.query.source === 'hnymt' && !window.AlipayJSBridge) {
      Toast.error('AlipayJSBridge is not defined')
    } else if (!store.state.auth.authCode) {
      // 其他环境下没有成功处理authcode
      Toast.error('authcode is not defined')
    } else {
      // 其他未知错误
      Toast.error(JSON.stringify(error))
    }
  }
}
