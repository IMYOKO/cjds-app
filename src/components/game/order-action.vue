<template>
	<view class="order-action-wrapper" :class="{closed}">
		<view class="order-action-top">
			<view class="order-money-wrapper">
				<OrderMoney />
			</view>
			<view class="time-wrapper">
				<text>12</text>
			</view>
			<view class="order-action-sumbit">
				<view class="sumbit-button sumbit-button-cancel" @click="onCancel">
					<text>取消</text>
				</view>
				<view class="sumbit-button sumbit-button-ok" @click="onOk">
					<text>确定</text>
				</view>
			</view>
		</view>
		<view class="order-action-dice">
			<Dice />
			<view class="money-wrapper">
				<view class="money">余额：<text>{{userInfo.Banlance}}</text></view>
				<view class='money'>下注：<text>{{orderMoney}}</text></view>
				<!-- <text>{{doubleMoney}}--{{temaMoney}}--{{singularMoney}}</text> -->
			</view>
			<view class="open-button" @click="close">
				{{closed ? '展开' : '收起'}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from "vuex";
	import Dice from '@/components/game/dice.vue'
	import OrderMoney from '@/components/game/order-money.vue'
	export default {
		data() {
			return {
				closed: false
			}
		},
		components: {
			Dice,
			OrderMoney
		},
		computed: {
			...mapState('Games', ['id', 'diceMoney', 'diceData']),
			...mapState('User', ['userInfo']),
			...mapGetters('Games', ['orderMoney', 'payType', 'doubleMoney', 'singularMoney', 'temaMoney', 'limitMoney']),
		},
		methods: {
			...mapMutations("Games", ['updateDiceMoney', 'clearDiceData']),
			...mapActions("Games", ['addOrder']),
			onCancel() {
				this.updateDiceMoney(0)
				this.clearDiceData()
			},
			onOk() {
				if (this.diceMoney === 0) {
					this.$toast('请先选择下注金额')
					return;
				}
				if (this.orderMoney === 0) {
					this.$toast('请先选择下注类型')
					return;
				}
				if (this.orderMoney > this.userInfo.Banlance) {
					this.$toast('下注金额不能大于现有金额')
					return;
				}
				if (this.singularMoney > 0) {
					if (this.singularMoney < this.limitMoney.singularMoneyLimit[0]) {
						this.$toast('下注金额小于个人限注')
						return 
					}
					if (this.singularMoney > this.limitMoney.singularMoneyLimit[1]) {
						this.$toast('下注金额大于个人限注')
						return 
					}
				}
				if (this.temaMoney > 0) {
					if (this.temaMoney < this.limitMoney.temaMoneyLimit[0]) {
						this.$toast('下注金额小于个人特码限注')
						return 
					}
					if (this.temaMoney > this.limitMoney.temaMoneyLimit[1]) {
						this.$toast('下注金额大于个人特码限注')
						return 
					}
				}
				if (this.doubleMoney > 0) {
					if (this.doubleMoney < this.limitMoney.doubleMoneyLimit[0]) {
						this.$toast('下注金额小于个人对子限注')
						return 
					}
					if (this.doubleMoney > this.limitMoney.doubleMoneyLimit[1]) {
						this.$toast('下注金额大于个人对子限注')
						return 
					}
				}
				const payload = {
					GameTableId: this.id,
					PlayType: this.payType,
					Money: this.orderMoney
				}
				this.addOrder(payload)
			},
			close() {
				this.closed = !this.closed
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.order-action-wrapper {
		background-color: rgba(0, 0, 0, 0.6);
		transition: transform 0.3s;

		&.closed {
			transform: translateY(-100%);
		}

		.order-action-top {
			padding-left: 120/@rem;
			display: flex;

			.order-money-wrapper {
				flex: 1;
			}

			.time-wrapper {
				width: 80/@rem;
				font-size: 40/@rem;
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #e92525;
			}

			.order-action-sumbit {
				display: flex;
				background-color: #fff;

				.sumbit-button {
					font-size: 30/@rem;
					display: flex;
					align-items: center;
					justify-content: center;

					&-cancel {
						color: #e92625;
						width: 90/@rem;

						&:active {
							background-color: #cecece;
						}
					}

					&-ok {
						width: 150/@rem;
						height: 100%;
						line-height: 100%;
						font-weight: bold;
						background-color: #068f00;

						&:active {
							background-color: #047d01;
						}
					}
				}
			}
		}

		.order-action-dice {
			position: relative;

			.money-wrapper {
				position: absolute;
				left: 20/@rem;
				bottom: 15/@rem;

				.money {
					color: rgba(255, 255, 255, 0.6);
					margin-top: 2/@rem;
					font-size: 24/@rem;

					text {
						color: #fff;
					}
				}
			}

			.open-button {
				width: 160/@rem;
				height: 54/@rem;
				line-height: 54/@rem;
				position: absolute;
				left: 50%;
				bottom: -54/@rem;
				color: rgba(255, 255, 255, 0.6);
				border-top: 1px solid rgba(255, 255, 255, 0.2);
				background-color: rgba(0, 0, 0, 0.6);
				text-align: center;
				transform: translateX(-50%);
			}
		}


	}
</style>
