import { Toast } from 'vant'
import success from './images/success.png'
import error from './images/error.png'
import loading from './images/loading.png'
import network from './images/network.png'
import warn from './images/warn.png'

Toast.setDefaultOptions({ duration: 2000 })

export default {
  /**
   * 成功
   * @param {*} msg 提示信息
   */
  success (msg = '成功') {
    return Toast({
      forbidClick: true,
      message: msg,
      icon: success
    })
  },
  /**
   * 错误
   * @param {*} msg 提示信息
   */
  error (msg = '错误') {
    return Toast({
      forbidClick: true,
      message: msg,
      icon: error
    })
  },
  /**
   * 提示
   * @param {*} msg 提示信息
   */
  text (msg = '提醒') {
    return Toast({
      forbidClick: true,
      message: msg
    })
  },
  /**
   * 加载中
   * @param {*} msg 提示信息
   */
  loading (msg = '加载中') {
    return Toast({
      forbidClick: true,
      duration: 0,
      message: msg,
      icon: loading
    })
  },
  /**
   * 网络不给力
   * @param {*} msg 提示信息
   */
  network (msg = '网络不给力') {
    return Toast({
      forbidClick: true,
      message: msg,
      icon: network
    })
  },
  /**
   * 警告
   * @param {*} msg 提示信息
   */
  warn (msg = '警告') {
    return Toast({
      forbidClick: true,
      message: msg,
      icon: warn
    })
  },
  /**
   * 关闭提示
   */
  clear () {
    Toast.clear()
  }
}
