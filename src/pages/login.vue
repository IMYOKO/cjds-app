<template>
	<view class="login">
		<view class="login-form-wrapper">
			<view class="title">游戏登录</view>
			<view class="login-form-content">
				<view class="form-item">
					<input v-model="username" type="text" maxlength="11" name="" id="" placeholder="账号或手机号">
				</view>
				<view class="form-item">
					<input v-model="password" type="password" maxlength="16" name="" id="" placeholder="密码">
				</view>
			</view>
			<view class="btn-wrapper">
				<view class="btn-box register-btn" @click="goRegister">注册</view>
				<view class="btn-box" @click="goLogin">登录</view>
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
		name: "Login",
		data() {
			return {
				username: "",
				password: "",
			};
		},
		onLoad() {},
		computed: {
			...mapState("User", ["token"])
		},
		methods: {
			...mapActions("User", ["login"]),
			async goLogin() {
				if (!this.username) {
					this.$toast("账号不能为空");
					return;
				}
				if (!this.password) {
					this.$toast("请输入密码");
					return;
				}
				const data = {
					username: this.username,
					password: this.password
				};
				try {
					const {
						token
					} = await this.login(data)
					uni.setStorageSync("token", token)
					this.$toast({
						title: '登录成功',
						success: () => {
							this.goHome()
						}
					})
				} catch (error) {
					this.$toast(error.Log);
				}

			},
			goHome() {
				uni.redirectTo({
					url: '/pages/home'
				});
			},
			goRegister() {
				uni.redirectTo({
					url: '/pages/register'
				});
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
