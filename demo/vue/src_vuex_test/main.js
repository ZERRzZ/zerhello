import Vue from 'vue'

import App from './App'
import store from './store/index'

Vue.config.productionTip = false

const vm = new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')

console.log(vm)