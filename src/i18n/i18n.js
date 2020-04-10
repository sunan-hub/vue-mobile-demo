import Vue from 'vue'
import { Locale } from 'vant'
import VueI18n from 'vue-i18n'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
import Config from '@/config'
const _useI18n = Config.useI18n

Vue.use(VueI18n)

const messages = {
  'en-US': enUS,
  'zh-CN': zhCN
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: _useI18n, // 设置地区
  messages: messages
})

Locale.use(_useI18n, _useI18n === 'zh-CN' ? zhCN : enUS)

export default i18n
