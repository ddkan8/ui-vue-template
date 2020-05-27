<template>
  <basic-dict></basic-dict>
</template>

<script>
export default {
  name: 'Dict'
}
</script>

<style scoped lang="scss">
  .app-main {
    /deep/ .el-pagination__total {
        color: red;
      }
  }
</style>
