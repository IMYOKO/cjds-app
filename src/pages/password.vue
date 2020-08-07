<template>
	<view class="pages">
		<Headers>
			<view class="header-text"  v-if="type === '0'">
				<text>修改提款密码</text>
			</view>
			<view class="header-text"  v-if="type === '1'">
				<text>修改密码</text>
			</view>
		</Headers>
		<view class="password-wrapper pages-wrapper">
			<view class="password-content">
				<!-- 提款密码 start -->
				<view class="form-wrapper" v-if="type === '0'">
					<view class="form-item">
						<view class="title">
							<text>旧提款密码：</text>
						</view>
						<view class="input-item">
							<input type="password" v-model="tk.password" maxlength="16" placeholder="请输入旧密码" />
						</view>
					</view>
					<view class="form-item">
						<view class="title">
							<text>新提款密码：</text>
						</view>
						<view class="input-item">
							<input type="password" v-model="tk.newPassword" maxlength="16" placeholder="请输入新密码" />
						</view>
					</view>
					<view class="form-item">
						<view class="title">
							<text>确认新提款密码：</text>
						</view>
						<view class="input-item">
							<input type="password" v-model="tk.newPassword2" maxlength="16" placeholder="请再次输入新密码" />
						</view>
					</view>
					<view class="button-wrapper">
						<view class="button-item" @click="upTKPassWord">
							<text>确认</text>
						</view>
					</view>
				</view>
				<!-- 提款密码 end -->
				
				<!-- 用户密码 start -->
				<view class="form-wrapper" v-if="type === '1'">
					<view class="form-item">
						<view class="title">
							<text>旧密码：</text>
						</view>
						<view class="input-item">
							<input type="password" v-model="user.password" maxlength="16" placeholder="请输入旧密码" />
						</view>
					</view>
					<view class="form-item">
						<view class="title">
							<text>新密码：</text>
						</view>
						<view class="input-item">
							<input type="password" v-model="user.newPassword" maxlength="16" placeholder="请输入新密码" />
						</view>
					</view>
					<view class="form-item">
						<view class="title">
							<text>确认新密码：</text>
						</view>
						<view class="input-item">
							<input type="password" v-model="user.newPassword2" maxlength="16" placeholder="请再次输入新密码" />
						</view>
					</view>
					<view class="button-wrapper">
						<view class="button-item" @click="upPassWord">
							<text>确认</text>
						</view>
					</view>
				</view>
				<!-- 用户密码 end -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapMutations
	} from "vuex";
	import Headers from "@/components/common/headers.vue"
	export default {
		data() {
			return {
				type: '',
				tk: {
					password: '',
					newPassword: '',
					newPassword2: '',
				},
				user: {
					password: '',
					newPassword: '',
					newPassword2: '',
				},
				timer: null
			}
		},
		components: {
			Headers
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			...mapMutations("User", ["updateToken"]),
			...mapActions("User", ["updateTKPassWord", "updatePassWord"]),
			async upPassWord() {
				if(this.user.password == '') {
					this.$toast('旧密码不能为空')
					return
				}
				if(this.user.newPassword == '') {
					this.$toast('新密码不能为空')
					return
				}
				if(this.user.newPassword2 == '') {
					this.$toast('确认新密码不能为空')
					return
				}
				if(this.user.newPassword !== this.user.newPassword2) {
					this.$toast('两次新密码不一致')
					return
				}
				try {
					const payload = {
						Password: this.user.password,
						Newpassword: this.user.newPassword,
					}
					const res = await this.updatePassWord(payload)
					uni.showModal({
						title: '提示',
						content: '修改成功, 请重新登录',
						confirmText: "退出",
						showCancel: false,
						success: () => {
							this.updateToken('')
							this.goLoginPage()
						}
					})
				} catch {
					this.$toast('修改失败')
				}
			},
			async upTKPassWord() {
				if(this.tk.password == '') {
					this.$toast('旧密码不能为空')
					return
				}
				if(this.tk.newPassword == '') {
					this.$toast('新密码不能为空')
					return
				}
				if(this.tk.newPassword2 == '') {
					this.$toast('确认新密码不能为空')
					return
				}
				if(this.tk.newPassword !== this.tk.newPassword2) {
					this.$toast('两次新密码不一致')
					return
				}
				try {
					const payload = {
						Password: this.tk.password,
						Newpassword: this.tk.newPassword,
					}
					const res = await this.updateTKPassWord(payload)
					this.$toast('修改成功')
				} catch {
					this.$toast('修改失败')
				}
			},
			goLoginPage() {
				uni.redirectTo({
					url: '/pages/login'
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.header-text {
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		font-size: 30/@rem;
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
						input {
							font-size: 26/@rem;
							display: block;
							width: calc(100% - 40/@rem);
							padding: 0 20/@rem;
							height: 64/@rem;
							line-height: 64/@rem;
							border: 1px solid rgba(255, 255, 255, 0.2);
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
</style>
