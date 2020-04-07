
// 用户状态
import {
  SET_ISLOGIN,
  SET_USER,
  SET_TOKEN
} from '@/store/mutation-types'
import { login } from '@/api/login'

export default {
  state: {
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    [SET_TOKEN] (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    [SET_USER] (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    [SET_ISLOGIN] (state, value) {
      state.isLogin = value
    }
  },
  getters: {
    user: (state) => state.userInfo,
    isLogin: (state) => state.isLogin,
    token: (state) => state.token
  },
  actions: {
    // 登录
    async login ({ commit, state }, payload) {
      const result = await login({
        ...payload
      })
      if (result.code === 200 && result.token) {
        const userInfo = result.data
        userInfo.username = payload.username
        commit('SET_TOKEN', result.token)
        commit('SET_USER', userInfo)
        commit('SET_ISLOGIN', true)
      }
      return result
    }
  }
}
