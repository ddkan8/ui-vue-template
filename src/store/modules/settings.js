import defaultSettings from '../../settings'
import Cookies from 'vue-cookies'

const { headerNav, fixedHeader, sidebarOpen, fixedSidebar, fixedCopyright, layoutType, tagsView, themeDefault, layoutTransiton, layoutStyle } = defaultSettings

const state = {
  sidebar: {
    opened: sidebarOpen,
    withoutAnimation: false
  },
  headerNav: headerNav,
  fixedHeader: fixedSidebar ? true : fixedHeader,
  fixedSidebar: fixedSidebar,
  fixedCopyright: fixedCopyright,
  layoutType: layoutType,
  tagsView: tagsView,
  theme: Cookies.get('theme') ? Cookies.get('theme') : themeDefault,
  layoutTransiton: layoutTransiton,
  layoutStyle: layoutStyle
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

