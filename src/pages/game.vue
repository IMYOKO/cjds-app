<template>
	<view class="video-page">
		<!-- <cover-view class="back" @click="goHome">首页</cover-view> -->
		<view id="video" class="video"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex";
	export default {
		name: 'Video',
		data() {
			return {
				Player: '',
				currentWebview: null,
				timer: null
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS  
			this.plusReady()
			// #endif
			const id = option.id || 0
			this.updateGameTableId(id)
			this.getUserInfo(id)
			this.getGameTable()
		},
		onHide() {
			// #ifdef APP-PLUS  
			this.Player.close()
			// #endif
		},
		onUnload() {
			this.clearData()
		},
		methods: {
			...mapMutations("Games", ['updateDiceMoney', 'clearDiceData', 'updateGameTableId']),
			...mapActions("User", ["getUserInfo"]),
			...mapActions("Games", ["getGameTable", "getKj"]),
			clearData() {
				this.updateDiceMoney(0)
				this.clearDiceData()
			},
			plusReady() {
				this.currentWebview = this.$mp.page.$getAppWebview();
				this.Player = new plus.video.VideoPlayer('video', {
					src: "rtmp://58.84.7.20:1935/hls/hls", //这里替换自己的拉流地址
					top: '0',
					left: '0',
					muted: true,
					width: '100%',
					height: '100%',
					controls: false,
					position: 'static'
				});
				this.currentWebview.append(this.Player);
				this.Player.play()
			},
			goHome() {
				uni.redirectTo({
					url: '/pages/home'
				});
			}
		}
	}
</script>

<style lang="less">
	@import url('~@/assets/styles/common.less');

	.video-page {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}

	.back {
		width: 140/@rem;
		height: 80/@rem;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;
		text-align: center;
		line-height: 80/@rem;
		background-color: rgba(255, 255, 255, 0.4);
	}
</style>
