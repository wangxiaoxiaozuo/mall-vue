// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/global.css'

import ZkTable from 'table-tree-grid'

Vue.use(ZkTable)
Vue.config.productionTip = false

Vue.prototype.$message = Message

Vue.use(ElementUI)

process.env.MOCK && require('@/assets/js/mock/mock')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
