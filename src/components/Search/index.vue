// 搜索
<template>
  <div class="search-wrap" ref="search">
    <slot name="h-left"></slot>
    <div class="search-block" :class="{'searching': searchText}">
      <van-icon name="search" color="#ccc" />
      <input type="text" class="in" v-model="searchText" :placeholder="placeholder" />
      <span @click.stop="onClear()">
        <svg-icon icon="close" :className="'svg-icon-close'" v-if="searchText"></svg-icon>
      </span>
    </div>
    <div class="clearText" v-show="searchText" @click.stop="onSearch()">确定</div>
    <slot name="h-right"></slot>
  </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    placeholder: {
      type: String,
      default: '搜索内容'
    }
  },
  data () {
    return {
      searchText: ''
    }
  },
  mounted () {
    const elem = this.$refs.search
    window.forbidScroll(elem)
  },
  methods: {
    onClear () {
      this.searchText = ''
      setTimeout(() => {
        this.$emit('on-clear')
      }, 0)
    },
    onSearch () {
      this.$emit('on-search', this.searchText)
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
