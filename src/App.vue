
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { forbidScroll } from '@/utils/forbidScroll'
export default {
  mounted () {
    window.forbidScroll = forbidScroll
  }
}
</script>
<style lang="scss">
// 当手机屏幕宽度超过 $break-super: 480px, 横屏浏览时的样式
@media (min-width: $break-super) and (orientation: landscape) {
  html::before {
    width: 100%;
    height: 100%;
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    background: #333;
  }
  body:before {
    background-image: url('./assets/images/orientation.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: 50%;
    content: '';
    height: 200px;
    width: 100px;
    z-index: 99999;
    margin: -140px 0 0 -50px;
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
  }
}
</style>
