import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const vm = new Vue({
  render: h => h(App),
  router
}).$mount('#app')

console.log(vm.$router)