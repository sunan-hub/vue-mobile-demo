import HttpRequest from './axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? '/api/' : config.baseUrl

const axios = new HttpRequest(baseUrl)

export default axios
