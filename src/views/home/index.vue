<template>
  <div>
    <search placeholder="搜索“政务服务”"></search>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import { getAdministrativeAHQ } from '@/api/administrative'
export default {
  name: 'Home',
  data () {
    return {
      show: true
    }
  },
  mounted () {
  },
  methods: {
    /**
     * 接口调用
     */
    getAdministrativeAHQ () {
      getAdministrativeAHQ({
        serialNo: '4690301020023'
      }).then(res => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
