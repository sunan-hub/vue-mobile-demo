// 授权相关
import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_SOURCE,
  SET_IS_WX,
  SET_IS_ALIPAY,
  SET_IS_APP,
  IS_FIRST_ROUTER
} from '@/store/mutation-types'
import { byAuthCode } from '@/api/auth'
export default {
  namespaced: true,
  state: {
    isWxApp: false, // 模版来源微信？
    isAliApp: false, // 模版来源支付宝？
    isMpaasApp: false, // 模版来源app？
    token: window.localStorage.getItem('token') || '', // token
    source: window.localStorage.getItem('source') || '', // 来源【'hnymt-alipay', 'hnymt-wx', 'hnymt-app'】
    userInfo: window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}, // 用户信息
    isFirstRouter: null // 是否为第一次进来
  },
  mutations: {
    // 设置token
    [SET_TOKEN] (state, value) {
      state.token = value
      // 为了方便开发，开发环境存储，正式环境不存储
      if (process.env.NODE_ENV === 'development') {
        window.localStorage.setItem('token', value)
      }
    },
    // 微信
    [SET_IS_WX] (state, value) {
      state.isWxApp = value
    },
    // 支付宝
    [SET_IS_ALIPAY] (state, value) {
      state.isAliApp = value
    },
    // app
    [SET_IS_APP] (state, value) {
      state.isMpaasApp = value
    },
    // 是否为第一次进来
    [IS_FIRST_ROUTER] (state, value) {
      if (state.isFirstRouter === null) {
        state.isFirstRouter = value
      }
    },
    // 来源
    [SET_SOURCE] (state, value) {
      state.source = value
      // 为了方便开发，开发环境存储，正式环境不存储
      if (process.env.NODE_ENV === 'development') {
        window.localStorage.setItem('source', value)
      }
    },
    // 设置用户的基本信息
    [SET_USER_INFO] (state, value) {
      if (value === '') return
      state.userInfo = value
      // 为了方便开发，开发环境存储，正式环境不存储
      if (process.env.NODE_ENV === 'development') {
        window.localStorage.setItem('userInfo', JSON.stringify(value))
      }
    }
  },
  actions: {
    /**
     * 根据authcode获取用心信息
     * @param {*} to
     * res.body.userInfo
     * res.body.token
     */
    async getAuthCodeInfo ({ commit }, payload) {
      const result = await byAuthCode({
        ...payload
      })
      const _body = result.body
      if (_body) {
        // token
        if (_body.extend && _body.extend.token) {
          commit('SET_TOKEN', _body.extend.token)
        }
        // userInfo
        if (_body) {
          commit('SET_USER_INFO', _body)
        }
      }
    },
    // 来源
    async getSource ({ commit }, payload) {
      // source
      if (payload) {
        commit('SET_SOURCE', payload)
      }
      if (payload === 'hnymt-alipay') {
        commit('SET_IS_ALIPAY', true)
      }
      if (payload === 'hnymt-wx') {
        commit('SET_IS_WX', true)
      }
      if (payload === 'hnymt-app') {
        commit('SET_IS_APP', true)
      }
    },
    /**
     * 是否为第一进来，第一次进来需要，是记录当前路由
     * @param {*} param0
     * @param {*} payload
     */
    async getIsFirstRouter ({ commit }, payload) {
      commit('IS_FIRST_ROUTER', payload)
    }
  }
}
