// 授权相关
import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_SOURCE,
  SET_IS_WX,
  SET_IS_ALIPAY,
  SET_IS_APP,
  IS_FIRST_ROUTER,
  SET_AUTH_CODE
} from '@/store/mutation-types'
import { byAuthCode } from '@/api/auth'
import { getAuthUserInfo } from '@/utils/appMethod'
export default {
  namespaced: true,
  state: {
    isWxApp: false, // 模版来源微信？
    isAliApp: false, // 模版来源支付宝？
    isMpaasApp: false, // 模版来源app？
    token: window.localStorage.getItem('token') || null, // token
    source: window.localStorage.getItem('source') || null, // 来源【'hnymt-alipay', 'hnymt-wx', 'hnymt'】
    userInfo: window.localStorage.getItem('userInfo')
      ? JSON.parse(window.localStorage.getItem('userInfo')) : {}, // 用户信息
    isFirstRouter: null, // 是否为第一次进来
    authCode: window.localStorage.getItem('authCode') || null // authcode
  },
  mutations: {
    // 设置token
    [SET_TOKEN] (state, value) {
      state.token = value
      window.localStorage.setItem('token', value)
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
      window.localStorage.setItem('source', value)
    },
    // 设置用户的基本信息
    [SET_USER_INFO] (state, value) {
      if (value === '') return
      state.userInfo = value
      window.localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // authcode设置
    [SET_AUTH_CODE] (state, value) {
      state.authCode = value
      window.localStorage.setItem('authCode', value)
    }
  },
  actions: {
    // 用户信息处理
    async authUserInfoHandle ({ commit }, userInfo) {
      if (userInfo) {
        // token
        if (userInfo.extend && userInfo.extend.token) {
          commit('SET_TOKEN', userInfo.extend.token)
        }
        // userInfo
        if (userInfo) {
          commit('SET_USER_INFO', userInfo)
        }
      }
    },
    // app直接拿token
    async getAuthUserInfo ({ dispatch }) {
      const result = await getAuthUserInfo()
      console.log('app userinfo result: ', result)
      const _body = result.body
      if (_body) {
        dispatch('authUserInfoHandle', _body)
      }
    },
    /**
     * 除了app外，authcode走这条路线
     * 根据authcode获取用心信息
     * @param {*} to
     * res.body.userInfo
     * res.body.token
     */
    async getAuthCodeInfo ({ commit, dispatch }, payload = {}) {
      const result = await byAuthCode({
        ...payload
      })
      const _body = result.body
      if (_body) {
        // 一定要成功获取到token后存储
        if (payload.authCode) {
          commit('SET_AUTH_CODE', payload.authCode)
        }
        dispatch('authUserInfoHandle', _body)
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
      if (payload === 'hnymt') {
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
