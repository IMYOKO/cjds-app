<template>
	<view class="dice-item" @click="handlClick(item)" :class="{active: item.money > 0}">
		<view class="dice-item-box">
			<view class="dice-img-box" v-if="['dan', 'dan1', 'shuang', 'shuang1'].includes(item.type)">
				<text>{{item.name}}</text>
			</view>
			<view class="dice-img-box" v-else>
				<view class="dice-icon" :class="`dice-icon-${item.type.split(':')[0]}`"></view>
				<view class="dice-icon" :class="`dice-icon-${item.type.split(':')[1]}`"></view>
			</view>
			<view class="title">
				{{item.scale}}
			</view>
		</view>
		<view class="dice-item-money-box" v-if="item.money > 0">
			{{item.money}}
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from "vuex";
	export default {
		props: {
			item: Object,
			listIndex: Number,
			itemIndex: Number
		},
		computed: {
			...mapState('Games', ['diceMoney']),
			...mapState('User', ['userInfo']),
			...mapGetters('Games', ['orderMoney']),
		},
		methods: {
			...mapMutations("Games", ['updateDiceData']),
			handlClick(item) {
				if(!this.diceMoney) {
					this.$toast('请先选择下注金额')
					return;
				}
				const banlance = this.userInfo.Banlance;
				let money = typeof this.diceMoney === 'string' ? banlance : this.diceMoney;
				if (typeof this.diceMoney === 'number') {
					if (money + this.orderMoney > banlance) {
						this.$toast('下注金额不能大于现有金额');
						return;
					}
				}
				this.updateDiceData({...item, money});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.dice-item {
		border: 1px solid rgba(255, 255, 255, 0.5);
		position: relative;
		margin: 5/@rem;
		padding: 20/@rem 0 8/@rem;
		background-color: rgba(255, 255, 255, 0.2);

		&.active {
			background-color: #077d00;
			border: 1px solid #1dbd13;
		}


		&-money-box {
			display: inline-block;
			position: absolute;
			left: 50%;
			top: 0;
			padding: 2/@rem 6/@rem;
			min-width: 28/@rem;
			height: 34/@rem;
			line-height: 34/@rem;
			font-size: 22/@rem;
			text-align: center;
			background-color: #e92625;
			border-radius: 17/@rem;
			z-index: 10;
			margin-top: -17/@rem;
			transform: translateX(-50%);
		}

		&-box {
			display: flex;
			flex-direction: column;

			.dice-img-box {
				display: flex;
				font-weight: bold;
				justify-content: center;

				text {
					color: #000;
					height: 44/@rem;
					line-height: 46/@rem;
					padding: 0 10/@rem;
					border: 1px solid #000;
					background-color: #fff;
					border-radius: 2px;
				}
			}

			.title {
				margin-top: 2/@rem;
				font-size: 24/@rem;
				text-align: center;
			}

			.dice-icon {
				width: 48/@rem;
				height: 48/@rem;
				margin: 0 2/@rem;

				&-1 {
					background: url('~@/assets/images/game/dice-1@2x.png') no-repeat;
					background-size: contain;
				}

				&-2 {
					background: url('~@/assets/images/game/dice-2@2x.png') no-repeat;
					background-size: contain;
				}

				&-3 {
					background: url('~@/assets/images/game/dice-3@2x.png') no-repeat;
					background-size: contain;
				}

				&-4 {
					background: url('~@/assets/images/game/dice-4@2x.png') no-repeat;
					background-size: contain;
				}

				&-5 {
					background: url('~@/assets/images/game/dice-5@2x.png') no-repeat;
					background-size: contain;
				}

				&-6 {
					background: url('~@/assets/images/game/dice-6@2x.png') no-repeat;
					background-size: contain;
				}
			}
		}

	}
</style>
