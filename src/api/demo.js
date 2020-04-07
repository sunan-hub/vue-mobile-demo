// 常用接口调用demo

import axios from '@/utils/request'
import store from '@/store'
import qs from 'qs'

// 需要用到token接口调用
const getDetail = (tid) => {
  const token = store.state.user.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}

/**
 * 需要拼接参数
 * @param {Object} options 参数
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
export {
  getDetail,
  getList
}
