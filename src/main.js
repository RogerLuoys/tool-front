// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import store from './store'
import VCharts from 'v-charts'
// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(VCharts)
// Vue.use(VueCodemirror)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
