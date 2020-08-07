<template>
	<view class="page-header">
		<view class="page-header-wrapper">
			<slot></slot>
		</view>
		<view class="back" @click="goHome">
			<text>首页</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goHome() {
				uni.redirectTo({
					url: '/pages/home'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('~@/assets/styles/common.less');
	
	.page-header {
		width: 100%;
		height: 78/@rem;
		background-color: #1e1a17;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
		
		.page-header-wrapper {
			height: 78/@rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
			z-index: 1000;
		}
	}
</style>
