<template>
	<view class="order-wrapper">
		<Headers>
			<view class="header">
				<view class="header-choose-wrapper">
					<view class="choose-item" :class="{active: DayType ===1}" @click="upDayType(1)">
						今天
					</view>
					<view class="choose-item" :class="{active: DayType ===2}" @click="upDayType(2)">
						昨天
					</view>
					<view class="choose-item" :class="{active: DayType ===3}" @click="upDayType(3)">
						一周
					</view>
				</view>
			</view>
		</Headers>
		<view class="back" @click="goGame" v-if="id">
			<text>返回</text>
		</view>
		<view class="order-content">
			<view class="table-wrapper">
				<table>
					<tr>
						<td>注册单号</td>
						<td>类别</td>
						<td>结果</td>
						<td>玩法</td>
						<td>下注时间</td>
						<td>交易前余额</td>
						<td>下注余额</td>
						<td>输赢</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item, index) in orderList" :key="index">
						<td>{{item.OrderId}}</td>
						<td>{{item.TableName}}</td>
						<td>{{item.JG}}</td>
						<td>{{item.PlayType}}</td>
						<td>{{item.AddTime}}</td>
						<td>{{item.JYQMoney}}</td>
						<td>{{item.XZMoney}}</td>
						<td>{{item.SY}}</td>
						<td>
							<!-- <text v-if="item.Status === 0" class="cd" @click="handleClick(item.Id)">撤单</text> -->
							<text v-if="item.Status === 1">已开奖</text>
							<!-- <text v-if="item.Status === 2">已撤单</text> -->
						</td>
					</tr>
				</table>
			</view>
			<view class="total">
				<text>共 {{orderList.length}} 条</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import Headers from "@/components/common/headers.vue"
	export default {
		data() {
			return {
				DayType: 1,
				id: null
			}
		},
		onShow() {
			this.getOrder({
				DayType: this.DayType
			})
		},
		onLoad(option) {
			const { id } = option
			if (id) {
				this.id = id
			}
		},
		components: {
			Headers
		},
		computed: {
			...mapState("Orders", ["orderList"])
		},
		methods: {
			...mapActions("Orders", ["getOrder", "revoke"]),
			async handleClick(id) {
				try {
					await this.revoke(id)
					uni.showModal({
						title: '提示',
						content: '撤单成功',
						confirmText: "关闭",
						showCancel: false,
						success: () => {
							this.getOrder({
								DayType: this.DayType
							})
						}
					})
				} catch (error) {
					
				}
			},
			upDayType(type) {
				this.DayType = type
				this.getOrder({
					DayType: type
				})
			},
			goGame() {
				uni.redirectTo({
					url: `/pages/game?id=${this.id}`
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.order-wrapper {
		color: #fff;
		font-size: 28/@rem;
		background-color: #1e1a17;
		padding-top: 88/@rem;
	}
	
	.back {
		color: #fff;
		width: 120/@rem;
		height: 78/@rem;
		font-size: 26/@rem;
		line-height: 78/@rem;
		text-align: center;
		background-color: #4f4f4f;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1010;
	}

	.header {
		width: 100%;
		height: 78/@rem;
		display: flex;
		align-items: center;
		justify-content: center;

		.header-choose-wrapper {

			height: 58/@rem;
			display: flex;
			justify-content: center;
			align-items: center;

			.choose-item {
				width: 140/@rem;
				height: 58/@rem;
				font-size: 24/@rem;
				line-height: 58/@rem;
				text-align: center;
				border: 1px solid rgba(255, 255, 255, 0.2);

				&.active {
					border: 1px solid #1dbd13;
					background-color: #047d01;
				}
			}
		}
	}

	.order-content {
		padding: 20/@rem 15/@rem 15/@rem;
		
		.total {
			color: #717171;
			text-align: center;
			font-size: 22/@rem;
			padding: 20/@rem;
		}

		.table-wrapper {
			table {
				width: 100%;
				display: table;

				tr {
					background-color: rgba(255, 255, 255, 0.2);
					border-bottom: 1px solid rgba(255, 255, 255, 0.2);

					&:first-child {
						background-color: rgba(255, 255, 255, 0.1);
					}

					td {
						font-size: 20/@rem;
						padding: 30/@rem 5/@rem;
						line-height: 1.2;

						&:last-child {
							width: 110/@rem;
							text-align: center;

							.cd {
								padding: 5/@rem 7/@rem;
								background-color: rgba(255, 96, 96, 0.6);
							}
						}
					}
				}
			}
		}
	}
</style>
