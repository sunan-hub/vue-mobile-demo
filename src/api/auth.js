// 自然人模块
import axios from '@/utils/request'

/**
 * authCode获取自然人用户信息
 * @param {*} params 参数
 */
export const byAuthCode = (params = {}) => {
  return axios.post('/noauth/natural/person/info/byAuthCode', params)
}
/**
 * 获取authCode
 * @param {*} params 参数
 */
export const authCode = (params = {}, headers = {}) => {
  return axios.post('/noauth/natural/person/ucs/authCode', params, headers)
}
