import App from './App'

// import uView from './uni_modules/uview-ui'
// Vue.use(uView)

// #ifndef VUE3
import Vue from 'vue'

//引入api
import * as API from '@/static/index.js'
Vue.prototype.$api=API

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif