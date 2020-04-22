import store from '@/store'
// 为了区分mixin和.vue文件自定义内容区分开来，mixin自定义变量统一使用大写
export default {
  data () {
    return {
      SOURCE: store.state.auth.source,
      TOKEN: store.state.auth.token,
      USER_INFO: store.state.auth.userInfo
    }
  }
}
