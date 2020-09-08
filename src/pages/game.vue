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
	import gameStartMp3 from "@/assets/mp3/game_start.mp3";
	import gameEndtMp3 from "@/assets/mp3/game_end.mp3";
	export default {
		name: 'Video',
		data() {
			return {
				Player: '',
				currentWebview: null,
				timer: null,
				startSoundContext: null,
				endSoundContext: null
			}
		},
		async onLoad(option) {
			console.log('game onload')
			// #ifdef APP-PLUS  
			this.plusReady()
			this.startSound()
			this.endSound()
			uni.$on('start-bet', this.startBet)
			uni.$on('end-bet', this.endBet)
			// #endif
			const id = option.id || 0
			this.updateGameTableId(id)
			this.getUserInfo(id)
			this.getGameTable()
		},
		onHide() {
			// #ifdef APP-PLUS  
			this.Player.close()
			uni.$off('start-bet', this.startBet)
			uni.$off('end-bet', this.endBet)
			this.startSoundContext = null
			this.endSoundContext = null
			// #endif
		},
		onUnload() {
			this.clearData()
			// #ifdef APP-PLUS
			this.Player.close()
			uni.$off('start-bet', this.startBet)
			uni.$off('end-bet', this.endBet)
			this.startSoundContext = null
			this.endSoundContext = null
			// #endif
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
			},
			startSound() {
				if (this.startSoundContext) {
					return
				}
				const startSoundContext = uni.createInnerAudioContext();
				startSoundContext.autoplay = false;
				startSoundContext.loop = false;
				startSoundContext.volume = 0.6;
				startSoundContext.src = gameStartMp3;
				startSoundContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.startSoundContext = startSoundContext
			},
			endSound() {
				if (this.endSoundContext) {
					return
				}
				const endSoundContext = uni.createInnerAudioContext();
				endSoundContext.autoplay = false;
				endSoundContext.loop = false;
				endSoundContext.volume = 0.6;
				endSoundContext.src = gameEndtMp3;
				endSoundContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.endSoundContext = endSoundContext
			},
			startBet() {
				this.startSoundContext.play()
			},
			endBet() {
				this.endSoundContext.play()
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
