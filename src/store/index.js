import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'

Vue.use(Vuex);

// import settings from 'gc-template/packages/store/modules/settings'
import tagsView from 'gc-template/packages/store/modules/tagsView'

const modulesFiles = require.context('./modules', true, /\.js$/)

// 引入modules
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules: {
    // settings: settings,
    tagsView: tagsView,
    ...modules
  }
  // getters
})

export default store
