import Vue from 'vue'
import App from './App'
import apis from './api/apis'
import store from './store/index.js'
import {
	toast
} from './utils/index.js'

Vue.config.productionTip = false
Vue.prototype.$api = apis
Vue.prototype.$store = store
Vue.prototype.$toast = toast

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
