
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
</style>
