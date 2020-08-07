import VueI18n from 'vue-i18n'
import Vue from 'vue'
import configDef from '@/config'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: configDef.useI18n,
  messages: {
    'zh-CN': require('./zh-CN'),
    'en-US': require('./en')
  }
})
export default i18n
