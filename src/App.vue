<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import themeMixin from './mixins/themeMixin'

export default {
  name: 'App',
  mixins: [themeMixin]
}
</script>
