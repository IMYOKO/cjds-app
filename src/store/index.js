import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Games from './games'
import Common from './common'
import Orders from './orders'
import ProxyUser from './proxyUser'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		User,
		Games,
		Common,
		Orders,
		ProxyUser
	}
})
