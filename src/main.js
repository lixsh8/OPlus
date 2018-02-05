// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.prototype.$token = 'f2fb0d50-ffb7-4d75-9971-774b47ae885b'
// Vue.prototype.$token = ''
Vue.prototype.pid = '8527c7ca-0a89-11e5-b693-000c29a11092'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
