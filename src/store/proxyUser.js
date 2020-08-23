import apis from "@/api/apis";
import { toast } from "@/utils/index.js"

const state = {
}

const mutations = {
	
}

const actions = {
	async getUserQR({
		commit
	}, Id) {
		try {
			const res = await apis.getUserQR(Id)
			console.log(res)
			return Promise.resolve(res);
		} catch (error) {
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
