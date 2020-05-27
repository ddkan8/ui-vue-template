import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '../packages/assets/styles/theme-default/index.scss'

// package.json信息
import packageInfo from '../package.json'
Vue.prototype.$packageInfo = packageInfo

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import App from './App'
import store from './store'
import router from './router'

// import '@/assets/icons' // icon
// import '@/permission' // permission control

/**
 * mock，生产环境不需要
 */
// import { mockXHR } from '../mock'
// mockXHR()

// 英文版 element-ui
// Vue.use(ElementUI, { locale })

// 中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import gcTemplate from 'gc-template'
Vue.use(gcTemplate)

// import { BasicDict, BasicCopyright, BasicHeader, BasicMain, BasicSidebar, BasicTags, SvgIcon } from 'gc-template'
// Vue.use(BasicDict)
// Vue.use(BasicCopyright)
// Vue.use(BasicHeader)
// Vue.use(BasicMain)
// Vue.use(BasicSidebar)
// Vue.use(BasicTags)
// Vue.use(SvgIcon)

import './assets/styles/index.scss'
// import './assets/styles/common.scss'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
