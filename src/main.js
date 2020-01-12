// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/global.css'
import router from './router'

import store from './store/index'

import ZkTable from 'vue-table-with-tree-grid'

import iconPicker from 'vue-fontawesome-elementui-icon-picker'

/* eslint-disable no-new */
Vue.use(ZkTable)
Vue.use(iconPicker)

Vue.config.productionTip = false

Vue.prototype.$message = Message

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
