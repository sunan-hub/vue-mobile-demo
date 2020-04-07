// 公共配置
const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'https://performance.digitalhainan.com.cn/onecode', // 开发
    pro: 'https://onecode.digitalhainan.com.cn/onecode' // 生产
  },
  publicPath: [/^\/public/, /^\/login/], // 不用token页面
  wsconfig: { // ws
    url: isDev ? '127.0.0.1' : 'www.digital-hainan.com',
    port: isDev ? '3001' : 12001
  }
}
