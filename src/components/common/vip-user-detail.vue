<template>
	<view class="vip-user-detail">
		<view class="vip-header">
			<view class="close" @click="closed">
				返回
			</view>
			<view class="title">
				<text>{{userId}} 详情</text>
			</view>
		</view>
		<view class="vip-content">
			<view class="vip-content-box">
				<view class="table-wrapper">
					<table>
						<tr>
							<td>牌桌</td>
							<td>期号</td>
							<td>下注详细</td>
							<td>开奖结果</td>
							<td>状态</td>
							<td>输赢</td>
							<td>下注总金额</td>
							<td>下注时间</td>
						</tr>
						<tr v-for="(item, index ) in list" :key="index">
							<td>{{item.GameId}}</td>
							<td>{{item.QS}}</td>
							<td>{{item.PlayType}}</td>
							<td>{{item.JG}}</td>
							<td>{{item.Status ? "已结算" : "未结算"}}</td>
							<td>{{item.SY}}</td>
							<td>{{item.XZMoney}}</td>
							<td>{{item.AddTime}}</td>
						</tr>
					</table>
				</view>
				<view class="total">
					<text @click="getMoreList" v-if="page < totalPage">显示更多</text>
					<text v-else>暂无更多</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			userId: Number
		},
		data() {
			return {
				page: 1,
				rows: 20,
				list: [],
				total: 0,
				totalPage: 0,
			}
		},
		mounted() {
			console.log('mounted', this.userId)
			this.getOrderTable()
		},
		beforeDestroy() {
			console.log('beforeDestroy')
		},
		watch: {
			page() {
				this.getOrderTable()
			}
		},
		methods: {
			clearData() {
				this.page = 1
				this.list = []
				this.total = 0
				this.totalPage = 0
			},
			closed() {
				this.$emit('upVipUserDetail', false)
			},
			getMoreList() {
				this.page = this.page + 1
			},
			async getOrderTable() {
				try {
					const res = await this.$api.getOrderTable(this.userId, this.page, this.rows)
					console.log(res)
					res.rows.map(item => {
						this.list.push(item)
					})
					this.total = res.total
					if(res.total > 0) {
						this.totalPage = Math.ceil(this.total / this.rows)
					}
				} catch (err) {
					console.error(err)
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');
	
	.vip-user-detail {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background-color: #1e1a17;
		
		.vip-header {
			height: 78/@rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
			
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.close {
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
			z-index: 1000;
		}
		
		.vip-content {
			height: calc(100vh - @TOP_HEIGHT);
			overflow-y: auto;
			
			&-box {
				padding: 15/@rem;
				
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
							}
						}
					}
				}
				
				.total {
					color: #717171;
					text-align: center;
					font-size: 22/@rem;
					padding: 20/@rem;
					
					text {
						margin: 0 5px;
					}
				}
			}
		}
	}
</style>
