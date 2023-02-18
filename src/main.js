import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import store from '../store'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import './assets/iconfont/iconfont.css'
import {request} from './network/index.js'


Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.config.productionTip = false

Vue.prototype.$axios = request
Vue.prototype.bus = new Vue()
Vue.prototype.$store = store


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
