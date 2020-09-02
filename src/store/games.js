import apis from "@/api/apis";
import {
	toast,
	showLoading
} from "@/utils/index.js";
import {
	defaultDiceData,
	moneyType,
	getMoney,
	temaTypeArry,
	singularTypeArry,
	doubleTypeArry
} from './init.js';

const state = {
	id: 0,
	gameTableList: [],
	gameList: [],
	rankList: [],
	diceData: defaultDiceData,
	moneyType,
	diceMoney: 0,
}

const getters = {
	orderMoney(state) {
		let money = 0
		state.diceData.forEach(diceDataItem => {
			diceDataItem.forEach(diceItem => {
				diceItem.forEach(item => {
					money += item.money
				})
			})
		})
		return money
	},
	payType(state) {
		const arr = []
		state.diceData.forEach(diceDataItem =>
			diceDataItem.forEach(diceItem => {
				diceItem.forEach(({
					money,
					type
				}) => {
					if (money) {
						arr.push(`${type}|${money}`)
					}
				})
			})
		)
		return arr.toString()
	},
	temaMoney(state) {
		return getMoney(state.diceData, temaTypeArry)
	},
	singularMoney(state) {
		return getMoney(state.diceData, singularTypeArry)
	},
	doubleMoney(state) {
		return getMoney(state.diceData, doubleTypeArry)
	},
	limitMoney(state) {
		let doubleMoneyLimit = [0, 0],
			singularMoneyLimit = [0, 0],
			temaMoneyLimit = [0, 0]
		const tableItem = state.gameTableList.find(({
			Id
		}) => Id.toString() === state.id.toString())
		if (tableItem) {
			const s = tableItem.PersonalRestriction.split('-')
			const t = tableItem.PersonalSpecialCodeLimit.split('-')
			const d = tableItem.IndividualToChildRestriction.split('-')
			singularMoneyLimit = [Number(s[0]), Number(s[1])]
			temaMoneyLimit = [Number(t[0]), Number(t[1])]
			doubleMoneyLimit = [Number(d[0]), Number(d[1])]
		}
		return {
			singularMoneyLimit,
			temaMoneyLimit,
			doubleMoneyLimit
		}
	}
}

const mutations = {
	updateGameTableId(state, id) {
		state.id = id
	},
	updateGameList(state, data) {
		state.gameTableList = data.game
		const gameList = data.list.reverse()
		// gameList.map(item => {
		// 	const len = item.num.length
		// 	if (len < 6) {
		// 		for (let i = 0; i < 6; i++) {
		// 			if (!item.num[i]) {
		// 				item.num.push('')
		// 			}
		// 		}
		// 	}
		// 	return item
		// })
		const tempList = []
		gameList.map(item => {
			const arritem = []
			item.reverse().map((i, eq) => {
				if (i[0] > 0) {
					const a = i
					a.push((i[0] + i[1]) % 2)
					arritem.push(a)
				}
			})
			if (arritem.length < 6) {
				for (let i = 0; i < 6; i++) {
					if (!arritem[i]) {
						arritem.push([0, 0])
					}
				}
			}
			tempList.push(arritem)
		})
		state.gameList = tempList
	},
	updateRankList(state, list) {
		state.rankList = list
	},
	updateDiceMoney(state, money) {
		state.diceMoney = money
	},
	updateDiceData(state, payload) {
		const newDiceData = state.diceData.slice(0)
		const newArr = newDiceData.map((diceDataItem) => {
			const newDiceDataItem = diceDataItem.map((diceItem) => {
				const newDiceItem = diceItem.map((item) => {
					let newItem = item;
					// All in 的时候先清除其他的金额
					if (typeof state.diceMoney === 'string') {
						newItem = {
							...newItem,
							money: 0
						}
					}
					if (payload.type === newItem.type) {
						const money = payload.money + newItem.money
						return {
							...newItem,
							money
						}
					}
					return {
						...newItem
					}
				})
				return newDiceItem
			})
			return newDiceDataItem
		})
		state.diceData = newArr;
	},
	clearDiceData(state) {
		const newDiceData = state.diceData.slice(0)
		const newArr = newDiceData.map((diceDataItem) => {
			const newDiceDataItem = diceDataItem.map((diceItem) => {
				const newItem = diceItem.map((item) => {
					return {
						...item,
						money: 0
					}
				})
				return newItem
			})
			return newDiceDataItem
		})
		state.diceData = newArr;
	}
}

const actions = {
	async getGameTable({
		commit
	}, payload) {
		try {
			const list = await apis.getGameTable(payload)
			commit('updateGameList', list)
		} catch (error) {
			throw Error(error)
		}
	},
	async getRankList({
		commit
	}, payload) {
		try {
			const list = await apis.getRankList(payload)
			commit('updateRankList', list)
		} catch (error) {
			throw Error(error)
		}
	},
	async addOrder({
		commit
	}, payload) {
		try {
			await apis.addOrder(payload)
			toast('下注成功');
			commit('updateDiceMoney', 0)
			commit('clearDiceData')
			// uni.showModal({
			// 	title: '提示',
			// 	content: '下单成功',
			// 	confirmText: "确认",
			// 	showCancel: false,
			// 	success: () => {
			// 		commit('updateDiceMoney', 0)
			// 		commit('clearDiceData')
			// 	}
			// })
		} catch (error) {
			toast('下注失败');
			throw Error(error)
		}
	},
	async Kj({
		commit
	}) {
		try {
			const res = await apis.getKj()
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	async getPrizeNo(){
		try {
			const res = await apis.getPrizeNo()
			return Promise.resolve(res);
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
