<template>
  <div>
    <div class="bg-primary"></div>
    <el-button @click="toggleLayout">切换主题</el-button>
  </div>
</template>

<script>
import { validUsername } from 'gc-template/packages/utils/validate'
export default {
  name: 'User',
  methods: {
    toggleLayout() {
      console.log(validUsername('admin'))
      let layoutStyle
      if (this.$store.state.settings.layoutStyle === 'default') {
        layoutStyle = 'light'
      } else {
        layoutStyle = 'default'
      }
      this.$store.dispatch('settings/changeSetting', {
        key: 'layoutStyle',
        value: layoutStyle
      })
    }
  }
}
</script>

<style scoped lang="scss">
/*@import "~@/assets/styles/common/gc-var.scss";*/
.bg-primary {
  width: 100px;
  height: 100px;
  background-color: $--color-primary;
}
</style>
