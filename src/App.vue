<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: {
			...mapState("User", ["token"])
		},
		onLaunch: function() {
			// #ifdef APP-PLUS
			const isFullscreen = plus.navigator.isFullscreen()
			console.log('isFullscreen: ', isFullscreen)
			plus.navigator.setFullscreen(true)
			// #endif
			console.log('App Launch')
			if (!this.token) {
				uni.redirectTo({
					url: '/pages/login'
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	@import url('~@/assets/styles/reset.less');
	@import url('~@/assets/styles/common.less');
	/*每个页面公共css */
	page {
		color: #fff;
		font-size: 28/@rem;
		line-height: 28/@rem;
		background-color: #1e1a17;
	}
	
	uni-modal .uni-modal__title {
		color: #000;
	}

	.login,
	.register {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		overflow: hidden;
		background: url("~@/assets/images/login/login_bg@2x.png") center center no-repeat;
		background-size: cover;

		.title {
			font-size: 34/@rem;
			line-height: 52/@rem;
			text-align: center;
		}

		.login-form-wrapper,
		.register-form-wrapper {
			width: 650/@rem;
			height: 520/@rem;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			background: url("~@/assets/images/login/login_form@2x.png") center center no-repeat;
			background-size: contain;

		}

		.register-form-wrapper {
			width: 650/@rem;
			height: 100vh;
			background: #181410;
			border: 1px solid #7f6644;

			.login-form-content {

				.form-item {
					margin-top: 10/@rem;
				}
			}

		}

		.login-form-content {
			padding: 20/@rem 44/@rem;

			.form-item {
				margin-top: 40/@rem;
				position: relative;

				input {
					text-align: center;
					width: 80%;
					border: none;
					font-size: 30/@rem;
					margin-left: 5%;
					padding: 20/@rem 24/@rem;
					border-radius: 54/@rem;
					background-color: #110d0b;
				}
			}

		}

		.btn-wrapper {
			display: flex;
			padding-top: 40/@rem;
			justify-content: center;

			.btn-box {
				color: #fff;
				font-size: 24/@rem;
				width: 180/@rem;
				height: 68/@rem;
				line-height: 58/@rem;
				margin: 0 16/@rem;
				text-align: center;
				background: url("./assets/images/login/btn_login@2x.png") center center no-repeat;
				background-size: cover;

				&.register-btn {
					background: url("./assets/images/login/btn_regiter@2x.png") center center no-repeat;
					background-size: cover;
				}
			}
		}
	}
</style>
