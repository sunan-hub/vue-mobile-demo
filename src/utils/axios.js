// 封装axios的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import errorHandle from './errorHandle'
import store from '@/store'
import publicConfig from '@/config'
import qs from 'qs'
const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
    // 自定义参数
    this.customData = {
      isCatchCallback: false // 报错提示是否使用公共报错
    }
  }

  // 获取axios配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      withCredentials: true, // 跨域
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return config
  }

  removePending (key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    }
    delete this.pending[key]
  }

  /**
   * @description 出错回调
   * @param {*} err
   * @returns
   * @memberof HttpRequest
   */
  errorCallback (err) {
    const _data = err.data || err.response.data
    const errRes = {
      message: (_data && _data.message) || err.message || '网络出小差了！',
      code: (_data && _data.code) || err.code
    }
    // debugger
    // 如果自定义错误回调，则跳过统一提示
    if (this.customData && !this.customData.isCatchCallback) {
      errorHandle(errRes)
    }
    // Do something with request error
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(errRes)
  }

  // 设定拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        let isPublic = false
        publicConfig.publicPath.map((path) => {
          isPublic = isPublic || path.test(config.url)
        })
        const token = store.state.auth.token
        if (!isPublic && token) {
          config.headers.Authorization = 'Bearer ' + token
        }
        config.headers.AppPlatform = 'H5'
        config.headers['Accept-Language'] = publicConfig.useI18n
        const key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c) => {
          this.pending[key] = c
        })
        // 统一加body
        if (config.data && Object.keys(config.data).length) {
          config.data = {
            body: qs.parse(qs.stringify(config.data))
          }
        }
        return config
      },
      (err) => {
        // debugger
        // errorHandle(err)
        // // Do something with request error
        // return Promise.reject(err)
        return this.errorCallback(err)
      }
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      (res) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const key = res.config.url + '&' + res.config.method
        this.removePending(key)
        if (res && res.data && res.data.success) {
          return Promise.resolve(res.data)
        } else {
          // errorHandle(res)
          // // eslint-disable-next-line prefer-promise-reject-errors
          // return Promise.reject({
          //   message: res.message || res.data.message,
          //   code: res.code
          // })
          return this.errorCallback(res)
        }
      },
      (err) => {
        // const errRes = JSON.parse(JSON.stringify(err))
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // debugger
        // errorHandle(errRes)
        // // eslint-disable-next-line prefer-promise-reject-errors
        // return Promise.reject({
        //   message: errRes.message,
        //   code: errRes.code
        // })
        return this.errorCallback(err)
      }
    )
  }

  /**
   * @description 创建实例
   * @param {*} options
   * @returns
   * @memberof HttpRequest
   */
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.customData = {
      isCatchCallback: false,
      ...newOptions.customData
    }
    this.interceptors(instance)
    return instance(newOptions)
  }

  /**
   * @description get
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {object} [customData={}] 自定义参数
   * @param {boolean} [customData={isCatchCallback = false}] 是否自定义错误提示？默认false统一提示报错
   * @returns
   * @memberof HttpRequest
   */
  get (url, params, customData = {}) {
    return this.request({
      method: 'get',
      url: url,
      params: qs.parse(qs.stringify(params)),
      customData: {
        ...customData
      }
    })
  }

  /**
   * @description post
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {object} headers 请求头
   * @param {object} [customData={}] 自定义参数
   * @param {boolean} [customData={isCatchCallback = false}] 是否自定义错误提示？默认false统一提示报错
   * @returns
   * @memberof HttpRequest
   */
  post (url, data, headers, customData = {}) {
    return this.request({
      method: 'post',
      url: url,
      data: data,
      headers: headers,
      customData: {
        ...customData
      }
    })
  }
}

export default HttpRequest
