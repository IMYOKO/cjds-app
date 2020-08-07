<template>
	<view class="pages">
		<Headers>
			<view class="header">
				<view class="header-choose-wrapper">
					<view class="choose-item" :class="{active: type === 0}" @click="setType(0)">
						充值
					</view>
					<view class="choose-item" :class="{active: type === 1}" @click="setType(1)">
						提现
					</view>
				</view>
			</view>
		</Headers>
		<view class="pages-wrapper recharge-page">
			<!-- 充值 start -->
			<view class="recharge-wrapper" v-if="type === 0">
				<view class="recharge-wrapper-content">
					<ul class="form-list">
						<li>
							<view class="list-item">
								<view class="title header-title left">
									收款方信息
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									开户银行：
								</view>
								<view class="info-item">
									<text>{{bankInfo.BankName}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									开户支行：
								</view>
								<view class="info-item">
									<text>{{bankInfo.BankZH}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									开户姓名：
								</view>
								<view class="info-item">
									<text>{{bankInfo.BankUserName}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									银行卡号：
								</view>
								<view class="info-item">
									<text>{{bankInfo.BankNo}}</text>
									<!-- #ifdef APP-PLUS -->
									<view class="copy" @click="getClipboardData">
										复制
									</view>
									<!--  #endif -->
								</view>
							</view>
						</li>
					</ul>
				</view>
				<view class="recharge-wrapper-content">
					<ul class="form-list">
						<li>
							<view class="list-item">
								<view class="title header-title">
									汇款方信息
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									汇款方式：
								</view>
								<view class="input-item">
									<picker @change="payTypeChange" :value="recharge.payTypeIndex" :range="payTypeList" :range-key="'name'">
										<view class="uni-input">{{payTypeList[recharge.payTypeIndex].name}}</view>
									</picker>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									汇款人姓名：
								</view>
								<view class="input-item">
									<input type="text" v-model="recharge.name" />
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									汇款人银行：
								</view>
								<view class="input-item">
									<picker @change="bankChange" :value="recharge.bankIndex" :range="bankList" :range-key="'name'">
										<view class="uni-input">{{bankList[recharge.bankIndex].name}}</view>
									</picker>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									充值金额：
								</view>
								<view class="input-item">
									<input type="number" v-model="recharge.money" />
								</view>
							</view>
						</li>
						<li>
							<view class="button-wrapper">
								<view class="button-item" @click="rechargeSumbit">
									<text>确认充值</text>
								</view>
							</view>
						</li>
					</ul>
				</view>
			</view>
			<!-- 充值 end -->

			<!-- 提现 start -->
			<view class="recharge-wrapper" v-if="type === 1">
				<view class="recharge-wrapper-content">
					<ul class="form-list">
						<li>
							<view class="list-item">
								<view class="title header-title left">
									账户信息
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									账户名称：
								</view>
								<view class="info-item">
									<text>{{withdrawalinfo.UserName}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									余额：
								</view>
								<view class="info-item">
									<text>{{withdrawalinfo.Banlance}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									提现所需流水 (元)：
								</view>
								<view class="info-item">
									<text>{{withdrawalinfo.WithdrawalLS}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									当前流水 (元)：
								</view>
								<view class="info-item">
									<text>{{withdrawalinfo.WithdrawalDQLS}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									已提现金额 (元)：
								</view>
								<view class="info-item">
									<text>{{withdrawalinfo.YTXMoney}}</text>
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									提现中金额 (元)：
								</view>
								<view class="info-item">
									<text>{{withdrawalinfo.TXZMoney}}</text>
								</view>
							</view>
						</li>
					</ul>
				</view>
				<view class="recharge-wrapper-content">
					<ul class="form-list">
						<li>
							<view class="list-item">
								<view class="title header-title">
									填写提现信息
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									开户姓名：
								</view>
								<view class="input-item">
									<input type="text" v-model="withdrawal.name" />
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									银行名称：
								</view>
								<view class="input-item">
									<input type="text" v-model="withdrawal.bankName" />
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									所属支行：
								</view>
								<view class="input-item">
									<input type="text" v-model="withdrawal.zhName" />
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									银行卡号：
								</view>
								<view class="input-item">
									<input type="number" v-model="withdrawal.bankNo" />
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									提现金额：
								</view>
								<view class="input-item">
									<input type="number" v-model="withdrawal.money" />
								</view>
							</view>
						</li>
						<li>
							<view class="list-item">
								<view class="title">
									提款密码：
								</view>
								<view class="input-item">
									<input type="password" v-model="withdrawal.password" />
								</view>
							</view>
						</li>
						<li>
							<view class="button-wrapper">
								<view class="button-item" @click="withdrawalSumbit">
									<text>确认提现</text>
								</view>
							</view>
						</li>
					</ul>
				</view>
			</view>
			<!-- 提现 end -->
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapMutations
	} from "vuex";
	import Headers from "@/components/common/headers.vue"
	import { bankList } from '@/store/init.js'
	console.log({bankList})
	export default {
		data() {
			return {
				type: 0,
				payTypeList: [{
					name: "银行卡",
					value: 1
				}],
				bankList,
				recharge: {
					bankIndex: 0,
					payTypeIndex: 0,
					name: '',
					money: ''
				},
				withdrawal: {
					name: '',
					bankName: '',
					zhName: '',
					bankNo: '',
					money: '',
					password: ''
				},
				withdrawalinfo: {
					UserName: '',
					Banlance: 0,
					WithdrawalLS: 0,
					WithdrawalDQLS: 0,
					YTXMoney: 0,
					TXZMoney: 0
				},
				bankInfo: {
					BankName: "",
					BankNo: "",
					BankUserName: "",
					BankZH: ""
				}
			}
		},
		onLoad() {
			this.getBankDataInfo()
			this.getWithdrawalInfo()
		},
		components: {
			Headers
		},
		methods: {
			...mapActions('User', ['addRecharge', 'addWithdrawal', 'getWithdrawal', 'getBankInfo']),
			setType(type) {
				this.type = type
			},
			bankChange(e) {
				this.recharge.bankIndex = e.target.value
			},
			payTypeChange(e) {
				this.recharge.payTypeIndex = e.target.value
			},
			async rechargeSumbit() {
				if (this.recharge.name == '') {
					this.$toast('请填写汇款人姓名')
					return
				}
				const Money = Number(this.recharge.money.trim())
				if (Money <= 0) {
					this.$toast('请填写充值金额，充值金额需大于0')
					return
				}
				const Type = this.payTypeList[this.recharge.payTypeIndex].value
				let payload = {
					Name: '',
					BankName: '',
					BankFS: '',
					Money,
					Type
				}
				if (Type === 1) {
					payload = {
						...payload,
						Name: this.recharge.name,
						BankName: this.bankList[this.recharge.bankIndex].value,
						BankFS: Type
					}
				}
				try {
					await this.addRecharge(payload)
					uni.showModal({
						title: '提示',
						content: '提交成功',
						confirmText: "关闭",
						showCancel: false
					})
					this.clearRechargePayload()
				} catch (e) {
					this.$toast('提交失败')
				}
			},
			clearRechargePayload() {
				this.recharge = {
					bankIndex: 0,
					payTypeIndex: 0,
					name: '',
					money: ''
				}
			},
			async withdrawalSumbit() {
				const Name = this.withdrawal.name
				const Bankname = this.withdrawal.bankName
				const Zh = this.withdrawal.zhName
				const Bankno = this.withdrawal.bankNo
				const Tkmm = this.withdrawal.password
				const Money = Number(this.withdrawal.money.trim())
				if (Name == '') {
					this.$toast('请填写开户人姓名')
					return
				}
				if (Bankname == '') {
					this.$toast('请填写银行名称')
					return
				}
				if (Zh == '') {
					this.$toast('请填写支行名称')
					return
				}
				if (Bankno == '') {
					this.$toast('请填写银行卡号')
					return
				}
				if (Tkmm == '') {
					this.$toast('请填写提款密码')
					return
				}
				if (Money <= 0) {
					this.$toast('请填写提现金额，提现金额需大于0')
					return
				}
				if (Money > this.withdrawal.Banlance) {
					this.$toast('提现金额大于余额')
					return
				}
				const payload = {
					Name,
					Bankname,
					Zh,
					Bankno,
					Tkmm,
					Money,
				}
				try {
					await this.addWithdrawal(payload)
					uni.showModal({
						title: '提示',
						content: '提现提交成功',
						confirmText: "关闭",
						showCancel: false
					})
					this.clearWithdrawalPayload()
				} catch (e) {
					this.$toast('提现提交失败')
				}
			},
			clearWithdrawalPayload() {
				this.withdrawal = {
					name: '',
					bankName: '',
					zhName: '',
					bankNo: '',
					money: '',
					password: ''
				}
			},
			async getWithdrawalInfo() {
				try {
					const data = await this.getWithdrawal()
					console.log(data)
					this.withdrawalinfo = data
				} catch (e) {
					console.log(e)
				}
			},
			async getBankDataInfo() {
				try {
					const data = await this.getBankInfo()
					this.bankInfo = data
					// #ifdef APP-PLUS  
					uni.setClipboardData({
						data: data.BankNo
					})
					// #endif
				} catch (e) {
					console.log(e)
				}
			},
			getClipboardData() {
				uni.getClipboardData({
					success: (res) => {
						this.$toast('复制成功')
					}
				})
			}
		}
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

	.recharge-page {
		display: flex;

		.recharge-wrapper {
			display: flex;
			width: 100%;
			min-height: 100%;

			&-content {
				width: 50%;
				padding: 20/@rem;
				border-right: 1px solid rgba(255, 255, 255, 0.2);

				&:last-child {
					border-right: none;
				}
			}
		}

		.form-list {
			padding: 0 40/@rem;

			li {
				margin-bottom: 20/@rem;

				.list-item {
					.title {
						color: rgba(255, 255, 255, 0.5);
						font-size: 24/@rem;
						line-height: 30/@rem;
						margin-bottom: 12/@rem;

						&.header-title {
							color: #fff;
							text-align: center;
							padding: 20/@rem 0;
							background-color: rgba(2, 76, 0, 0.6);
						}

						&.left {
							background-color: rgba(76, 63, 0, 0.6);
						}
					}

					.input-item {

						.uni-input,
						input {
							font-size: 26/@rem;
							display: block;
							padding: 0 20/@rem;
							height: 64/@rem;
							line-height: 64/@rem;
							border: 1px solid rgba(255, 255, 255, 0.2);
						}
					}

					.info-item {
						font-size: 26/@rem;
						padding: 0 20/@rem;
						height: 64/@rem;
						line-height: 64/@rem;
						background-color: rgba(82, 82, 82, 0.2);
						position: relative;

						.copy {
							opacity: 0.6;
							width: 80/@rem;
							height: 64/@rem;
							font-size: 24/@rem;
							line-height: 64/@rem;
							text-align: center;
							position: absolute;
							right: 0;
							top: 0;
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
						font-size: 26/@rem;
						background-color: @GREEN_BG_CORLOR;

						&:active {
							background-color: @GREEN_BG_ACTIVE_CORLOR;
						}
					}
				}
			}
		}
	}
</style>
