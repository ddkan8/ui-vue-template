<template>
  <div class="gc-template__wrap" :class="{'gc-template__wrap--t': layoutType === 'layout-t', 'gc-template__wrap--light': layoutStyle === 'light'}">
    <basic-header />
    <div :class="classObj" class="app-wrapper">
      <!--动效切换-->
      <template v-if="$store.state.settings.layoutTransiton">
        <transition name="fade-transform" mode="out-in">
          <basic-sidebar v-if="layoutType === 'layout-f'" class="sidebar-container" :class="{'sidebar-container--fixed': fixedSidebar}" />
        </transition>
      </template>
      <template v-else>
        <basic-sidebar v-if="layoutType === 'layout-f'" class="sidebar-container" :class="{'sidebar-container--fixed': fixedSidebar}" />
      </template>

      <div class="main-container" :class="{'main-container--copyright': fixedCopyright, 'has-tagsview': needTagsView}">
        <!--<div :class="{'fixed-header':fixedHeader}">-->
        <!--  <navbar />-->
        <!--</div>-->
        <basic-tags v-if="needTagsView" id="tags-view" :class="{'sticky-tags-view': stickyTags}" />
        <basic-main />
        <basic-copyright />
      </div>
    </div>
  </div>
</template>

<script>
// import '@/assets/styles/theme-default/layout/layout.scss'
// import { BasicHeader, BasicSidebar, BasicMain, BasicCopyright, BasicTags } from './components'
// import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
// import '@/assets/styles/theme-default/layout.scss'

export default {
  name: 'Layout',
  data() {
    return {
      stickyTags: false,
      tagsTop: null
    }
  },
  // mixins: [ResizeMixin],
  computed: {
    ...mapState({
      needTagsView: state => state.settings.tagsView,
      sidebar: state => state.settings.sidebar,
      fixedHeader: state => state.settings.fixedHeader,
      fixedSidebar: state => state.settings.fixedSidebar,
      fixedCopyright: state => state.settings.fixedCopyright,
      layoutStyle: state => state.settings.layoutStyle,
      layoutType: state => state.settings.layoutType
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    },
    watchObj() {
      const { layoutType, fixedHeader } = this
      return {
        layoutType,
        fixedHeader
      }
    }
  },
  watch: {
    watchObj: {
      handler: function(val) {
        // const tagsTop = document.getElementById('tags-view').getBoundingClientRect().top
        if (val.layoutType === 'layout-t' && !val.fixedHeader && !val.needTagsView) {
          // 设置tagViews固定的滚动高度
          this.$nextTick(() => {
            this.tagsTop = document.getElementById('tags-view').getBoundingClientRect().top
          })

          window.addEventListener('scroll', this.initScroll)
        } else {
          window.removeEventListener('scroll', this.initScroll)
        }
      },
      deep: true
    }
  },
  methods: {
    initScroll() {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop >= this.tagsTop) {
        this.stickyTags = true
      } else {
        this.stickyTags = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
