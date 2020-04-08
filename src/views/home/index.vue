<template>
  <div>
    <search placeholder="搜索“政务服务”"></search>
  </div>
</template>

<script>
import { getAdministrativeAHQ } from '@/api/administrative'
export default {
  name: 'Home',
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
