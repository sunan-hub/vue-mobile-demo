// 头部
<template>
  <div
    :class="['header', border ? 'is-border' : '', (isShowHeader && isProd) ? stutasBarStyle : '']"
    :style="{ zIndex: zIndex, 'background-color': bkColor}"
    v-if="isShowHeader"
  >
    <div class="head-left" @click="goback()" v-if="hasBack">
      <slot name="h-left">
        <img class="icon-back" src="./back.png" alt="" />
      </slot>
    </div>
    <div class="head-content">
      <slot name="h-center">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="head-right">
      <slot name="h-right"></slot>
    </div>
  </div>
</template>
<script>
import { exitApp } from '@/utils/appMethod'
import { getOSType } from '@/utils/common'
export default {
  name: 'my-header',
  props: {
    border: {
      // 下边框
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 99
    },
    back: {
      type: Function
    },
    bkColor: {
      type: String
    },
    hasBack: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // app离线显示头部，否则隐藏头部
      isShowHeader: process.env.VUE_APP_IS_SHOW_HEADER === 'true',
      isProd: process.env.NODE_ENV === 'production', // 是否为正式环境的离线包，用于设置stuta bar 高度
      stutasBarStyle: getOSType() === 0 ? 'stutasBar-ios' : 'stutasBar-and'
    }
  },
  methods: {
    goback () {
      const auth = this.$store.state.auth
      // 返回，针对离线app第一次路由直接退出
      if (this.$route.path === auth.isFirstRouter && auth.isMpaasApp) {
        exitApp()
      }
      if (this.back) {
        this.back()
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: $header-height;
  z-index: 100;
  font-size: 36px;
  font-weight: 600;
  background: #fff;
  display: flex;
  align-items: center;
  // 安卓 离线包设置stutas bar height
  &.stutasBar-and{
    // 750像素下 stutas bar 高度
    margin-top: 66px;
  }
  // ios
  &.stutasBar-ios{
    // 750像素下 stutas bar 高度
    margin-top: 40px;
  }
  &.is-border {
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid $border-color;
      transform: scaleY(0.5);
    }
  }
  .head-content {
    max-width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    text-align: center;
  }
  .icon-back {
    width: 24px;
    height: 34px;
    display: block;
    object-fit: contain;
  }
  .head-left,
  .head-right {
    position: absolute;
    padding: 0 20px;
  }
  .head-left {
    left: 0;
  }
  .head-right {
    right: 0;
    color: $primary-color;
    font-size: 28px;
  }
}
</style>
