import Vue from 'vue'
import App from './App.vue'

require('@/assets/css/minigrid-min.css')


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
