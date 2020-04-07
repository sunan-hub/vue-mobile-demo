// 布局
<template>
  <div class="wrapper">
    <slot></slot>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-bottom: $footer-height;
}
</style>
