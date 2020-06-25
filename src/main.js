import Vue from 'vue'
import App from './App.vue'

import './plugins'
import './plugins/style.css'
import router from './router'
import store from './store'

// import './demoAsync'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
