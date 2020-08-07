<template>
	<view class="money-wrapper">
		<view class="money-list" :class="{'active':  diceMoney === money}" v-for="money in moneyType" :key='money' @click="handleClick(money)">
			<view :class="`money-item money-item-${money}`">
				<text v-if="money === 'All'" class="all">{{money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		computed: {
			...mapState('Games', ['moneyType', 'diceMoney']),
		},
		methods: {
			...mapMutations("Games", ['updateDiceMoney', 'clearDiceData']),
			handleClick(value) {
				if (typeof this.diceMoney === 'string') {
					if (typeof value === 'string') {
						return
					} else {
						this.clearDiceData()
					}
				}
				if (typeof value === 'string') {
					this.clearDiceData()
				}
				this.updateDiceMoney(value)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.money-wrapper {
		padding: 0 10/@rem;
		display: flex;
		height: 78/@rem;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, .2);

		.money-list {
			height: 78/@rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid transparent;

			&.active {
				background-color: #047d01;
				border: 1px solid #1dbd13;
			}
		}

		.money-item {
			width: 58/@rem;
			height: 58/@rem;
			margin: 0 20/@rem;
			align-self: center;

			&-20 {
				background: url('~@/assets/images/game/money_20@2x.png') no-repeat;
				background-size: contain;
			}

			&-50 {
				background: url('~@/assets/images/game/money_50@2x.png') no-repeat;
				background-size: contain;
			}

			&-100 {
				background: url('~@/assets/images/game/money_100@2x.png') no-repeat;
				background-size: contain;
			}

			&-200 {
				background: url('~@/assets/images/game/money_200@2x.png') no-repeat;
				background-size: contain;
			}

			&-500 {
				background: url('~@/assets/images/game/money_500@2x.png') no-repeat;
				background-size: contain;
			}

			&-1000 {
				background: url('~@/assets/images/game/money_1000@2x.png') no-repeat;
				background-size: contain;
			}
		}

		.all {
			width: 52/@rem;
			height: 52/@rem;
			line-height: 52/@rem;
			display: block;
			text-align: center;
			border: 1px solid #fff;
			border-radius: 58/@rem;
		}
	}
</style>
