// 调用app公用方法
/* eslint-disable no-undef */
import Toast from '@/assets/toast'

// 调用app公用方法
export const handleNativeApi = (callback) => {
  if (window.AlipayJSBridge) {
    callback && callback()
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', callback, false)
  }
}

export const exitApp = (param = {}, fn = null) => {
  handleNativeApi(function () {
    AlipayJSBridge.call('exitApp', param, function () {
      fn && fn()
      document.removeEventListener('AlipayJSBridgeReady', exitApp, false)
    })
  })
}
// 获取会员信息
export const getAuthUserInfo = (param = {}) => {
  return new Promise((resolve, reject) => {
    window.onload = (err) => {
      handleNativeApi(function () {
        if (!window.AlipayJSBridge) {
          Toast.error('AlipayJSBridge is not defined')
          reject(err)
        }
        if (process.env.VUE_APP_IS_SHOW_HEADER === 'true') {
          hideNavBar()
        }
        AlipayJSBridge.call('getAuthUserInfo', param, function (result) {
          console.log('app result: ', result)
          if (result && (result.id || result.body)) {
            resolve(result.body ? result.body : result)
          } else {
            Toast.error('获取app getAuthUserInfo失败')
            reject(result)
          }
          document.removeEventListener(
            'AlipayJSBridgeReady',
            getAuthUserInfo,
            false
          )
        })
      })
    }
  })
}

export const appLogin = (param = {}, fn = null) => {
  handleNativeApi(function () {
    AlipayJSBridge.call('login', param, function () {
      fn && fn()
      document.removeEventListener('AlipayJSBridgeReady', appLogin, false)
    })
  })
}

export const appBack = (param = {}, fn = null) => {
  handleNativeApi(function () {
    AlipayJSBridge.call('popWindow', param, function () {
      fn && fn()
      document.removeEventListener('AlipayJSBridgeReady', appBack, false)
    })
  })
}

export const showNaviBarbackToHome = (param = { index: 1 }, fn = null) => {
  handleNativeApi(function () {
    AlipayJSBridge.call('backToHome', param, function () {
      fn && fn()
      document.removeEventListener('AlipayJSBridgeReady', showNaviBarbackToHome, false)
    })
  })
}

/**
 * 隐藏App导航栏
 */
export const hideNavBar = (fn = null) => {
  handleNativeApi(function () {
    AlipayJSBridge.call('appNavBar', { show: false }, function () {
      fn && fn()
      document.removeEventListener('AlipayJSBridgeReady', hideNavBar, false)
    })
  })
}

/**
 * 显示App导航栏
 */
export const showNavBar = (fn = null) => {
  handleNativeApi(function () {
    AlipayJSBridge.call('appNavBar', { show: true }, function () {
      fn && fn()
      document.removeEventListener('AlipayJSBridgeReady', showNavBar, false)
    })
  })
}

/**
 * 发消息给小程序,此方法仅在支付宝小程序可用
 * @param {Object} param 发送的内容
 * @param {Funcion} fn 发送后回调
 */
export const callAlipay = (param = {}, fn = null) => {
  /* #ifdef MP-ALIPAY */
  /* eslint-disabled */
  my.postMessage(param)
  fn && fn()
  /* #endif */
}
