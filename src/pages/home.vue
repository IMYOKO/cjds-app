<template>
	<view class="home fixed-wrapper">
		<Header :userInfo='userInfo' />
		<Content :showFooter="showFooter" />
		<Footer :showFooter="showFooter" />
		<!-- <view class="open-footer" @click="showFooterFn">
			{{showFooter ? '收起' : '展开'}}
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import Header from "@/components/home/header";
	import Content from "@/components/home/content";
	import Footer from "@/components/home/footer";
	export default {
		data() {
			return {
				title: 'Hello',
				timer: null,
				showFooter: true
			}
		},
		components: {
			Header,
			Footer,
			Content
		},
		onShow() {
			this.getUserInfo(0)
			this.timer = setInterval(() => {
				this.getUserInfo(0)
			}, 15000)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		computed: {
			...mapState('User', ['userInfo']),
		},
		methods: {
			...mapActions("User", ["getUserInfo"]),
			goLoginPage() {
				uni.redirectTo({
					url: '/pages/login'
				});
			},
			showFooterFn() {
				this.showFooter = !this.showFooter
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');

	.home {
		background: url("~@/assets/images/home/home_bg@2x.png") center center no-repeat;
		background-size: cover;
	}

	.open-footer {
		position: absolute;
		left: 20/@rem;
		bottom: 8/@rem;
		z-index: 20;
		width: 76/@rem;
		font-size: 24/@rem;
		height: 76/@rem;
		line-height: 76/@rem;
		border-radius: 50/@rem;
		text-align: center;
		font-weight: bold;
		border: 1px solid #f9ebc7;
		background-color: #15110d;
	}
</style>
