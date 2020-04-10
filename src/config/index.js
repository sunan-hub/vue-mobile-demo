// 公共配置
const envType = process.env.VUE_APP_ENV_TYPE

// http/https环境枚举
const HTTP_ENV_ENUM = {
  dev: 'https://performance.digitalhainan.com.cn/onecode', // 开发环境
  preview: 'https://onecode.digitalhainan.com.cn/onecode', // 预发布环境
  prod: 'https://onecode.digitalhainan.com.cn/onecode', // 正式环境
  test: 'https://onecode.digitalhainan.com.cn/onecode' // 测试环境
}

// websocket环境枚举
const WS_ENV_ENUM = {
  dev: {
    url: 'https://performance.digitalhainan.com.cn/onecode',
    port: '3001'
  }, // 开发环境
  preview: {
    url: 'https://performance.digitalhainan.com.cn/onecode',
    port: '3001'
  }, // pre环境
  prod: {
    url: 'https://performance.digitalhainan.com.cn/onecode',
    port: '3001'
  }, // 正式环境
  test: {
    url: 'https://performance.digitalhainan.com.cn/onecode',
    port: '3001'
  } // 测试环境
}

export default {
  baseUrl: HTTP_ENV_ENUM[envType], // 请求地址
  publicPath: [/^\/public/, /^\/login/], // 不用token页面
  wsconfig: { // ws
    url: WS_ENV_ENUM[envType].url,
    port: WS_ENV_ENUM[envType].port
  },
  useI18n: 'zh-CN' // 是否使用多语言，目前只支持中英文[zh-CN,en-US]
}
