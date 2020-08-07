// 初始化一些数据
// 输赢比例
const DICE_SCALE = {
	nomal: '1:1',
	tema: '1:11',
	doubles: '1:18',
	singular: '1:12'
}


export const singularData = [{
	type: '1:2',
	number: [1, 2],
	money: 0,
	scale: DICE_SCALE.singular
}, {
	type: '1:3',
	number: [1, 3],
	money: 0,
	scale: DICE_SCALE.singular
}, {
	type: 'dan1',
	name: '单',
	money: 0,
	scale: DICE_SCALE.nomal
}, {
	type: 'shuang1',
	name: '双',
	money: 0,
	scale: DICE_SCALE.nomal
}, {
	type: 'dan',
	name: '吃单数',
	money: 0,
	scale: DICE_SCALE.nomal
}, {
	type: 'shuang',
	name: '吃双数',
	money: 0,
	scale: DICE_SCALE.nomal
}]

export const temaData = [{
	type: '1:4',
	number: [1, 4],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '1:5',
	number: [1, 5],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '1:6',
	number: [1, 6],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '2:3',
	number: [2, 3],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '2:4',
	number: [2, 4],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '2:5',
	number: [2, 5],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '2:6',
	number: [2, 6],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '3:4',
	number: [3, 4],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '3:5',
	number: [3, 5],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '3:6',
	number: [3, 6],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '4:5',
	number: [4, 5],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '4:6',
	number: [4, 6],
	money: 0,
	scale: DICE_SCALE.tema
}, {
	type: '5:6',
	number: [5, 6],
	money: 0,
	scale: DICE_SCALE.tema
},]

export const doubleData = [{
	type: '1:1',
	number: [1, 1],
	money: 0,
	scale: DICE_SCALE.doubles
}, {
	type: '2:2',
	number: [2, 2],
	money: 0,
	scale: DICE_SCALE.doubles
}, {
	type: '3:3',
	number: [3, 3],
	money: 0,
	scale: DICE_SCALE.doubles
}, {
	type: '4:4',
	number: [4, 4],
	money: 0,
	scale: DICE_SCALE.doubles
}, {
	type: '5:5',
	number: [5, 5],
	money: 0,
	scale: DICE_SCALE.doubles
}, {
	type: '6:6',
	number: [6, 6],
	money: 0,
	scale: DICE_SCALE.doubles
}]

export const defaultDiceData = [
	doubleData,
	temaData,
	singularData
]

export const moneyType = [20, 50, 100, 200, 500, 1000, 'All'];

export const diceOption = {
	type: '',
	money: 0
}

export const singularTypeArry = ['dan', 'shuang', 'dan1', 'shuang1']
export const temaTypeArry = ['1:2', '1:3', '1:4', '1:5', '1:6', '2:3', '2:4', '2:5', '2:6', '3:4', "3:5", '3:6', '4:5',
	'4:6', '5:6'
]
export const doubleTypeArry = ['1:1', '2:2', '3:3', '4:4', '5:5', '6:6']

export const getMoney = (diceData, typeArry = []) => {
	let money = 0
	diceData.forEach(diceItem => {
		diceItem.forEach(item => {
			if (typeArry.includes(item.type)) {
				money += item.money
			}
		})
	})
	return money
}

// 银行卡
export const bankList = [{
	name: "中国银行",
	value: '中国银行'
}, {
	name: "中国农业银行",
	value: "中国农业银行"
}, {
	name: "中国工商银行",
	value: "中国工商银行"
}, {
	name: "中国建设银行",
	value: "中国建设银行"
}, {
	name: "中国邮政银行",
	value: "中国邮政银行"
}, {
	name: "中国交通银行",
	value: "中国交通银行"
}, {
	name: "华夏银行",
	value: "华夏银行"
}, {
	name: "光大银行",
	value: "光大银行"
}, {
	name: "招商银行",
	value: "招商银行"
}, {
	name: "中信银行",
	value: "中信银行"
}, {
	name: "兴业银行",
	value: "兴业银行"
}, {
	name: "民生银行",
	value: "民生银行"
}, {
	name: "深圳发展银行",
	value: "深圳发展银行"
}, {
	name: "广东发展银行",
	value: "广东发展银行"
}, {
	name: "上海浦东发展银行",
	value: "上海浦东发展银行"
}, {
	name: "恒丰银行",
	value: "恒丰银行"
}]