// 底部菜单
<template>
  <div>
    <ul class="layout-footer" ref="footer">
      <router-link
        v-for="(tab, index) in tabs"
        :key="'tabs-' + index"
        :to="tab.path"
        class="item"
        exact-active-class="active"
      >
        <svg-icon :icon="tab.icon" :class="['svg-icon-'+ tab.icon]"></svg-icon>
        <p>{{tab.name}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'my-footer',
  data () {
    return {
      tabs: [
        { name: '首页', icon: 'home', path: '/' },
        { name: '办事', icon: 'msg', path: '/affairs' },
        { name: '扫码', icon: 'msg', path: '/qrcode' },
        { name: '生活', icon: 'msg', path: '/life' },
        { name: '我的', icon: 'msg', path: '/center' }
      ]
    }
  },
  mounted () {
    const elem = this.$refs.footer
    window.forbidScroll(elem)
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
