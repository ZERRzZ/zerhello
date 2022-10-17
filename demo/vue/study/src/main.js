import Vue from 'vue'
import App from './App'
import { plugin } from './plugins'

Vue.config.productionTip = false

Vue.use(plugin, 1)

new Vue({
  render: h => h(App)
}).$mount('#app')