import apis from "@/api/apis";
import { toast } from "@/utils/index.js"

const state = {
	orderList: []
}

const mutations = {
	updateOrderList(state, list) {
		state.orderList = list
	}
}

const actions = {
	async getOrder({
		commit
	}, payload) {
		try {
			const list = await apis.getOrder(payload)
			commit('updateOrderList', list)
		} catch (error) {
			console.log(error)
		}
	},
	async revoke({
		dispatch
	}, id) {
		try {
			const res = await apis.revoke({ id })
			return Promise.resolve(res);
		} catch (error) {
			toast('操作失败')
			return Promise.reject(error);
		}
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
