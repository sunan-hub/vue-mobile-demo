import Vue from 'vue'
import { Locale } from 'vant'
import VueI18n from 'vue-i18n'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
import Config from '@/config'

Vue.use(VueI18n)

const messages = {
  en: enUS,
  cn: zhCN
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Config.useI18n, // 设置地区
  messages: messages
})

Locale.use('en-US', Config.useI18n === 'cn' ? zhCN : enUS)

export default i18n
