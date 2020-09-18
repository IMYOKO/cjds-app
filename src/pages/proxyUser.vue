<template>
	<div class="proxyuser pages">
		<Headers>
			<view class="header">
				<view class="header-choose-wrapper">
					<view class="choose-item" :class="{active: type === 0}" @click="upType(0)">
						我的代理
					</view>
					<view class="choose-item" :class="{active: type === 3}" @click="upType(3)">
						我的会员
					</view>
					<!-- <view class="choose-item" :class="{active: type === 4}" @click="upType(4)">
						有效会员
					</view> -->
					<view class="choose-item" :class="{active: type === 1}" @click="upType(1)">
						加入代理
					</view>
					<view class="choose-item" :class="{active: type === 2}" @click="upType(2)">
						我的二维码
					</view>
				</view>
			</view>
		</Headers>
		
		<!-- order start -->
		<view class="order-content" v-if="type === 0">
			<view class="table-wrapper dl-table">
				<table>
					<tr>
						<td>代理会员类型：</td>
						<td>代理特码分红：</td>
						<td>特码划分比率：</td>
						<td>特码分红比率：</td>
					</tr>
					<tr>
						
						<td>{{myDlData.TypeText}}</td>
						<td>{{myDlData.Profit}}</td>
						<td>{{myDlData.Divide}}</td>
						<td>{{myDlData.Dividends}}</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>下级会员人数：</td>
						<td>下级有效会员人数：</td>
						<td>下级有效人数：</td>
						<td>所有下级有效下注金额：</td>
					</tr>
					<tr>
						<td>{{myDlData.Sub}}</td>
						<td>{{myDlData.SubActive}}</td>
						<td>{{myDlData.SubLot}}</td>
						<td>{{myDlData.SubBet}}</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>所有下级利润总和：</td>
						<td>最后分红时间：</td>
						<td>当月交的保证金：</td>
						<td>保证金余额：</td>
					</tr>
					<tr>
						<td>{{myDlData.SubProfit}}</td>
						<td>{{myDlData.DividendsDate}}</td>
						<td>{{myDlData.Margin}}</td>
						<td>{{myDlData.MarginBalance}}</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>最近保证金交款时间：</td>
						<td>占成代理停止时间：</td>
						<td>占成比率：</td>
						<td>停止占成人数：</td>
					</tr>
					<tr>
						<td>{{myDlData.MarginDate}}</td>
						<td>{{myDlData.MarginDateEnd}}</td>
						<td>{{myDlData.Percentage}}</td>
						<td>{{myDlData.EndLot}}</td>
					</tr>
				</table>
				<table>
					<tr>
						<td>审核结果：</td>
						<td>审核时间：</td>
						<td>修改时间：</td>
						<td></td>
					</tr>
					<tr>
						<td>{{myDlData.AuditText}}</td>
						<td>{{myDlData.AuditDate}}</td>
						<td>{{myDlData.EditDate}}</td>
						<td></td>
					</tr>
				</table>
			</view>
		</view>
		<!-- order end -->
		
		<!-- order start -->
		<view class="order-content" v-if="type === 3">
			<view class="table-wrapper">
				<table>
					<tr>
						<td>ID</td>
						<td>用户名</td>
						<td>昵称</td>
						<td>手机号</td>
						<td>是否为有效会员</td>
						<td>操作</td>
					</tr>
					<tr v-for="(item, index ) in list" :key="index">
						<td>{{item.Id}}</td>
						<td>{{item.UserName}}</td>
						<td>{{item.NickName}}</td>
						<td>{{item.Phone}}</td>
						<td>{{item.effective ? "是" : "否"}}</td>
						<td>
							<text class="xq" @click="showVipUserDetail(item.Id)">查看详情</text>
						</td>
					</tr>
				</table>
			</view>
			<view class="total">
				<text @click="getMoreList" v-if="page < totalPage">显示更多</text>
				<text v-else>暂无更多</text>
			</view>
		</view>
		<!-- order end -->
		<view class="pages-wrapper password-wrapper" v-if="type === 1">
			<view class="password-content">
				<view class="form-wrapper">
					<view class="form-item">
						<view class="title">
							<text>代理人ID：</text>
						</view>
						<view class="input-item">
							<!--  #ifdef  APP-PLUS -->
							<view class="saoyisao" @click="scanCode">
								扫码
							</view>
							<!--  #endif -->
							<input type="text" maxlength="16" v-model="proxyId" placeholder="请输入代理人ID" />
						</view>
					</view>
					<view class="button-wrapper">
						<view class="button-item" @click="joinProxy">
							<text>确认</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="my-code" v-if="type === 2">
			<view class="my-code-wrapper">
				<view class="my-code-title">
					ID: {{userId}}
				</view>
				<view class="my-code-img">
					<image width='240' height='240' :src="qrcodeurl" v-if="qrcodeurl" mode=""></image>
				</view>
			</view>
		</view>
		
		<VipUserDetail v-if="vipUserDetailVisible" @upVipUserDetail="upVipUserDetail" :userId="detailId" />
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import Headers from "@/components/common/headers.vue"
	import VipUserDetail from "@/components/common/vip-user-detail.vue"
	import QRCode from 'qrcode'
	const QR = require('@/utils/qrcode.js');
	export default {
		data() {
			return {
				detailId: null,
				type: 0,
				userId: null,
				proxyId: '',
				qrcodeurl: '',
				page: 1,
				rows: 20,
				list: [],
				total: 0,
				totalPage: 0,
				myDlData: {
					Audit: 0,
					AuditDate: "",
					AuditUsderId: 0,
					Divide: 0,
					DivideBalance: 0,
					Dividends: 0,
					DividendsDate: "",
					EditDate: "",
					EditUserId: null,
					EndLot: 0,
					Id: null,
					Margin: 0,
					MarginBalance: 0,
					MarginDate: "",
					MarginDateEnd: "",
					Percentage: 0,
					Profit: 0,
					Sub: 0,
					SubActive: 0,
					SubBet: 0,
					SubLot: 0,
					SubProfit: 0,
					Type: null,
					UserId: null,
					UserName: "",
					TypeText: "",
					AuditText: ""
				},
				vipUserDetailVisible: false
			}
		},
		onLoad(option) {
			this.userId = option.Id || null
			if (this.userId != null) {
				this.generateQR(this.userId)
				this.getProxy()
			}
		},
		onUnload() {
			this.clearListData()
		},
		components: {
			Headers,
			VipUserDetail
		},
		watch: {
			page() {
				this.getSubUser()
			}
		},
		methods: {
			...mapActions('ProxyUser', ['getUserQR']),
			upType(type) {
				this.type = type
				if (type === 3) {
					this.getSubUser()
				} else {
					this.clearListData()
				}
			},
			clearListData() {
				this.page = 1
				this.list = []
				this.total = 0
				this.totalPage = 0
			},
			scanCode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						this.proxyId = res.result
					}
				});
			},
			getMoreList() {
				this.page = this.page + 1
			},
			async generateQR(text) {
				try {
					// const qrcodeurl = await QRCode.toDataURL(text)
					// console.log(qrcodeurl)
					const qrcodeurl = await QR.createQrCodeImg(text)
					// console.log(qrcodeurl)
					this.qrcodeurl = qrcodeurl
				} catch (err) {
					console.error(err)
				}
			},
			async joinProxy() {
				if (this.proxyId == '') {
					this.$toast('请输入代理人ID')
					return
				}
				if (this.proxyId === this.userId) {
					this.$toast('代理用户和用户不能为同一人')
					return
				}
				try {
					const res = await this.$api.joinProxy({
						proxyId: this.proxyId,
						userId: this.userId
					})
					this.$toast('操作成功')
				} catch (e) {
					this.$toast(e.Log)
					console.log(e)
				}
			},
			async getSubUser() {
				try {
					const res = await this.$api.getSubUser(this.userId, this.page, this.rows)
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
			async getProxy() {
				try {
					const res = await this.$api.getProxy(this.userId)
					if(!res) {
						return
					}
					if(res.Type === 1) {
						res.TypeText = '分红代理'
					}
					if(res.Type === 2) {
						res.TypeText = '合伙人代理'
					}
					if(res.Type === 3) {
						res.TypeText = '合伙人转分红'
					}
					if(res.Audit === 0) {
						res.AuditText = '未审核'
					}
					if(res.Audit === 1) {
						res.AuditText = '审核通过'
					}
					if(res.Audit === 2) {
						res.AuditText = '审核未通过'
					}
					this.myDlData = res
				} catch (err) {
					console.error(err)
				}
			},
			upVipUserDetail(flag) {
				this.vipUserDetailVisible = flag
			},
			setDetailId(id) {
				this.detailId = id
			},
			showVipUserDetail(id) {
				this.upVipUserDetail(true);
				this.setDetailId(id)
			}
		},
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

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

	.my-code {
		height: 100vh;
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;

		&-title {
			text-align: center;
			margin-bottom: 24/@rem;
			font-size: 34/@rem;
		}

		image {
			width: 360/@rem;
			height: 360/@rem;
			padding: 10/@rem;
			background-color: #fff;
		}
	}

	.password-wrapper {
		display: flex;
		justify-content: center;

		.password-content {
			width: 50%;
			min-height: 100%;
			border: 1px solid rgba(255, 255, 255, 0.2);
			border-top: none;
			border-bottom: none;

			display: flex;
			justify-content: center;
			align-items: center;

			.form-wrapper {
				width: 70%;

				.form-item {
					margin-bottom: 30/@rem;

					.title {
						font-size: 24/@rem;
						line-height: 30/@rem;
						margin-bottom: 20/@rem;
					}

					.input-item {
						position: relative;

						input {
							font-size: 26/@rem;
							display: block;
							width: calc(100% - 40/@rem);
							padding: 0 20/@rem;
							height: 64/@rem;
							line-height: 64/@rem;
							border: 1px solid rgba(255, 255, 255, 0.2);
						}

						.saoyisao {
							width: 80/@rem;
							height: 64/@rem;
							font-size: 24/@rem;
							line-height: 64/@rem;
							text-align: center;
							position: absolute;
							right: 0;
							top: 1px;
							z-index: 1;
							background-color: rgba(255, 255, 255, 0.2);
						}
					}

				}

				.button-wrapper {
					padding-top: 15/@rem;
					display: flex;
					justify-content: center;

					.button-item {
						width: 100%;
						height: 64/@rem;
						line-height: 64/@rem;
						text-align: center;
						font-size: 30/@rem;
						background-color: @GREEN_BG_CORLOR;

						&:active {
							background-color: @GREEN_BG_ACTIVE_CORLOR;
						}
					}
				}
			}
		}
	}

	.order-content {
		padding: 108/@rem 15/@rem 15/@rem;

		.total {
			color: #717171;
			text-align: center;
			font-size: 22/@rem;
			padding: 20/@rem;
			
			text {
				margin: 0 5px;
			}
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
						
						.xq {
							padding: 5/@rem 10/@rem;
							background-color: #1e1a17;
							border: 1px solid rgba(255, 255, 255, 0.2);
						}
					}
				}
			}
			&.dl-table {
				td {
					width: 25%;
					text-align: center;
					border-right: 1px solid rgba(255, 255, 255, 0.2);
					
					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>
