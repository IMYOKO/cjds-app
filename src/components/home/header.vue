<template>
	<view class="header">
		<view class="header-wrapper">
			<view class="left-wrapper">
				<view class="user-info">
					<view class="user-avtar">
						<image :src="iconAvtar" alt></image>
					</view>
					<view class="user-info-box">
						<h2><image class="user-icon" :src="iconUser" alt=""></image>{{userInfo.UserName}}</h2>
						<h3><image class="user-icon" :src="iconMoney" alt=""></image> {{userInfo.Banlance}}</h3>
					</view>
				</view>
				<!-- <view class="user-money">
					<view class="user-money-item">
						<view class="item"></view>
					</view>
					<view class="user-money-item"></view>
				</view> -->
			</view>
			<view class="logo-wrapper">
				<image :src="iconLogo" alt></image>
			</view>
			<view class="right-wrapper">
				<ul class="right-action-wrapper item-01">
					<li v-for="(item, index) in list" :key="index">
						<view class="right-action-item" :class="`item-${item.key}`" @click="item.handle">
							<image :src="item.src" alt=""></image>
						</view>
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapMutations
	} from "vuex";
	import iconAvtar from '@/assets/images/home/avtar@2x.png'
	import iconLogo from '@/assets/images/home/login@2x.png'
	import iconTg from '@/assets/images/home/icon_tuiguang@2x.png'
	import iconCz from '@/assets/images/home/icon_cz@2x.png'
	import iconKf from '@/assets/images/home/icon_kefu@2x.png'
	import iconDl from '@/assets/images/home/icon_daili@2x.png'
	import iconBack from '@/assets/images/home/icon_back@2x.png'
	import iconUser from '@/assets/images/home/user_icon@2x.png'
	import iconMoney from '@/assets/images/home/jinbi@2x.png'
	export default {
		data() {
			return {
				iconLogo,
				list: [],
				iconUser,
				iconMoney,
				iconAvtar
			}
		},
		props: {
			userInfo: Object
		},
		mounted() {
			this.list = [
				// {
				// 	key: 1,
				// 	title: "推广",
				// 	src: iconTg,
				// 	handle: () => {},
				// },
				{
					key: 2,
					title: "充值",
					src: iconCz,
					handle: () => {
						this.goRecharge()
					},
				},
				{
					key: 3,
					title: "代理",
					src: iconDl,
					handle: () => {
						this.goDl()
					}
				},
				{
					key: 4,
					title: "退出",
					src: iconBack,
					handle: () => {
						uni.showModal({
							title: '提示',
							content: '确定退出登录？',
							confirmText: "退出",
							confirmColor: "#bf0d0b",
							success: (res) => {
								if (res.confirm) {
									this.logout()
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						})
					},
				}
			].reverse();
		},
		methods: {
			...mapMutations("User", ['logout']),
			goRecharge() {
				uni.redirectTo({
					url: '/pages/recharge'
				});
			},
			goDl() {
				uni.redirectTo({
					url: `/pages/proxyUser?Id=${this.userInfo.Id}`
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.header {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		width: 100%;
		height: 92/@rem;
		background-color: rgba(25, 16, 13, 0.8);

		.header-wrapper {
			height: 100%;
			display: flex;
			justify-content: space-between;

			.logo-wrapper {
				height: 92/@rem;

				image {
					width: 370/@rem;
					height: 92/@rem;
					margin-top: -1/@rem;
				}
			}

			.left-wrapper {
				width: 460/@rem;
				display: flex;
				padding: 4/@rem 10/@rem 0;

				.user-info {
					display: flex;

					.user-avtar {
						width: 70/@rem;
						height: 70/@rem;
						border-radius: 70/@rem;
						padding: 4/@rem;
						overflow: hidden;
						background-color: #fff;
						border: 2px solid #bf7d22;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.user-info-box {
						padding: 0 10/@rem;
						max-width: 160/@rem;

						.user-icon {
							float: left;
							display: block;
							width: 32/@rem;
							height: 32/@rem;
							margin-right: 4/@rem;
						}

						h2,
						h3 {
							color: #f9f4d6;
							font-weight: normal;
							font-size: 32/@rem;
							line-height: 32/@rem;
							margin-top: 8/@rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap; // 382619
						}

						h3 {
							font-size: 28/@rem;
							line-height: 32/@rem;
							margin-top: 12/@rem;
						}
					}
				}

				.user-money {
					&-item {
						.item {
							height: 24/@rem;
							line-height: 24/@rem;
							border: 1px solid #382619;
							background-color: #231e18;
						}
					}
				}
			}

			.right-wrapper {
				width: 460/@rem;
				display: flex;
				justify-content: flex-end;

				.right-action-wrapper {
					width: 384/@rem;
					display: flex;
					flex-direction: row-reverse;
					padding-right: 12/@rem;

					li {
						margin: 6/@rem 6/@rem 0;

						.right-action-item {
							width: 76/@rem;
							height: 100%;

							&.item-1 {
								width: 100/@rem;
							}

							&.item-2 {
								width: 90/@rem;
							}

							&.item-3 {
								width: 64/@rem; // 100
							}

							&.item-4 {
								width: 90/@rem;
							}

							image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>
