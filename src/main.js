// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import HeyUI from 'heyui'
import App from './App'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import echarts from 'echarts'

require("./styles/app.less")

Vue.config.productionTip = false
Vue.use(HeyUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts