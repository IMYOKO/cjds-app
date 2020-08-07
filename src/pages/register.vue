<template>
	<view class="register">
		<view class="register-form-wrapper">
			<view class="title">游戏注册</view>
			<view class="login-form-content">
				<view class="form-item">
					<input v-model="Phone" type="number" maxlength="11" placeholder="手机号码">
				</view>
				<view class="form-item">
					<view class="tel-code-btn" @click="getCode">{{codeText}}</view>
					<input v-model="SMSCode" type="text" placeholder="验证码">
				</view>
				<view class="form-item">
					<input v-model="UserName" type="text" maxlength="6" placeholder="账号(字母或数字，最多6位)">
				</view>
				<view class="form-item">
					<input v-model="PassWord" type="passWord" maxlength="16" placeholder="账户密码">
				</view>
				<view class="form-item">
					<input v-model="PassWordAgain" type="passWord" maxlength="16" placeholder="确认账户密码">
				</view>
				<view class="form-item">
					<input v-model="YQM" type="text" placeholder="邀请码">
				</view>
			</view>
			<view class="btn-wrapper btn-wrapper-register">
				<view class="btn-box" @click="goLogin">返回登录</view>
				<view class="btn-box register-btn" @click="register">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "Register",
		data() {
			return {
				Phone: "",
				SMSCode: "", // 8888
				UserName: "",
				PassWord: "",
				PassWordAgain: "",
				YQM: "10000",
				isSend: false,
				codeText: "获取",
			};
		},
		onLoad(option) {
			this.YQM = option.YQM || "10000";
		},
		computed: {
			...mapState("User", ["token", "userInfo"]),
		},
		methods: {
			...mapActions("User", ["login"]),
			goLogin() {
				uni.redirectTo({
					url: '/pages/login'
				});
			},
			async getCode() {
				if (this.Phone == "") {
					this.$toast("手机号码不能为空");
					return;
				}
				if (!this.isPhone(this.Phone)) {
					this.$toast("请输入正确的手机号码");
					return;
				}
				if (this.isSend) {
					return;
				}
				this.isSend = true;
				let wait = 30;
				const interval = setInterval(() => {
					wait--;
					this.codeText = `${wait} s`;
					if (wait < 0) {
						clearInterval(interval);
						this.isSend = false;
						this.codeText = `获取`;
					}
				}, 1000);
				try {
					await this.$api.getSMS({
						Phone: this.Phone
					});
					this.$toast("验证码已经发出，请注意查收");
				} catch (error) {
					console.log(error);
				}
			},
			isPhone(num) {
				const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
				return reg.test(num);
			},
			isUserName(text) {
				const reg = /^[0-9a-zA-Z]+$/;
				return reg.test(text);
			},
			async register() {
				try {
					if (this.Phone == "") {
						this.$toast("手机号码不能为空");
						return;
					}
					if (!this.isPhone(this.Phone)) {
						this.$toast("请输入正确的手机号码");
						return;
					}
					if (this.SMSCode == "") {
						this.$toast("验证码不能为空");
						return;
					}
					if (this.UserName == "") {
						this.$toast("账号不能为空");
						return;
					}
					if (!this.isUserName(this.UserName)) {
						this.$toast("账号(字母或数字，不能超过6位)");
						return;
					}
					if (this.PassWord == "") {
						this.$toast("账户密码不能为空");
						return;
					}
					if (this.PassWordAgain == "") {
						this.$toast("确认账户密码不能为空");
						return;
					}
					if (this.YQM == "") {
						this.$toast("邀请码不能为空");
						return;
					}
					if (this.PassWord !== this.PassWordAgain) {
						this.$toast("两次密码不一致");
						return;
					}
					if (this.PassWord.length < 4 || this.PassWord.length > 16) {
						this.$toast("密码长度为4到16位");
						return;
					}
					if (this.UserName.length > 6) {
						this.$toast("账号不能超过6位");
						return;
					}
					const data = {
						Phone: this.Phone,
						SMSCode: this.SMSCode,
						UserName: this.UserName,
						PassWord: this.PassWord,
						YQM: this.YQM,
					};
					await this.$api.register(data);
					uni.showModal({
						title: '提示',
						content: '注册成功',
						confirmText: "去登录",
						showCancel: false,
						success: this.goLogin
					})
				} catch (error) {
					this.$toast(error.Log);
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');
	.register {
		.title {
			color: #f7d04a;
			font-size: 30/@rem;
			line-height: 64/@rem;
			background-color: #100e0b;
		}

		.login-form-content {
			padding-top: 10/@rem;
			padding-bottom: 10/@rem;
		}

		.tel-code-btn {
			text-align: center;
			position: absolute;
			bottom: 0;
			right: 5%;
			z-index: 100;
			width: 144/@rem;
			height: 80/@rem;
			color: #fff;
			font-size: 28/@rem;
			line-height: 80/@rem;
			border-top-right-radius: 40/@rem;
			border-bottom-right-radius: 40/@rem;
			background: #7e6644;
			cursor: pointer;
		}
		.btn-wrapper-register {
			padding-top: 20/@rem;
		}
	}
</style>
