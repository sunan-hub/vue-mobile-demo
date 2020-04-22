<template>
  <div class="main">
    <my-header
      v-if="!$route.meta.isHideHeader"
      :title="$route.meta.title"
      :border="$route.meta.isShowTitleBorder"
    ></my-header>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.main{
  min-height: 100vh;
}
</style>
