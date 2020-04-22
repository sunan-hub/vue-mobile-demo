import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/plugins/filter'
import * as mixins from '@/plugins/mixins'
import directives from '@/plugins/directives'
import i18n from '@/i18n/i18n'
// common css
import 'reset.css'
import '@/assets/styles/base.scss'

// 引用vant-ui组件
import '@/plugins/vant-ui'
import '@/plugins/common'
import '@/plugins/veevalidate'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Object.keys(mixins).forEach(key => {
  Vue.mixin(mixins[key])
})

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
