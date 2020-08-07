import apis from "@/api/apis";

const state = {
	advertising: ''
}

const mutations = {
	updateAd(state, advertising){
		state.advertising = advertising
	}
}

const actions = {
	async getGG({commit}) {
		try {
			const advertising = await apis.getGG()
			commit('updateAd', advertising)
		} catch (e) {
			//TODO handle the exception
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
