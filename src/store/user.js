import apis from "@/api/apis";
import { toast } from "@/utils/index.js"

const state = {
	token: uni.getStorageSync('token') || '',
	userInfo: {
		Id: null,
		Banlance: 0,
		UserName: ''
	}
}

const mutations = {
	updateToken(state, token) {
		if (token) {
			uni.setStorageSync('token', token)
		} else {
			uni.removeStorageSync('token')
		}
		state.token = token
	},
	updateUserInfo(state, userInfo) {
		state.userInfo = userInfo
	},
	logout(state) {
		uni.removeStorageSync('token')
		state.token = ''
		state.userInfo = {
			Id: null,
			Banlance: 0,
			UserName: ''
		}
		uni.redirectTo({
			url: '/pages/login'
		});
	}
}

const actions = {
	async login({
		commit
	}, payload) {
		try {
			const res = await apis.login(payload)
			commit('updateToken', res.token)
			console.log(res)
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getUserInfo({
		commit
	}, tableId) {
		try {
			const res = await apis.getUserInfo({
				tableId
			});
			commit('updateUserInfo', res)
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async updateTKPassWord(_, payload) {
		try {
			const res = await apis.updateTKPassWord(payload);
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async updatePassWord(_, payload) {
		try {
			const res = await apis.updatePassWord(payload);
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async addRecharge(_, payload) {
		try {
			const res = await apis.addRecharge(payload);
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async addWithdrawal(_, payload) {
		try {
			const res = await apis.addWithdrawal(payload);
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getWithdrawal() {
		try {
			const data = await apis.getWithdrawal();
			return Promise.resolve(data);
		} catch (error) {
			console.log(error)
		}
	},
	async getBankInfo() {
		try {
			const data = await apis.getBankInfo();
			return Promise.resolve(data);
		} catch (error) {
			console.log(error)
		}
	},
	async getZNX() {
		try {
			const data = await apis.getZNX();
			return Promise.resolve(data);
		} catch (error) {
			console.log(error)
		}
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
