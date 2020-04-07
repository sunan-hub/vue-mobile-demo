import axios from '@/utils/request'

/**
 * 获取验证码接口
 * @param {*} serialNo 唯一标识
 */
const getAdministrativeAHQ = (serialNo) => {
  return axios.get('/administrative/area/horizontal/query', {
    params: {
      serialNo: serialNo
    }
  })
}

export {
  getAdministrativeAHQ
}
